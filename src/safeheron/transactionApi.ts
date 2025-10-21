import {SafeheronClient} from '../safeheron';
import {SafeheronConfig} from "../config";
import {PageResult, PageSearch, ResultResponse} from "./accountApi";

export interface ListTransactionsV1Request extends PageSearch {
    /**
     * Source account key
     */
    sourceAccountKey?: string;

    /**
     * Source account type
     */
    sourceAccountType?: string;

    /**
     * Destination account key
     */
    destinationAccountKey?: string;

    /**
     * Destination account type
     */
    destinationAccountType?: string;

    /**
     * Start time for creating a transaction, UNIX timestamp (ms)
     */
    createTimeMin?: number;

    /**
     * End time for creating a transaction, UNIX timestamp (ms)
     */
    createTimeMax?: number;

    /**
     * Min transaction amount
     */
    txAmountMin?: string;

    /**
     * Max transaction amount
     */
    txAmountMax?: string;

    /**
     * Coin key, multiple coin keys are separated by commas
     */
    coinKey?: string;

    /**
     * Transaction fee coin key, multiple coin keys are separated by commas
     */
    feeCoinKey?: string;

    /**
     * Transaction status
     */
    transactionStatus?: string;

    /**
     * Transaction substatus
     */
    transactionSubStatus?: string;

    /**
     * Min duration for completing a transaction, UNIX timestamp (ms)
     */
    completedTimeMin?: number;

    /**
     * Max duration for completing a transaction, UNIX timestamp (ms)
     */
    completedTimeMax?: number;

    /**
     * Merchant unique business ID
     */
    customerRefId?: string;

    /**
     * Type of actual destination account
     */
    realDestinationAccountType?: string;

    /**
     * Filter out custom transaction amounts, excluding transaction records below a certain amount specified in USD from the query results
     */
    hideSmallAmountUsd?: string;

    /**
     * Filter transaction history by transaction direction:
     * Default: Retrieve all types of transactions
     * INFLOW: Retrieve inflows
     * OUTFLOW: Retrieve outflows
     * INTERNAL_TRANSFER: Retrieve internal transfers
     */
    transactionDirection?: string;
}

export interface TransactionsResponse {
    /**
     * Transaction key
     */
    txKey: string;

    /**
     * Transaction hash
     */
    txHash: string;

    /**
     * Coin key
     */
    coinKey: string;

    /**
     * Transaction amount, the unit is the symbol returned by the coin list
     */
    txAmount: string;

    /**
     * Source account key
     */
    sourceAccountKey: string;

    /**
     * Source account type
     */
    sourceAccountType: string;

    /**
     * Source address
     */
    sourceAddress: string;

    /**
     * Source address shows potential phishing risk. Only incoming transactions on EVM chains and TRON are valid
     */
    isSourcePhishing: boolean;

    /**
     * Source address list
     */
    sourceAddressList: Array<SourceAddress>;

    /**
     * Destination account key
     */
    destinationAccountKey: string;

    /**
     * Destination account type
     */
    destinationAccountType: string;

    /**
     * Destination address
     */
    destinationAddress: string;

    /**
     * Destination address shows potential phishing risk. Only outgoing transactions on EVM chains and TRON are valid
     */
    isDestinationPhishing: boolean;

    /**
     * Memo of the destination address when creating a transaction
     */
    memo: string;

    /**
     * Destination address list
     */
    destinationAddressList?: Array<DestinationAddress>;

    /**
     * If the destination is tag or memo type, then this value is empty
     */
    destinationTag: string;

    /**
     * Transaction type
     */
    transactionType: string;

    /**
     * Transaction status
     */
    transactionStatus: string;

    /**
     * Transaction substatus
     */
    transactionSubStatus: string;

    /**
     * Transaction creation time, UNIX timestamp (ms)
     */
    createTime: number;

    /**
     * Note
     */
    note: string;

    /**
     * Final approver key
     */
    auditUserKey: string;

    /**
     * Creator key
     */
    createdByUserKey: string;

    /**
     * Transaction fee
     */
    txFee: string;

    /**
     * Coin key that is used to pay for the transaction fee when conducting a transfer, such as when transferring ERC-20 tokens, transaction fees are paid in ETH
     */
    feeCoinKey: string;

    /**
     * Total fee
     */
    gasFee?: Array<GasFee>;

    /**
     * Quoted transaction hash (only for sped-up transactions)
     */
    replaceTxHash: string;

    /**
     * Merchant unique business ID
     */
    customerRefId: string;

