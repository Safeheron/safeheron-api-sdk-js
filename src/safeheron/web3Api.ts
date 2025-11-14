import {SafeheronClient} from '../safeheron';
import {SafeheronConfig} from "../config";
import {LimitSearch, TxKeyResult} from "./transactionApi";
import {CheckCoinAddressRequest, CheckCoinAddressResponse} from "./coinApi";
import {ResultResponse} from "./accountApi";

export interface CreateWeb3AccountRequest {

    /**
     * Account name, 50 characters max
     */
    accountName?: string;

    /**
     *    Whether display in Safeheron Console
     * True: not display
     * False: display
     * Default: false
     */
    hiddenOnUI?: boolean;

    /**
     * Merchant unique business ID (100 characters max)
     * The customerRefId uniquely represents a wallet. In the case of duplicate customerRefId values (for example, when resubmitting due to request timeouts or other errors), the data returned by the interface will remain consistent
     */
    customerRefId?: string;
}

export interface Web3AccountResponse {
    /**
     * Account Key, the only account identifier
     */
    accountKey: string;

    /**
     * Account name
     */
    accountName: string;

    /**
     * Display status in Safeheron App
     * True: not display
     * False: display
     */
    hiddenOnUI: boolean;

    /**
     * Account public key information
     */
    pubKeyList: Array<{
        /**
         * Signature algorithm, currently supports secp256k1
         */
        signAlg: string;

        /**
         * Account compressed public key
         */
        pubKey: string;
    }>;

    /**
     * Address list
     */
    addressList: Array<{
        /**
         * Blockchain type
         */
        blockchainType: string;

        /**
         * BIP44 derivation path
         */
        derivePath: string;

        /**
         * Coin receiving address
         */
        address: string;
    }>;
}

export interface BatchCreateWeb3AccountRequest {
    /**
     * The prefix of wallet account name, 50 characters max
     */
    accountName?: string;

    /**
     * Number of wallets to be created, greater than 0, less than 100
     */
    count: number;

    /**
     *    Whether display in Safeheron Console
     * True: not display
     * False: display
     * Default: false
     */
    hiddenOnUI?: boolean;
}

export interface BatchCreateWeb3AccountResponse {

    /**
     * Account Key, the only account identifier
     */
    accountKey: string;

    /**
     * Account public key information
     */
    pubKeyList: Array<{
        /**
         * Signature algorithm, currently supports secp256k1
         */
        signAlg: string;

        /**
         * Account compressed public key
         */
        pubKey: string;
    }>;


    /**
     * Address list
     */
    addressList: Array<{
        /**
         * Blockchain type
         */
        blockchainType: string;

        /**
         * BIP44 derivation path
         */
        derivePath: string;

        /**
         * Coin receiving address
         */
        address: string;
    }>;
}

export interface ListWeb3AccountRequest extends LimitSearch {
    /**
     * Filter the response based on this account name prefix
     */
    namePrefix?: string;
    /**
     * Merchant unique business ID (100 characters max)
     */
    customerRefId?: string;
}

export interface OneWeb3AccountRequest {
    /**
     * Account Key, the only account identifier。The Account Key, which is the unique identifier for the account. Cannot be empty at the same time as the customerRefId parameter. If both are provided, the accountKey parameter will take precedence.
     */
    accountKey?: string;

    /**
     * Merchant unique business ID (100 characters max)
     */
    customerRefId?: string;
}

export interface CreateWeb3EthSignRequest {
    /**
     * Source account key
     */
    accountKey: string;

    /**
     * Merchant unique business ID (100 characters max)
     */
    customerRefId: string;

    /**
     * Note
     */
    note?: string;

    /**
     * Merchant extended field (defined by merchant) shown to merchant (255 characters max)
     */
    customerExt1?: string;

    /**
     * Merchant extended field (defined by merchant) shown to merchant (255 characters max)
     */
    customerExt2?: string;

    /**
     * Use custom network
     * False: Use the network supported by Safeheron by default
     * True: Use a custom network added through the Safeheron Browser Extension
     */
    useCustomNetwork?: boolean;

    /**
     * Message Hash
     */
    messageHash: {

        /**
         * Chain ID (does not participate in signing, only the hash is used for signing)
         */
        chainId: number;

        /**
         * Pending signature hash, hexadecimal string (currently only supports one input)
         */
        hash: Array<string>;

    };
}

