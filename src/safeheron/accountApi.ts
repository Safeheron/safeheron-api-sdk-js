import {SafeheronClient} from '../safeheron';
import {SafeheronConfig} from "../config";

export interface PageSearch {
    /**
     * Page number, start from 1 (default)
     */
    pageNumber?: number;
    /**
     * The number of bars per page, the default is 10, max is 100
     */
    pageSize?: number;
}

export interface ListAccountRequest extends PageSearch {
    /**
     * Filter whether there are not-displayed wallet accounts in Safeheron Console
     * True: retrieve hidden wallet accounts
     * False: retrieve displayed wallet accounts
     * Default: retrieve all wallet accounts
     */
    hiddenOnUI?: boolean;

    /**
     * Filter wallets based on autoFuel setting:
     * Default: Ignore this query parameter
     * true: Only query wallets where autoFuel is set to true
     * false: Only query wallets where autoFuel is set to false
     */
    autoFuel?: boolean;

    /**
     * Wallet's archive status in Safeheron App and Web Console
     * True: Archived
     * False: Unarchived
     */
    archived?: boolean;

    /**
     * Filter the response based on this account name prefix
     */
    namePrefix?: string;
    /**
     * Filter the response based on this account name suffix
     */
    nameSuffix?: string;
    /**
     * Merchant unique business ID (100 characters max)
     */
    customerRefId?: string;
}

export interface OneAccountRequest {
    /**
     * Wallet account key
     */
    accountKey: string;

    /**
     * Merchant unique business ID (100 characters max)
     */
    customerRefId?: string;
}

export interface OneAccountByAddressRequest {
    /**
     * The wallet address. Note: Wallet addresses for the TRON, Solana, and TON networks are case-sensitive, while other networks are case-insensitive
     */
    address: string;
}

export interface PageResult<T> {
    /**
     * Page number
     */
    pageNumber: number;

    /**
     * The number of bars per page
     */
    pageSize: number;

    /**
     * Total number of records
     */
    totalElements: number;

    /**
     * Data lists per page
     */
    content: Array<T>;
}


export interface AccountResponse {
    /**
     * Account Key, the only account identifier
     */
    accountKey: string;

    /**
     * Account name
     */
    accountName: string;

    /**
     * Merchant unique business ID
     */
    customerRefId?: string;

    /**
     * Account index
     */
    accountIndex: number;

    /**
     * Account type
     * VAULT_ACCOUNT: Vault account
     */
    accountType: string;

    /**
     * Account tag
     */
    accountTag: string;

    /**
     * Whether display in Safeheron Console
     * True: not display
     * False: display
     */
    hiddenOnUI: boolean;

    /**
     * When initiating a transaction, Gas Service automatically supplements the Gas fee for wallets where autoFuel is true
     */
    autoFuel: boolean;

    /**
     * Wallet's archive status in Safeheron App and Web Console
     * True: Archived
     * False: Unarchived
     */
    archived: boolean;

    /**
     * Account balance, in USD when retrieve
     */
    usdBalance: string;

    /**
     * Account public key info
     */
    pubKeys: Array<{
        /**
         * Signature algorithm, currently supports secp256k1
         */
        signAlg: string;

        /**
         * Account compressed public key
         */
        pubKey: string;
    }>;
}

export interface CreateAccountRequest {
    /**
     * Account name, 50 characters max
     */
    accountName?: string;

    /**
     * Merchant unique business ID (100 characters max)
     * The customerRefId uniquely represents a wallet. In the case of duplicate customerRefId values (for example, when resubmitting due to request timeouts or other errors), the data returned by the interface will remain consistent
     */
    customerRefId?: string;

    /**
     * Whether display in Safeheron Console
     * True: not display
     * False: display
     * Default: false
     */
    hiddenOnUI?: boolean;

    /**
     * Auto-refuel. If set to true, the Gas Service will automatically supplement the Gas fee for the wallet when a transaction is initiated. The default value is false
     */
    autoFuel?: boolean;