    /**
     * Transaction counter used to prevent double-spending and replay attacks. This field has a value when a transaction on an EVM-compatible public chain completes approval, or when a custom nonce is passed during transaction creation
     */
    nonce: string;

    /**
     * Represents the txKey of the replaced transaction, returned only during transaction acceleration. Please note that an accelerated transaction and the original transaction are two completely independent transactions and should not be confused or regarded as the same transaction
     */
    replacedTxKey: string;

    /**
     * Represents the customerRefId of the replaced transaction, returned only during transaction acceleration. Please note that an accelerated transaction and the original transaction are two completely independent transactions and should not be confused or regarded as the same transaction. (Note: This field has a value only for transactions accelerated after March 21, 2025.)
     */
    replacedCustomerRefId: string;

    /**
     * Merchant extended field
     */
    customerExt1: string;

    /**
     * Merchant extended field
     */
    customerExt2: string;

    /**
     * Whether the source address contains AML address(es)
     *     YES: contain
     *     NO: not contain
     */
    amlLock: string;

    /**
     * Block height (for confirming transaction and succeeded transaction)
     */
    blockHeight: number;

    /**
     * Transaction completion time
     */
    completedTime: number;

    /**
     * Type of actual destination account
     */
    realDestinationAccountType: string;

    /**
     * Amount in USD when transact
     */
    txAmountToUsd: string;

    /**
     * Source account name
     */
    sourceAccountName: string;


    /**
     * Destination account name
     */
    destinationAccountName: string;


    /**
     * Final approver username
     */
    auditUserName: string;

    /**
     * Creator username
     */
    createdByUserName: string;

    /**
     * Transaction Direction
     */
    transactionDirection: string;
}

export interface SourceAddress {
    /**
     * Source address
     */
    address?: string;

    /**
     * Source address shows potential phishing risk. Only incoming transactions on EVM chains and TRON are valid
     */
    isSourcePhishing: boolean;

    /**
     * The unique identifier of the address group of the source address, this field is only returned when the transaction source account type is VAULT_ACCOUNT
     */
    addressGroupKey?: string;
}

export interface LimitSearch {
    /**
     * Query page direction, NEXT by default
     */
    direct?: string;

    /**
     * The number of items to retrieve at a time, default max value is 500
     */
    limit?: number;

    /**
     * Txkey of the first transaction record. If the first page has no value, provide the txKey of the last transaction record from the previous result
     */
    fromId?: string;
}

export interface ListTransactionsV2Request extends LimitSearch {
    /**
     * Source account key
     */
    sourceAccountKey?: string;

    /**
     * Source account type
     */
    sourceAccountType?: string;

    /**
     * Destination account key
     */
    destinationAccountKey?: string;

    /**
     * Destination account type
     */
    destinationAccountType?: string;

    /**
     * The unique identifier key of a wallet account, used to query all transactions under that wallet. This is only supported for VAULT_ACCOUNT type wallets. This has a higher priority than sourceAccountKey, sourceAccountType, destinationAccountKey, destinationAccountType, and realDestinationAccountType. If accountKey is passed along with the five parameters mentioned above, only accountKey will be effective
     */
    accountKey?: string;

    /**
     * Start time for creating a transaction, UNIX timestamp (ms)
     */
    createTimeMin?: number;

    /**
     * End time for creating a transaction, UNIX timestamp (ms)
     */
    createTimeMax?: number;

    /**
     * Min transaction amount
     */
    txAmountMin?: string;

    /**
     * Max transaction amount
     */
    txAmountMax?: string;

    /**
     * Coin key, multiple coin keys are separated by commas
     */
    coinKey?: string;

    /**
     * Transaction fee coin key, multiple coin keys are separated by commas
     */
    feeCoinKey?: string;

    /**
     * Transaction status
     */
    transactionStatus?: string;

    /**
     * Transaction substatus
     */
    transactionSubStatus?: string;

    /**
     * Min duration for completing a transaction, UNIX timestamp (ms)
     */
    completedTimeMin?: number;

    /**
     * Max duration for completing a transaction, UNIX timestamp (ms)
     */
    completedTimeMax?: number;

    /**
     * Merchant unique business ID
     */
    customerRefId?: string;

    /**
     * Type of actual destination account
     */
    realDestinationAccountType?: string;

    /**
     * Filter out custom transaction amounts, excluding transaction records below a certain amount specified in USD from the query results
     */
    hideSmallAmountUsd?: string;