export interface CreateWeb3PersonalSignRequest {

    /**
     * Source account key
     */
    accountKey: string;

    /**
     * Merchant unique business ID (100 characters max)
     */
    customerRefId: string;

    /**
     * Note
     */
    note?: string;

    /**
     * Merchant extended field (defined by merchant) shown to merchant (255 characters max)
     */
    customerExt1?: string;

    /**
     * Merchant extended field (defined by merchant) shown to merchant (255 characters max)
     */
    customerExt2?: string;

    /**
     * Use custom network
     * False: Use the network supported by Safeheron by default
     * True: Use a custom network added through the Safeheron Browser Extension
     */
    useCustomNetwork?: boolean;

    /**
     * Message
     */
    message: {
        /**
         * Chain ID (does not participate in signing, only the hash is used for signing)
         */
        chainId: number;

        /**
         * Data to be signed
         */
        data: string;
    };


}

export interface CreateWeb3EthSignTypedDataRequest {
    /**
     * Source account key
     */
    accountKey: string;

    /**
     * Merchant unique business ID (100 characters max)
     */
    customerRefId: string;

    /**
     * Note
     */
    note?: string;

    /**
     * Merchant extended field (defined by merchant) shown to merchant (255 characters max)
     */
    customerExt1?: string;

    /**
     * Merchant extended field (defined by merchant) shown to merchant (255 characters max)
     */
    customerExt2?: string;

    /**
     * Use custom network
     * False: Use the network supported by Safeheron by default
     * True: Use a custom network added through the Safeheron Browser Extension
     */
    useCustomNetwork?: boolean;

    /**
     * Message
     */
    message: {
        /**
         * Chain ID (does not participate in signing, only the hash is used for signing)
         */
        chainId: number;

        /**
         * Data to be signed
         */
        data: string;

        /**
         * EthSignTypedData Version
         */
        version: string;
    };
}

export interface CreateWeb3EthSignTransactionRequest {
    /**
     * Source account key
     */
    accountKey: string;

    /**
     * Merchant unique business ID (100 characters max)
     */
    customerRefId: string;

    /**
     * Note
     */
    note?: string;

    /**
     * Merchant extended field (defined by merchant) shown to merchant (255 characters max)
     */
    customerExt1?: string;

    /**
     * Merchant extended field (defined by merchant) shown to merchant (255 characters max)
     */
    customerExt2?: string;

    /**
     * Use custom network
     * False: Use the network supported by Safeheron by default
     * True: Use a custom network added through the Safeheron Browser Extension
     */
    useCustomNetwork?: boolean;

    /**
     * Transaction
     */
    transaction: {
        /**
         * To
         */
        to?: string;

        /**
         * Value (Unit: wei)
         */
        value: string;

        /**
         * Chain ID
         */
        chainId: number;

        /**
         * Gas price
         */
        gasPrice?: string;

        /**
         * Gas limit
         */
        gasLimit: number;

        /**
         * Max priority fee per gas for EIP-1559
         */
        maxPriorityFeePerGas?: string;

        /**
         * Max fee per gas for EIP-1559
         */
        maxFeePerGas?: string;

        /**
         * Nonce
         */
        nonce: number;

        /**
         * Data
         */
        data?: string;
    };


}

export interface CancelWeb3SignRequest {
    /**
     * Transaction key
     */
    txKey: string;

}

export interface OneWeb3SignRequest {

    /**
     * Transaction key
     */
    txKey?: string;

    /**
     * Merchant unique business ID (100 characters max)
     */
    customerRefId?: string;
}

export interface Web3SignResponse {

    /**
     * Transaction key
     */
    txKey: string;

    /**
     * Source account key
     */
    accountKey: string;

    /**
     * Source address
     */
    sourceAddress: string;

    /**
     * Transaction status
     */
    transactionStatus: string;

    /**
     * Transaction substatus
     */
    transactionSubStatus: string;

    /**
     * Creator key
     */
    createdByUserKey: string;

    /**
     * Creator username
     */
    createdByUserName: string;

    /**
     * Transaction creation time, UNIX timestamp (ms)
     */
    createTime: number;