    /**
     * Account tag
     */
    accountTag?: string;
    /**
     *    Coin key list, 20 array elements max
     */
    coinKeyList?: Array<string>;
}

export interface CreateAccountResponse {
    /**
     * Wallet account key
     */
    accountKey: string;
    /**
     * Account public key info
     */
    pubKeys: Array<{
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
     * Coin address list
     */
    coinAddressList: Array<{
        /**
         * Coin key
         */
        coinKey: string;

        /**
         * The unique identifier of the address group
         */
        addressGroupKey: string;

        /**
         * Address group name
         */
        addressGroupName: string;
        /**
         * Address list
         */
        addressList: Array<{
            /**
             * Coin receiving address
             */
            address: string;
            /**
             * Address type
             */
            addressType: string;
            /**
             * BIP44 derivation path
             */
            derivePath: string;
        }>;
    }>;
}

export interface BatchCreateAccountRequest {
    /**
     * The prefix of wallet account name, 50 characters max
     */
    accountName?: string;

    /**
     * Display status in Safeheron App
     * True: not display
     * False: display
     * Default: true
     */
    hiddenOnUI?: boolean;

    /**
     * Auto-refuel. If set to true, the Gas Service will automatically supplement the Gas fee for the wallet when a transaction is initiated. The default value is false
     */
    autoFuel?: boolean;

    /**
     * Number of wallets to be created, greater than 0, less than 100
     */
    count: number;
    /**
     * Account tag
     */
    accountTag?: string;
}

export interface BatchCreateAccountResponse {
    /**
     * Wallet account key
     */
    accountKeyList: Array<string>;
}

export interface UpdateAccountShowStateRequest {
    /**
     * Wallet account key
     */
    accountKey: string;

    /**
     *    Whether display in Safeheron Console
     * True: not display
     * False: display
     * Default: false
     */
    hiddenOnUI: boolean;
}

export interface BatchUpdateAccountTagRequest {
    /**
     * Wallet account key
     */
    accountKeyList: Array<string>;

    /**
     * Account tag
     */
    accountTag: string;
}

export interface BatchUpdateAccountFuelRequest {
    /**
     * Account key, max is 100
     */
    accountKeyList: Array<string>;

    /**
     * If set to true, Gas Service will automatically supplement the transaction fee (Gas) for the wallet when a transaction is initiated
     */
    autoFuel?: boolean;
}


export interface ResultResponse {
    /**
     * Execution result
     * True: success
     * False: fail
     */
    result: boolean;
}

export interface CreateAccountCoinRequest {
    /**
     * Coin key
     */
    coinKey: string;

    /**
     * Account key
     */
    accountKey: string;
}

export interface CreateAccountCoinV2Request {
    /**
     * Coin key list, 20 array elements max
     */
    coinKeyList: Array<string>;

    /**
     * Account key
     */
    accountKey: string;
}

export interface CreateAccountCoinResponse {
    /**
     * Coin receiving address
     */
    address: string;

    /**
     * addressType
     */
    addressType: string;

    /**
     * BIP44 derivation path
     */
    derivePath: string;
}

export interface CreateAccountCoinV2Response {
    /**
     * Wallet account key
     */
    accountKey: string;

    /**
     * Coin address list
     */
    coinAddressList: Array<{
        /**
         * Coin key
         */
        coinKey: string;
        /**
         * The unique identifier of the address group
         */
        addressGroupKey: string;

        /**
         * Address group name
         */
        addressGroupName: string;
        /**
         * Address list
         */
        addressList: Array<{
            /**
             * Coin receiving address
             */
            address: string;
            /**
             * Address type
             */
            addressType: string;
            /**
             * BIP44 derivation path
             */
            derivePath: string;
        }>;
    }>;
}

export interface BatchCreateAccountCoinRequest {
    /**
     * Coin key
     */
    coinKey: string;