    /**
     * Filter transaction history by transaction direction:
     * Default: Retrieve all types of transactions
     * INFLOW: Retrieve inflows
     * OUTFLOW: Retrieve outflows
     * INTERNAL_TRANSFER: Retrieve internal transfers
     */
    transactionDirection?: string;
}

export interface FeeRateDto {
    /**
     * Fee rate: fee per byte for UTXO, gas price for EVM chains, free limit for TRON (optional) and gas price for SUI
     */
    feeRate?: string;

    /**
     * EVM gas limit
     */
    gasLimit?: string;

    /**
     * EIP-1559 max priority fee
     */
    maxPriorityFee?: string;

    /**
     * EIP-1559 max fee
     */
    maxFee?: string;

    /**
     * Filecoin gas premium, similar to EIP-1559 max priority fee
     */
    gasPremium?: string;

    /**
     * Filecoin gas fee cap, similar to EIP-1559 max fee
     */
    gasFeeCap?: string;

    /**
     * SUI gas budget, similar to EIP-1559 max fee
     */
    gasBudget?: string;

    /**
     * The gas price the transaction sender is willing to pay, similar to EVM gasPrice
     */
    gasUnitPrice?: string;

    /**
     * The maximum number of gas units that the transaction sender is willing to spend to execute the transaction, similar to EVM gasLimit
     */
    maxGasAmount?: string;
}

export interface CreateTransactionRequest {
    /**
     * Merchant unique business ID (100 characters max)
     */
    customerRefId: string;

    /**
     * Merchant extended field (defined by merchant) shown to merchant (255 characters max)
     */
    customerExt1?: string;

    /**
     * Merchant extended field (defined by merchant) shown to merchant (255 characters max)
     */
    customerExt2?: string;

    /**
     * Transaction note (180 characters max)
     */
    note?: string;

    /**
     * Coin key
     */
    coinKey: string;

    /**
     * Transaction Fee Rate Grade
     * Choose between transaction fees. If the transaction fee rate is preset, it will take priority
     */
    txFeeLevel?: string;

    /**
     * Transaction fee rate, either txFeeLevel or feeRateDto
     */
    feeRateDto?: FeeRateDto

    /**
     * Maximum estimated transaction fee rate for a given transaction
     */
    maxTxFeeRate?: string;

    /**
     * Transaction amount
     */
    txAmount: string;

    /**
     * Deduct transaction fee from the transfer amount
     * False by default. If set to true, transaction fee will be deducted from the transfer amount
     * Note: This parameter can only be considered if a transaction’s asset is a base asset, such as ETH or MATIC. If the asset can’t be used for transaction fees, like USDC, this parameter is ignored
     */
    treatAsGrossAmount?: boolean;

    /**
     * Source account key
     */
    sourceAccountKey: string;

    /**
     * Account type
     */
    sourceAccountType: string;

    /**
     * Destination account key
     * Whitelist key if the destination is a whitelisted account;
     * Wallet account key if the destination is a wallet account;
     * No key for unknown address
     */
    destinationAccountKey?: string;

    /**
     * Destination account type
     */
    destinationAccountType: string;

    /**
     * If the destinationAccountType is ONE_TIME_ADDRESS, then this field should have a value
     */
    destinationAddress?: string;

    /**
     * The memo (up to 100 characters) for the destination address, also known as a comment or tag. This parameter is valid for transactions on the following networks:
     * TON: TON mainnet
     * TON_TESTNET: TON testnet
     */
    memo?: string;

    /**
     * Destination Tag
     */
    destinationTag?: string;

    /**
     * Bitcoin enabled for RBF (Replace-by-fee is a protocol in the Bitcoin mempool that allows for the replacement of an unconfirmed transaction with another one)
     */
    isRbf?: boolean;

    /**
     * The default setting for the parameter is [true]. This parameter determines whether a transaction can be created when the target address is a smart contract. If set to [false], a transaction can still be created for a contract address
     */
    failOnContract?: boolean;

    /**
     * Default value is true. When initiating and approving transactions, Safeheron assesses the destinationAddress for risk through its AML/KYT service provider. It then decides whether to permit the transaction based on this assessment. By default, if the destination address presents compliance risks, the system prohibits the transaction.
     * If you fully understand the associated risks and still need to transfer funds to this address, you can explicitly set failOnAml to false. In this case, Safeheron will disregard the risk assessment results and allow the transaction to proceed.
     */
    failOnAml?: boolean;

    /**
     * Custom nonce
     */
    nonce?: number;

    /**
     * Customizable sequence number on Aptos, similar to the nonce in the EVM.
     */
    sequenceNumber?: number;