    /**
     * Final approver key
     */
    auditUserKey: string;

    /**
     * Final approver username
     */
    auditUserName: string;

    /**
     * Merchant unique business ID
     */
    customerRefId: string;

    /**
     * Note
     */
    note: string;

    /**
     * Merchant extended field
     */
    customerExt1: string;

    /**
     * Merchant extended field
     */
    customerExt2: string;

    /**
     * Account balance
     */
    balance: string;

    /**
     * Token balance
     */
    tokenBalance: string;

    /**
     * Coin unit
     */
    symbol: string;

    /**
     * Token name
     */
    tokenSymbol: string;

    /**
     * Signature Type
     */
    subjectType: string;

    /**
     * This field is returned when the signature type is ETH_SIGNTRANSACTION
     */
    transaction: {
        /**     * To
         */
        to: string;

        /**
         * Value (Unit: wei)
         */
        value: string;

        /**
         * Chain ID
         */
        chainId: number;

        /**
         * Gas price
         */
        gasPrice: string;

        /**
         * Gas limit¬
         */
        gasLimit: number;

        /**
         * Max priority fee per gas for EIP-1559
         */
        maxPriorityFeePerGas: string;

        /**
         * Max fee per gas for EIP-1559
         */
        maxFeePerGas: string;

        /**
         * Nonce
         */
        nonce: number;

        /**
         * Data
         */
        data: string;

        /**
         * Transaction hash (This value is returned for signed transactions)
         */
        txHash: string;
        /**
         * Hexadecimal data (This value is returned for signed transactions)
         */
        signedTransaction: string;
        /**
         * Signature
         */
        sig: {
            /**
             * Hash
             */
            hash: string;

            /**
             * Signature (This value is returned for signed transactions)
             */
            sig: string;
        };

    }
    /**
     * Message
     */
    message: {
        /**
         * Chain ID
         */
        chainId: number;

        /**
         * Data
         */
        data: string;

        /**
         * Signature
         */
        sig: {
            /**
             * Hash
             */
            hash: string;

            /**
             * Signature (This value is returned for signed transactions)
             */
            sig: string;
        };


    }
    /**
     * Message Hash
     */
    messageHash: {
        /**
         * Chain ID
         */
        chainId: number;

        /**
         * Signature list
         */
        sigList: Array<{
            /**
             * Hash
             */
            hash: string;

            /**
             * Signature (This value is returned for signed transactions)
             */
            sig: string;
        }>;


    }
}

export interface ListWeb3SignRequest extends LimitSearch {

    /**
     * Web3 Sign type
     */
    subjectType?: string;

    /**
     * Transaction status
     */
    transactionStatus?: Array<string>;

    /**
     * Source account key
     */
    accountKey?: string;

    /**
     * Start time for creating a transaction, UNIX timestamp (ms) (If no value is provided, the default value is createTimeMax minus 24 hours)
     */
    createTimeMin?: number;

    /**
     * End time for creating a transaction, UNIX timestamp (ms) (If no value is provided, the default value is the current UTC time)
     */
    createTimeMax?: number;
}

export class Web3Api {

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
     * Create a Web3 Wallet Account
     */
    async createWeb3Account(request: CreateWeb3AccountRequest): Promise<Web3AccountResponse> {
        return await this.client.doRequest<CreateWeb3AccountRequest, Web3AccountResponse>('/v1/web3/account/create', request);
    }

    /**
     * Batch Create Web3 Wallet Accounts
     * Create a batch of wallet accounts based on specified number. Web3 wallet accounts created in batches are not displayed in the Safeheron App by default.
     */
    async batchCreateWeb3Account(request: BatchCreateWeb3AccountRequest): Promise<Array<BatchCreateWeb3AccountResponse>> {
        return await this.client.doRequest<BatchCreateWeb3AccountRequest, Array<BatchCreateWeb3AccountResponse>>('/v1/web3/batch/account/create', request);
    }

    /**
     * List Web3 Wallet Accounts
     * Filter Web3 wallet account lists by various conditions.
     */
    async listWeb3Accounts(request: ListWeb3AccountRequest): Promise<Array<Web3AccountResponse>> {
        return await this.client.doRequest<ListWeb3AccountRequest, Array<Web3AccountResponse>>('/v1/web3/account/list', request);
    }