    /**
     * Account key, max is 100
     */
    accountKeyList: Array<string>;

    /**
     * Address group name, 30 characters max
     */
    addressGroupName?: string;
}

export interface BatchCreateAccountCoinResponse {
    /**
     * Address list
     */
    addressList: Array<AddressResult>;

    /**
     * Account key
     */
    accountKey: string;

    /**
     * The unique identifier of the address group
     */
    addressGroupKey: string;

    /**
     * Address group name
     */
    addressGroupName: string;
}

export interface AddressResult {
    /**
     * Coin receiving address
     */
    address: string;

    /**
     * addressType
     */
    addressType: string;

    /**
     * BIP44 derivation path
     */
    derivePath: string;
}

export interface ListAccountCoinRequest {
    /**
     * Account key
     */
    accountKey: string;
}

export interface AccountCoinResponse {
    /**
     * Coin key
     */
    coinKey: string;

    /**
     * Coin full name
     */
    coinFullName: string;

    /**
     * Coin symbol
     */
    coinName: string;

    /**
     * Coin decimal
     */
    coinDecimal: number;

    /**
     * Transaction URL on explorer
     */
    txRefUrl: string;

    /**
     * Block explorer URL
     */
    addressRefUrl: string;

    /**
     * Coin logo URL
     */
    logoUrl: string;

    /**
     * Coin unit
     */
    symbol: string;

    /**
     * Ability to create multiple address groups
     * Yes: yes
     * No: no
     */
    isMultipleAddress: string;

    /**
     * Coin key that is used to pay for the transaction fee when conducting a transfer, such as when transferring ERC-20 tokens, transaction fees are paid in ETH
     */
    feeCoinKey: string;

    /**
     * Transaction fee unit name (Gwei, satoshis)
     */
    feeUnit: string;

    /**
     * Fee decimal on Safeheron Console
     */
    feeDecimal: number;

    /**
     * Displayed coin decimal on Safeheron Console
     */
    showCoinDecimal: number;

    /**
     * Account balance
     */
    balance: string;

    /**
     * Account balance, convert it into USD when query
     */
    usdBalance: string;

    /**
     * Coin address list
     */
    addressList: Array<{
        /**
         * Coin receiving address
         */
        address: string;

        /**
         * addressType
         */
        addressType: string;

        /**
         * BIP44 derivation path
         */
        derivePath: string;

        /**
         * The balance of this coin address
         */
        addressBalance: string;
    }>;
}

export interface ListAccountCoinAddressRequest extends PageSearch {
    /**
     * Coin key
     */
    coinKey: string;

    /**
     * Account key
     */
    accountKey: string;

    /**
     * Merchant unique business ID (100 characters max) when adding an address group
     */
    customerRefId: string;
}

export interface AccountCoinAddressResponse {
    /**
     * Address group key
     */
    addressGroupKey: string;

    /**
     * Address group name
     */
    addressGroupName: string;

    /**
     * Merchant unique business ID when adding an address group
     */
    customerRefId: string;

    /**
     * Address list
     */
    addressList: Array<AddressResult>;
}

export interface InfoAccountCoinAddressRequest {
    /**
     * Coin key
     */
    coinKey: string;

    /**
     * Coin receiving address
     */
    address: string;
}

export interface InfoAccountCoinAddressResponse {
    /**
     * Coin receiving address
     */
    address: string;

    /**
     * Address type
     */
    addressType: string;

    /**
     * BIP44 derivation path
     */
    derivePath: string;

    /**
     * The balance of the coin address
     */
    addressBalance: string;