    /**
     * Balance verification, BALANCE_CHECK by default
     */
    balanceVerifyType?: string;
}

export interface CreateTransactionsUTXOMultiDestRequest {
    /**
     * Merchant unique business ID (100 characters max)
     */
    customerRefId: string;

    /**
     * Merchant extended field (defined by merchant) shown to merchant (255 characters max)
     */
    customerExt1?: string;

    /**
     * Merchant extended field (defined by merchant) shown to merchant (255 characters max)
     */
    customerExt2?: string;

    /**
     * Transaction note (180 characters max)
     */
    note?: string;

    /**
     * Coin key
     */
    coinKey: string;

    /**
     * Transaction Fee Rate Grade
     * Choose between transaction fees. If the transaction fee rate is preset, it will take priority
     */
    txFeeLevel?: string;

    /**
     * Transaction fee rate, either txFeeLevel or feeRateDto
     */
    feeRateDto?: FeeRateDto

    /**
     * Maximum estimated transaction fee rate for a given transaction
     */
    maxTxFeeRate?: string;

    /**
     * Source account key
     */
    sourceAccountKey: string;

    /**
     * Account type
     */
    sourceAccountType: string;

    /**
     * If the destinationAccountType is ONE_TIME_ADDRESS, then this field should have a value
     */
    destinationAddressList?: Array<DestinationAddress>;

    /**
     * Destination Tag
     */
    destinationTag?: string;

    /**
     * Bitcoin enabled for RBF (Replace-by-fee is a protocol in the Bitcoin mempool that allows for the replacement of an unconfirmed transaction with another one)
     */
    isRbf?: boolean;

    /**
     * Default value is true. When initiating and approving transactions, Safeheron assesses the destinationAddress for risk through its AML/KYT service provider. It then decides whether to permit the transaction based on this assessment. By default, if the destination address presents compliance risks, the system prohibits the transaction.
     * If you fully understand the associated risks and still need to transfer funds to this address, you can explicitly set failOnAml to false. In this case, Safeheron will disregard the risk assessment results and allow the transaction to proceed.
     */
    failOnAml?: boolean;
}

export interface DestinationAddress {
    /**
     * Destination address
     */
    address?: string;

    /**
     * Destination address shows potential phishing risk. Only outgoing transactions on EVM chains and TRON are valid
     */
    isDestinationPhishing: boolean;

    /**
     * Memo of the destination address when creating a transaction
     */
    memo?: string;

    /**
     * Transaction amount
     */
    amount?: string;

    /**
     * The unique identifier of the address group of the destination address, this field is only returned when the destination account type is VAULT_ACCOUNT
     */
    addressGroupKey?: string;
}


export interface GasFee {
    /**
     * Currency of handling fees paid, such as TRX, ETH, BSC, ARB, POL, USDT
     */
    symbol?: string;

    /**
     * Amount of fees paid
     */
    amount: boolean;
}

export interface TxKeyResult {
    /**
     * Transaction key
     */
    txKey: string;
}


export interface CreateTransactionV3Response {
    /**
     * Transaction key
     */
    txKey: string;

    /**
     * Merchant unique business ID for transaction creation
     */
    customerRefId: string;

    /**
     * With idempotentRequest set to true, the system enforces idempotency by returning the original txKey for duplicate customerRefIds, preventing redundant transaction creation
     */
    idempotentRequest: boolean;
}

export interface RecreateTransactionRequest {
    /**
     * Transaction key
     */
    txKey: string;

    /**
     * Transaction hash
     */
    txHash: string;

    /**
     * Coin key
     */
    coinKey: string;

    /**
     * Transaction Fee Rate Grade
     * Choose between transaction fees. If the transaction fee rate is preset, it will take priority
     */
    txFeeLevel?: string;

    /**
     * Transaction fee rate, either txFeeLevel or feeRateDto
     */
    feeRateDto?: FeeRateDto;
}

export interface OneTransactionsRequest {
    /**
     * Transaction key
     */
    txKey?: string;

    /**
     * Merchant unique business ID (100 characters max)
     */
    customerRefId?: string;
}

export interface OneTransactionsResponse {
    /**
     * Transaction key
     */
    txKey: string;

    /**
     * Transaction hash
     */
    txHash: string;

    /**
     * Coin key
     */
    coinKey: string;

    /**
     * Transaction amount, the unit is the symbol returned by the coin list
     */
    txAmount: string;

    /**
     * Source account key
     */
    sourceAccountKey: string;

    /**
     * Source account type
     */
    sourceAccountType: string;