    /**
     * Retrieve a Single Web3 Wallet Account
     * Retrieve a single web3 wallet account based on accountKey or customerRefId
     */
    async oneWeb3Account(request: OneWeb3AccountRequest): Promise<Web3AccountResponse> {
        return await this.client.doRequest<OneWeb3AccountRequest, Web3AccountResponse>('/v1/web3/account/one', request);
    }

    /**
     * Create ethSign
     * Merchants can initiate an ethSign signature through this interface. The merchant is required to serialize the transaction data, generating a corresponding hash (supporting both 0x and non-0x formatted data). The hash is then submitted through this interface to create a signature, which can be obtained by Retrieve a Single Web3 Signature interface or webhook. From there, merchants can complete the subsequent steps according to their own needs once they have obtained the signature.
     */
    async createWeb3EthSign(request: CreateWeb3EthSignRequest): Promise<TxKeyResult> {
        return await this.client.doRequest<CreateWeb3EthSignRequest, TxKeyResult>('/v1/web3/sign/ethSign', request);
    }

    /**
     * Create personalSign
     * Merchants can initiate a personalSign signature for any text using this interface. The merchant only needs to prepare the data to be signed and submit it through this interface to create the signature. The resulting signature can then be obtained by Retrieve a Single Web3 Signature interface or via webhook. From there, merchants can complete the subsequent steps according to their own needs once they have obtained the signature.
     */
    async createWeb3PersonalSign(request: CreateWeb3PersonalSignRequest): Promise<TxKeyResult> {
        return await this.client.doRequest<CreateWeb3PersonalSignRequest, TxKeyResult>('/v1/web3/sign/personalSign', request);
    }

    /**
     * Create ethSignTypedData
     * Merchants can initiate an ethSignTypedData signature of specific formatted data (supporting data formats of v1, v3, and v4) through this interface. Merchants will need to format their signature data and submit it through the interface. Once the signature is created, the result can be retrieved via Retrieve a Single Web3 Signature interface or webhook. From there, merchants can complete the subsequent steps according to their own needs once they have obtained the signature.
     */
    async createWeb3EthSignTypedData(request: CreateWeb3EthSignTypedDataRequest): Promise<TxKeyResult> {
        return await this.client.doRequest<CreateWeb3EthSignTypedDataRequest, TxKeyResult>('/v1/web3/sign/ethSignTypedData', request);
    }


    /**
     * Create ethSignTransaction
     * Merchants can initiate ethSignTransaction signature transactions through this interface. The merchant must prepare transaction-related data, such as from, to, nonce, gas limit, gas price, value, data, and more. Once this data is submitted, a signature is created and the result can be obtained by Retrieve a Single Web3 Signature interface or webhook. From there, merchants can complete the subsequent steps according to their own needs once they have obtained the signature.
     */
    async createWeb3EthSignTransaction(request: CreateWeb3EthSignTransactionRequest): Promise<TxKeyResult> {
        return await this.client.doRequest<CreateWeb3EthSignTransactionRequest, TxKeyResult>('/v1/web3/sign/ethSignTransaction', request);
    }

    /**
     * Cancel Signature
     * Cancel pending signatures.
     */
    async cancelWeb3Sign(request: CancelWeb3SignRequest): Promise<ResultResponse> {
        return await this.client.doRequest<CancelWeb3SignRequest, ResultResponse>('/v1/web3/sign/cancel', request);
    }

    /**
     * Retrieve a Single Web3 Signature
     * To query a transaction, either customerRefId or txKey are required. If both values are provided, the retrieval will be based on the txKey.
     */
    async oneWeb3Sign(request: OneWeb3SignRequest): Promise<Web3SignResponse> {
        return await this.client.doRequest<OneWeb3SignRequest, Web3SignResponse>('/v1/web3/sign/one', request);
    }

    /**
     * Web3 Sign Transaction List
     * Filter Web3 Sign history by various conditions.
     */
    async listWeb3Sign(request: ListWeb3SignRequest): Promise<Array<Web3SignResponse>> {
        return await this.client.doRequest<ListWeb3SignRequest, Array<Web3SignResponse>>('/v1/web3/sign/list', request);
    }
}