    /**
     * Account key
     */
    accountKey: string;
}

export interface AccountCoinBalanceRequest {
    /**
     * Coin Keys, max 10
     */
    coinKeyList: Array<string>;
}

export interface AccountCoinBalanceResponse {
    /**
     * Coin balances
     */
    balanceList: Array<{
        /**
         * Coin key
         */
        coinKey: string;

        /**
         * Total coin balance across all asset wallets (in coin units)
         */
        balance: string;
    }>;
}

export interface RenameAccountCoinAddressRequest {
    /**
     * Address group key
     */
    addressGroupKey: string;

    /**
     * Address group name, 30 characters max
     */
    addressGroupName: string;
}

export interface CreateAccountCoinAddressRequest {
    /**
     * Coin key
     */
    coinKey: string;

    /**
     * Account key
     */
    accountKey: string;

    /**
     * Address group name, 30 characters max
     */
    addressGroupName: string;

    /**
     * Merchant unique business ID (100 characters max)
     * The customerRefId uniquely represents an address group. In the case of duplicate customerRefId values (for example, when resubmitting due to request timeouts or other errors), the data returned by the interface will remain consistent
     */
    customerRefId: string;
}

export interface CreateAccountCoinAddressResponse {
    /**
     * Coin receiving address
     */
    address: string;

    /**
     * addressType
     */
    addressType: string;

    /**
     * BIP44 derivation path
     */
    derivePath: string;
}

export interface CreateAccountCoinAddressV2Response {
    /**
     * The unique identifier of the address group
     */
    addressGroupKey: string;

    /**
     * Address group name
     */
    addressGroupName: string;
    /**
     * Address list
     */
    addressList: Array<{
        /**
         * Coin receiving address
         */
        address: string;
        /**
         * Address type
         */
        addressType: string;
        /**
         * BIP44 derivation path
         */
        derivePath: string;
    }>;
}

export interface BatchCreateAccountCoinUTXORequest {
    /**
     * Coin key
     */
    coinKey: string;

    /**
     * Account key
     */
    accountKey: string;

    /**
     * The number, max is 100
     */
    count: number;

    /**
     * Address group name, 30 characters max
     */
    addressGroupName?: string;
}

export interface BatchCreateAccountCoinUTXOResponse {
    /**
     * Address list
     */
    addressList: Array<{
        /**
         * Coin receiving address
         */
        address: string;

        /**
         * addressType
         */
        addressType: string;

        /**
         * BIP44 derivation path
         */
        derivePath: string;
    }>;

    /**
     * Account key
     */
    accountKey: string;

    /**
     * The unique identifier of the address group
     */
    addressGroupKey: string;

    /**
     * Address group name
     */
    addressGroupName: string;
}

export class AccountApi {

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
     * List Wallet Accounts
     * Filter wallet account lists in team according to different combinations of conditions.
     */
    async listAccounts(request: ListAccountRequest): Promise<PageResult<AccountResponse>> {
        return await this.client.doRequest<ListAccountRequest, PageResult<AccountResponse>>('/v1/account/list', request);
    }

    /**
     * Retrieve a Single Wallet Account
     * Retrieve a single wallet account in the team by providing accountKey.
     */
    async oneAccounts(request: OneAccountRequest): Promise<AccountResponse> {
        return await this.client.doRequest<OneAccountRequest, AccountResponse>('/v1/account/one', request);
    }

    /**
     * Query Wallet Account by Address
     */
    async getAccountByAddress(request: OneAccountByAddressRequest): Promise<AccountResponse> {
        return await this.client.doRequest<OneAccountByAddressRequest, AccountResponse>('/v1/account/getByAddress', request);
    }

    /**
     * Create a new wallet account.
     */
    async createAccount(request: CreateAccountRequest): Promise<CreateAccountResponse> {
        return await this.client.doRequest<CreateAccountRequest, CreateAccountResponse>('/v1/account/create', request);
    }