    /**
     * Source address
     */
    sourceAddress: string;

    /**
     * Source address shows potential phishing risk. Only incoming transactions on EVM chains and TRON are valid
     */
    isSourcePhishing: boolean;

    /**
     * Source address list
     */
    sourceAddressList: Array<SourceAddress>;

    /**
     * Destination account key
     */
    destinationAccountKey: string;

    /**
     * Destination account type
     */
    destinationAccountType: string;

    /**
     * Destination address
     */
    destinationAddress: string;

    /**
     * Destination address shows potential phishing risk. Only outgoing transactions on EVM chains and TRON are valid
     */
    isDestinationPhishing: boolean;

    /**
     * Memo of the destination address when creating a transaction
     */
    memo?: string;

    /**
     * Destination address list
     */
    destinationAddressList?: Array<DestinationAddress>;

    /**
     * If the destination is tag or memo type, then this value is empty
     */
    destinationTag: string;

    /**
     * Transaction type
     */
    transactionType: string;

    /**
     * Transaction status
     */
    transactionStatus: string;

    /**
     * Transaction substatus
     */
    transactionSubStatus: string;

    /**
     * Transaction creation time, UNIX timestamp (ms)
     */
    createTime: number;

    /**
     * Note
     */
    note: string;

    /**
     * Final approver key
     */
    auditUserKey: string;

    /**
     * Creator key
     */
    createdByUserKey: string;

    /**
     * Transaction fee
     */
    txFee: string;

    /**
     * Coin key that is used to pay for the transaction fee when conducting a transfer, such as when transferring ERC-20 tokens, transaction fees are paid in ETH
     */
    feeCoinKey: string;

    /**
     * Total fee
     */
    gasFee?: Array<GasFee>;

    /**
     * Quoted transaction hash (only for sped-up transactions)
     */
    replaceTxHash: string;

    /**
     * Merchant unique business ID
     */
    customerRefId: string;

    /**
     * Transaction counter used to prevent double-spending and replay attacks. This field has a value when a transaction on an EVM-compatible public chain completes approval, or when a custom nonce is passed during transaction creation
     */
    nonce: string;

    /**
     * Represents the txKey of the replaced transaction, returned only during transaction acceleration. Please note that an accelerated transaction and the original transaction are two completely independent transactions and should not be confused or regarded as the same transaction
     */
    replacedTxKey: string;

    /**
     * Represents the customerRefId of the replaced transaction, returned only during transaction acceleration. Please note that an accelerated transaction and the original transaction are two completely independent transactions and should not be confused or regarded as the same transaction. (Note: This field has a value only for transactions accelerated after March 21, 2025.)
     */
    replacedCustomerRefId: string;

    /**
     * Merchant extended field
     */
    customerExt1: string;

    /**
     * Merchant extended field
     */
    customerExt2: string;

    /**
     * Whether the source address contains AML address(es)
     *     YES: contain
     *     NO: not contain
     */
    amlLock: string;

    /**
     * Block height (for confirming transaction and succeeded transaction)
     */
    blockHeight: number;

    /**
     * Transaction completion time
     */
    completedTime: number;

    /**
     * Type of actual destination account
     */
    realDestinationAccountType: string

    /**
     * Amount in USD when transact
     */
    txAmountToUsd: string;

    /**
     * Source account name
     */
    sourceAccountName: string;


    /**
     * Destination account name
     */
    destinationAccountName: string;


    /**
     * Final approver username
     */
    auditUserName: string;

    /**
     * Creator username
     */
    createdByUserName: string;

    /**
     *     Transaction history (resulting from sped-up EVM and UTXO-based transactions); Only have a value once the current transaction has been accelerated
     */
    speedUpHistory: Array<TransactionsResponse>;

    /**
     * Transaction Direction
     */
    transactionDirection: string;
}

export interface ApprovalDetailTransactionsRequest {
    /**
     * Transaction key list within 20 transaction keys
     */
    txKeyList: Array<string>;
}

export interface ApprovalDetailTransactionsResponse {
    /**
     * List of transaction approval details, excluding the following transactions:
     * Transactions using old transaction policies
     * Transactions that do not exist in the system
     * Incoming fund transactions
     */
    approvalDetailList: Array<ApprovalDetail>;
}

export interface ApprovalDetail {
    /**
     * Transaction key
     */
    txKey: string;

    /**
     * Approval status:
     * PENDING_APPROVAL: Pending approval
     * APPROVED: Approved
     * REJECTED: Rejected
     * CANCELLED: Cancelled
     * BLOCKED_BY_POLICY: Blocked by policy
     * FAILED: Failed
     */
    approvalStatus: string;

    /**
     * Name of triggered policy
     */
    policyName: string;

    /**
     * Approval progress details
     */
    approvalProgress: ApprovalProgress;
}

export interface ApprovalProgress {
    /**
     * Approval progress details on the recipient end.
     * This field is only returned when the receiving address is Connect and the counterparty has set up incoming funds approval (except when the transaction approval status is BLOCKED_BY_POLICY)
     */
    recipientApproval?: RecipientApproval;

    /**
     * Approval progress. Proceeds to team approval after Connect recipient approval (if any) is completed.
     */
    teamApproval: Array<TeamApproval>;
}

export interface RecipientApproval {
    /**
     * Recipient Connect ID
     */
    connectId: string;

    /**
     * Recipient Connect profile name
     */
    name: string;

    /**
     * Approval status on the recipient end:
     * PENDING_APPROVAL: Pending approval
     * APPROVED: Approved
     * REJECTED: Rejected
     * CANCELLED: Approval cancelled
     */
    approvalStatus: string;
}

export interface TeamApproval {
    /**
     * SINGLE: Single transaction limit
     * CUMULATIVE: Cumulative limit
     */
    type: string;

    /**
     * VALUE: Limited by value
     * AMOUNT: Limited by token denomination amount
     * COUNT: Limited by transaction count, only available for CUMULATIVE (cumulative limit)
     */
    limitBy?: string;

    /**
     * Limit range of limitBy in a format as: [min, max]，which means: min <= limitBy < max, where max is -1 means there's no maximum limit
     */
    range: Array<string>;

    /**
     * Hour-based limit time period of limitBy.This field is only returned when type is CUMULATIVE
     */
    timePeriod?: number;

    /**
     * Approval node. If the transaction is blocked by policy, as the transaction approval status is BLOCKED_BY_POLICY, there will be no approval nodes
     */
    approvalNodes?: Array<ApprovalNode>;
}

export interface ApprovalNode {
    /**
     * Approval threshold of the node
     */
    threshold: number;

    /**
     * Approval node name
     */
    name: string;

    /**
     * Current approval status of the approval node:
     * PENDING_APPROVAL: Pending approval
     * APPROVED: Approved
     * REJECTED: Rejected
     * CANCELLED: Approval cancelled. The following situations will result in the current approval node being in "Approval cancelled" status:
     * 1. A member in the node cancel the transaction
     * 2. A preceding approval node cancel or reject the approval, all subsequent nodes will automatically change to "Approval cancelled" status
     * 3. The Connect recipient (if any) cancel or reject approval, all nodes will automatically change to "Approval cancelled" status
     * 4. Transaction is cancelled before the approval completing, all nodes will automatically change to "Approval cancelled" status
     */
    approvalStatus: string;

    /**
     * Approval member
     */
    members: Array<Member>;
}

export interface Member {
    /**
     * Approver unique identifier
     */
    auditUserKey: string;

    /**
     * Approver name
     */
    auditUserName: string;

    /**
     * Whether the approver is API Co-Signer
     */
    isCoSigner: boolean;

    /**
     * Approval status of current approver:
     * PENDING_APPROVAL: Pending approval
     * APPROVED: Approved
     * REJECTED: Rejected
     * CANCELLED: Cancelled
     */
    approvalStatus: string;
}

export interface TransactionsFeeRateRequest {
    /**
     * Coin key
     */
    coinKey: string;

    /**
     * Transaction hash, pass the original transaction hash when speed up transaction estimation
     */
    txHash?: string;

    /**
     * Source account key, required for UTXO-based coins
     */
    sourceAccountKey?: string;

    /**
     * Source address are required for TRON when estimating transaction fees. For EVM-based transactions, the source address is required when retrieving the gas limit on the blockchain. Otherwise, a default fixed gas limit value will be returned
     */
    sourceAddress?: string;

    /**
     * Destination address is optional for TRON and FIL when estimating transaction fees (although providing it may result in a more accurate fee estimation). For EVM-based transactions, the destination address is required when retrieving the gas limit on the blockchain. Otherwise, a default fixed gas limit value will be returned
     */
    destinationAddress?: string;

    /**
     * Destination address list
     */
    destinationAddressList?: Array<DestinationAddress>;

    /**
     * Transfer amount is required to calculate gas limit more accurately when using EVM chains. When using UTXO, providing the amount can estimate transaction fees more accurately. If no amount is provided, the calculation is based on the maximum UTXO quantity. When using SUI, providing the amount can estimate gas budget more accurately
     */
    value?: string;
}