    /**
     * Batch Create Wallet Accounts V1
     * Generate a batch of wallet accounts based on a specified quantity. By default, the wallet accounts created in bulk will not be displayed in the Safeheron App. For optimal results, we recommend using the V2 version.
     */
    async batchCreateAccountV1(request: BatchCreateAccountRequest): Promise<BatchCreateAccountResponse> {
        return await this.client.doRequest<BatchCreateAccountRequest, BatchCreateAccountResponse>('/v1/account/batch/create', request);
    }

    /**
     * Batch Create Wallet Accounts V2
     * Generate a batch of wallet accounts based on a specified quantity. By default, the wallet accounts created in bulk will not be displayed in the Safeheron App.
     */
    async batchCreateAccountV2(request: BatchCreateAccountRequest): Promise<Array<CreateAccountResponse>> {
        return await this.client.doRequest<BatchCreateAccountRequest, Array<CreateAccountResponse>>('/v2/account/batch/create', request);
    }

    /**
     * Change Display of Wallet Account in App
     * Change wallet account status in Safeheron App.
     */
    async updateAccountShowState(request: UpdateAccountShowStateRequest): Promise<ResultResponse> {
        return await this.client.doRequest<UpdateAccountShowStateRequest, ResultResponse>('/v1/account/update/show/state', request);
    }

    /**
     * Batch Label Wallet Accounts
     * Relabel a batch of wallet accounts.
     * Please note that it only supports to label wallets which are created by API. And, the wallets have been used to sweep the target account cannot be relabelled.
     */
    async batchUpdateAccountTag(request: BatchUpdateAccountTagRequest): Promise<ResultResponse> {
        return await this.client.doRequest<BatchUpdateAccountTagRequest, ResultResponse>('/v1/account/batch/update/tag', request);
    }

    /**
     * Batch Set Auto-Fuel
     * Set the autoFuel property for a batch of wallet accounts. Setting it to true means that the Gas Service will automatically supplement the transaction fee (Gas) for that wallet when a transaction is initiated; setting it to false means the Gas Service will no longer supplement the transaction fee for the wallet.
     */
    async batchUpdateAccountAutofuel(request: BatchUpdateAccountFuelRequest): Promise<ResultResponse> {
        return await this.client.doRequest<BatchUpdateAccountFuelRequest, ResultResponse>('/v1/account/batch/update/autofuel', request);
    }

    /**
     * Add Coins to a Wallet Account V1
     * Add a new coin to your wallet account, while generating the default address group for the added coin. Once successfully completed, it will return the address information of the newly created default address group. In case the added currency already exists within the account, it will promptly return the existing default address group information for that coin.
     * In a wallet account, UTXO-based cryptocurrencies can have multiple address groups, while other types of cryptocurrencies usually have only one. To check whether a particular cryptocurrency supports the addition of multiple address groups, simply check the 'isMultipleAddress' parameter through the Coin List.
     */
    async createAccountCoin(request: CreateAccountCoinRequest): Promise<Array<CreateAccountCoinResponse>> {
        return await this.client.doRequest<CreateAccountCoinRequest, Array<CreateAccountCoinResponse>>('/v1/account/coin/create', request);
    }

    /**
     * Add Coins to a Wallet Account V2
     * Add a new coin to your wallet account, and it will generate address information for the added coin. If the added currency already exists within the account, it will promptly return the existing address information for that coin.
     */
    async createAccountCoinV2(request: CreateAccountCoinV2Request): Promise<CreateAccountCoinV2Response> {
        return await this.client.doRequest<CreateAccountCoinV2Request, CreateAccountCoinV2Response>('/v2/account/coin/create', request);
    }

    /**
     * Batch Add Coins to Wallet Accounts
     * Bulk addition of specified coins to designated wallet accounts. And, it creates a default address group for each coin and returns the address information contained within the newly created default address group. If a wallet account already contains the currency being added, the function will return the default address group data for that existing coin.
     */
    async batchCreateAccountCoin(request: BatchCreateAccountCoinRequest): Promise<Array<BatchCreateAccountCoinResponse>> {
        return await this.client.doRequest<BatchCreateAccountCoinRequest, Array<BatchCreateAccountCoinResponse>>('/v1/account/batch/coin/create', request);
    }