export interface TransactionsFeeRateResponse {
    /**
     * Fee rate unit
     */
    feeUnit: string;

    /**
     * Minimum fee rate
     */
    minFeeRate: FeeRate;

    /**
     * Fee rate when the transaction fee rate is low
     */
    lowFeeRate: FeeRate;

    /**
     * Fee rate when the transaction fee rate is medium
     */
    middleFeeRate: FeeRate;

    /**
     * Fee rate when the transaction fee rate is high
     */
    highFeeRate: FeeRate;
}

export interface FeeRate {
    /**
     * Fee rate, UTXO fee per byte, EVM gas price, TRON fee limit and SUI gas price
     */
    feeRate: string;

    /**
     * Estimated transaction fee
     */
    fee: string;

    /**
     * EVM gas limit
     */
    gasLimit: string;

    /**
     * EIP-1559 base fee
     */
    baseFee: string;

    /**
     * EIP-1559 max priority fee
     */
    maxPriorityFee: string;

    /**
     * EIP-1559 max fee, different from maxTxFeeRate in API
     */
    maxFee: string;

    /**
     * The number of bytes for UTXO-based coin, excluding UTXO-based coins is less than 1,000 satoshis
     */
    bytesSize: string;

    /**
     * Filecoin gas premium, similar to EIP-1559 max priority fee
     */
    gasPremium: string;

    /**
     * Filecoin gas fee cap, similar to EIP-1559 max fee
     */
    gasFeeCap: string;

    /**
     * SUI gasBudget
     */
    gasBudget: string;

    /**
     * The gas price the transaction sender is willing to pay, similar to EVM gasPrice
     */
    gasUnitPrice?: string;

    /**
     * The maximum number of gas units that the transaction sender is willing to spend to execute the transaction, similar to EVM gasLimit
     */
    maxGasAmount?: string;
}

export interface CancelTransactionRequest {
    /**
     * Transaction key
     */
    txKey: string;

    /**
     * Transaction type, TRANSACTION by default
     */
    txType?: string;
}

export interface CollectionTransactionsUTXORequest {
    /**
     * Merchant unique business ID (100 characters max)
     */
    customerRefId: string;

    /**
     * Merchant extended field (defined by merchant) shown to merchant (255 characters max)
     */
    customerExt1?: string;

    /**
     * Merchant extended field (defined by merchant) shown to merchant (255 characters max)
     */
    customerExt2?: string;

    /**
     * Transaction note (180 characters max)
     */
    note?: string;

    /**
     * Coin key
     */
    coinKey: string;

    /**
     * Transaction fee rate, the unit is the feeUnit returned by the coin list
     */
    txFeeRate?: string;

    /**
     * Transaction Fee Rate Grade
     * Choose between the transaction fee rate. If the transaction fee rate is preset, it will take priority
     */
    txFeeLevel?: string;

    /**
     * Maximum estimated transaction fee rate for a given transaction
     */
    maxTxFeeRate?: string;

    /**
     * Minimum sweeping amount
     */
    minCollectionAmount?: string;

    /**
     * Source account key
     */
    sourceAccountKey: string;

    /**
     * Account type
     */
    sourceAccountType: string;

    /**
     * Destination account key
     * Whitelist key if the destination is a whitelisted account;
     * Wallet account key if the destination is a wallet account;
     * No key for unknown address
     */
    destinationAccountKey: string;

    /**
     * Destination account type
     */
    destinationAccountType: string;

    /**
     * If the destinationAccountType is ONE_TIME_ADDRESS, then this field should have a value
     */
    destinationAddress?: string;

    /**
     * Destination Tag
     */
    destinationTag?: string;
}

export interface CollectionTransactionsUTXOResponse {
    /**
     * Transaction key
     */
    txKey: string;

    /**
     * Sweeping amount, the unit is the symbol returned by the coin list
     */
    collectionAmount: string;

    /**
     * Number of collections
     */
    collectionNum: number;
}

export class TransactionApi {

    private client: SafeheronClient;

    constructor(config: SafeheronConfig) {
        this.client = new SafeheronClient({
            baseUrl: config.baseUrl,
            apiKey: config.apiKey,
            rsaPrivateKey: config.rsaPrivateKey,
            safeheronRsaPublicKey: config.safeheronRsaPublicKey,
            requestTimeout: config.requestTimeout
        });
    }