    /**
     * List Coins Within a Wallet Account
     * Retrieve a complete list of all coins associated with a wallet account, along with the default address group information for each coin.
     */
    async listAccountCoin(request: ListAccountCoinRequest): Promise<Array<AccountCoinResponse>> {
        return await this.client.doRequest<ListAccountCoinRequest, Array<AccountCoinResponse>>('/v1/account/coin/list', request);
    }

    /**
     * List Coin Address Group of a Wallet Account
     * Retrieve all address groups for a coin within the wallet account.
     */
    async listAccountCoinAddress(request: ListAccountCoinAddressRequest): Promise<PageResult<AccountCoinAddressResponse>> {
        return await this.client.doRequest<ListAccountCoinAddressRequest, PageResult<AccountCoinAddressResponse>>('/v1/account/coin/address/list', request);
    }

    /**
     * Retrieve The Balance of an Address
     * Retrieve the balance of a specific coin address.
     */
    async infoAccountCoinAddress(request: InfoAccountCoinAddressRequest): Promise<InfoAccountCoinAddressResponse> {
        return await this.client.doRequest<InfoAccountCoinAddressRequest, InfoAccountCoinAddressResponse>('/v1/account/coin/address/info', request);
    }

    /**
     * Retrieve Coin Balance
     * Get the coin balance of all asset wallets under the team.
     */
    async accountCoinBalance(request: AccountCoinBalanceRequest): Promise<AccountCoinBalanceResponse> {
        return await this.client.doRequest<AccountCoinBalanceRequest, AccountCoinBalanceResponse>('/v1/account/coin/balance', request);
    }

    /**
     * Rename Coin Address Group of a Wallet Account
     * Rename a coin address group of a wallet account.
     */
    async renameAccountCoinAddress(request: RenameAccountCoinAddressRequest): Promise<ResultResponse> {
        return await this.client.doRequest<RenameAccountCoinAddressRequest, ResultResponse>('/v1/account/coin/address/name', request);
    }

    /**
     * Add Address Group for UTXO-Based Coin V1
     * Add a new address group for UTXO-based cryptocurrencies under a wallet account. If the coin does not exist, it will be added first, followed by the new address group. The function will return the details of the added address(es).
     */
    async createAccountCoinAddress(request: CreateAccountCoinAddressRequest): Promise<Array<CreateAccountCoinAddressResponse>> {
        return await this.client.doRequest<CreateAccountCoinAddressRequest, Array<CreateAccountCoinAddressResponse>>('/v1/account/coin/address/create', request);
    }

    /**
     * Add Address Group for UTXOs V2
     * Add a new address group for UTXO-based cryptocurrencies under a wallet account.If the coin has not been added to the wallet, it will be added automatically.
     */
    async createAccountCoinAddressV2(request: CreateAccountCoinAddressRequest): Promise<CreateAccountCoinAddressV2Response> {
        return await this.client.doRequest<CreateAccountCoinAddressRequest, CreateAccountCoinAddressV2Response>('/v2/account/coin/address/create', request);
    }

    /**
     * Batch Add Address Groups for UTXO-Based Coin
     * For UTXO-based coins in a wallet account, it is possible to add multiple address groups to the account in bulk by specifying the wallet account and the desired number of address groups. The function will return the details of the added address groups. If the specified coin does not exist in the account, it will be added first, followed by the addition of the corresponding number of address groups.
     */
    async batchCreateAccountCoinUTXO(request: BatchCreateAccountCoinUTXORequest): Promise<Array<BatchCreateAccountCoinUTXOResponse>> {
        return await this.client.doRequest<BatchCreateAccountCoinUTXORequest, Array<BatchCreateAccountCoinUTXOResponse>>('/v1/account/coin/utxo/batch/create', request);
    }
}