    /**
     * Transaction List V1
     * Filter transaction history by various conditions. For optimal results, we recommend using the V2 version.
     */
    async listTransactionsV1(request: ListTransactionsV1Request): Promise<PageResult<TransactionsResponse>> {
        return await this.client.doRequest<ListTransactionsV1Request, PageResult<TransactionsResponse>>('/v1/transactions/list', request);
    }

    /**
     * Transaction List V2
     * Filter transaction history by various conditions.
     */
    async listTransactionsV2(request: ListTransactionsV2Request): Promise<Array<TransactionsResponse>> {
        return await this.client.doRequest<ListTransactionsV2Request, Array<TransactionsResponse>>('/v2/transactions/list', request);
    }

    /**
     * Create a new transaction.
     */
    async createTransactions(request: CreateTransactionRequest): Promise<TxKeyResult> {
        return await this.client.doRequest<CreateTransactionRequest, TxKeyResult>('/v2/transactions/create', request);
    }

    /**
     * Create a new transaction V3.
     */
    async createTransactionsV3(request: CreateTransactionRequest): Promise<CreateTransactionV3Response> {
        return await this.client.doRequest<CreateTransactionRequest, CreateTransactionV3Response>('/v3/transactions/create', request);
    }

    /**
     * For UTXOs that natively support multiple OUTPUTs, this interface allows a single transaction to transfer funds to multiple destination addresses simultaneously.(To use the Co-Signer, please use version 1.5.9 or higher)
     */
    async createTransactionsUTXOMultiDest(request: CreateTransactionsUTXOMultiDestRequest): Promise<TxKeyResult> {
        return await this.client.doRequest<CreateTransactionsUTXOMultiDestRequest, TxKeyResult>('/v1/transactions/utxo/multidest/create', request);
    }

    /**
     * Speed up EVM and UTXO-based Transactions
     * Transactions with low transaction fees and those that have been pending for a long time can be sped up. EVM-based and BTC transactions can be sped up through RBF(If 'isRbf' is set to true during transaction creation, the transaction will be accelerated using RBF acceleration. Otherwise, CPFP acceleration will be used.) For other UTXO-based transactions, CPFP will be used.
     */
    async recreateTransactions(request: RecreateTransactionRequest): Promise<TxKeyResult> {
        return await this.client.doRequest<RecreateTransactionRequest, TxKeyResult>('/v2/transactions/recreate', request);
    }

    /**
     * Retrieve a Transaction
     * To query a transaction, either customerRefId or txKey are required. If both values are provided, the retrieval will be based on the txKey.
     */
    async oneTransactions(request: OneTransactionsRequest): Promise<OneTransactionsResponse> {
        return await this.client.doRequest<OneTransactionsRequest, OneTransactionsResponse>('/v1/transactions/one', request);
    }

    /**
     * Retrieve Transaction Approval Details
     * Query approval details of a transaction. Exclusively for transactions using the new advanced transaction policy. Learn more about new advanced transaction policies.
     */
    async approvalDetailTransactions(request: ApprovalDetailTransactionsRequest): Promise<ApprovalDetailTransactionsResponse> {
        return await this.client.doRequest<ApprovalDetailTransactionsRequest, ApprovalDetailTransactionsResponse>('/v1/transactions/approvalDetail', request);
    }

    /**
     * Estimate Transaction Fee
     * This interface provides users with an estimated range of transaction fee rates of a given cryptocurrency when creating or speeding up transactions.
     */
    async transactionFeeRate(request: TransactionsFeeRateRequest): Promise<TransactionsFeeRateResponse> {
        return await this.client.doRequest<TransactionsFeeRateRequest, TransactionsFeeRateResponse>('/v2/transactions/getFeeRate', request);
    }

    /**
     * Cancel Transaction
     * Cancel the authorization-pending transaction and the signing-in-progress transaction.
     */
    async cancelTransactions(request: CancelTransactionRequest): Promise<ResultResponse> {
        return await this.client.doRequest<CancelTransactionRequest, ResultResponse>('/v1/transactions/cancel', request);
    }

    /**
     * UTXO-Based Coin Sweeping
     * For multi-address UTXO coins under a wallet account, this interface allows users to collect the balances of certain qualifying addresses into a specified destination address.
     */
    async collectionTransactionsUTXO(request: CollectionTransactionsUTXORequest): Promise<CollectionTransactionsUTXOResponse> {
        return await this.client.doRequest<CollectionTransactionsUTXORequest, CollectionTransactionsUTXOResponse>('/v1/transactions/utxo/collection', request);
    }
}
