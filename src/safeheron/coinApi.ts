import {SafeheronClient} from '../safeheron';
import {SafeheronConfig} from "../config";


export interface CoinResponse {
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
    coinDecimal: string;

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
     * Fee decimal on Safeheron java.io.Console
     */
    feeDecimal: string;

    /**
     * Displayed coin decimal on Safeheron Console
     */
    showCoinDecimal: string;

    /**
     * Coin type
     */
    coinType: string;

    /**
     * Contract address, NATIVE is the native asset, non-NATIVE is the contract address
     */
    tokenIdentifier: string;

    /**
     * Minimum transfer amount, the transfer unit is symbol
     */
    minTransferAmount: string;

    /**
     * Blockchain
     */
    blockChain: string;

    /**
     * Blockchain network
     */
    network: string;

    /**
     * Gas limit set by Safeheron
     */
    gasLimit: string;

    /**
     * Pay MEMO included type
     * Yes: yes
     * No: no
     */
    isMemo: string;

    /**
     * UTXO-based coin, view UTXO-based coins
     * Yes: yes
     * No: no
     */
    isUtxo: string;

    /**
     * Blockchain type
     */
    blockchainType: string;
}

export interface CoinMaintainResponse {
    /**
     * Coin key
     */
    coinKey: string;

    /**
     * Under maintenance or not
     */
    maintain: boolean;

    /**
     * Maintenance title
     */
    title: string;

    /**
     * Content
     */
    content: string;

    /**
     * Coin maintenance start time, UNIX time in milliseconds
     */
    startTime: string;

    /**
     * Coin maintenance end time, UNIX time in milliseconds
     */
    endTime: string;
}

export interface CheckCoinAddressRequest {
    /**
     * Coin key
     */
    coinKey: string;

    /**
     * Coin receiving address
     */
    address: string;

    /**
     * Verify contract address (If no value is provided, 'false' by default)
     * True: verify
     * False: not verify
     */
    checkContract?: boolean;

    /**
     * Verify AML compliance (If no value is provided or be verified, AML-compliant address by default)
     * True: verify
     * False: not verify
     */
    checkAml?: boolean;

    /**
     * Verify the validity of address format (If no value is provided, 'false' by dafault)
     * True: verify
     * False: not verify
     */
    checkAddressValid?: boolean;

    /**
     * Verify if the Solana address is the Owner address (If no value is provided, 'false' by default)
     * True: Verify
     * False: Not verify
     */
    checkSolanaOwnerAddress?: boolean;
}

export interface CheckCoinAddressResponse {
    /**
     * Valid address format
     * True: valid address
     * False: invalid address
     */
    addressValid: boolean;

    /**
     * Contract address
     * True: contract address
     * False: non-contract address
     */
    contract: boolean;

    /**
     * Subject to risk control limitations
     * True: AML valid address
     * False: AML blacklisted address
     */
    amlValid: boolean;

    /**
     * Solana owner address
     * True: Solana owner address
     * False: Non-solana owner address
     */
    solanaOwnerAddress: boolean;
}

export interface CoinBalanceSnapshotRequest {
    /**
     * Only supports querying data within the last 30 days, with the parameter a GMT+8 time in the format of yyyy-MM-dd provided.
     * Note: If the provided value is the current date (not a historical date), it will return the balance up to the current time.
     */
    gmt8Date: string;
}

export interface CoinBalanceSnapshotResponse {
    /**
     * Coin key
     */
    coinKey: string;

    /**
     * Coin balance, displayed in the unit of the symbol specified in the coin list
     */
    coinBalance: string;
}

export interface CoinBlockHeightRequest {
    /**
     * Coin key, multiple coin keys are separated by commas
     */
    coinKey: string;
}

export interface CoinBlockHeightResponse {
    /**
     * Coin key
     */
    coinKey: string;

    /**
     * Coin's current block height
     */
    localBlockHeight: number;
}


export class CoinApi {

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
     * Coin List
     * Retrieve the list of coins supported by Safeheron.
     */
    async coinList(): Promise<Array<CoinResponse>> {
        return await this.client.doRequest<null, Array<CoinResponse>>('/v1/coin/list', null);
    }

    /**
     * Coin Maintenance List
     * Retrieve the information of coins under maintenance in Safeheron.
     */
    async listCoinMaintain(): Promise<Array<CoinMaintainResponse>> {
        return await this.client.doRequest<null, Array<CoinMaintainResponse>>('/v1/coin/maintain/list', null);
    }

    /**
     * Verify Coin Address
     * Verify the correctness of a cryptocurrency address based on the provided validation attributes.
     */
    async checkCoinAddress(request: CheckCoinAddressRequest): Promise<CheckCoinAddressResponse> {
        return await this.client.doRequest<CheckCoinAddressRequest, CheckCoinAddressResponse>('/v1/coin/address/check', request);
    }

    /**
     * Snapshot the Coin Balance
     * Safeheron takes and stores daily snapshots of balances based on the transaction block's creation time in GMT+8. Please note that the snapshot only keeps data within 30 days.
     */
    async coinBalanceSnapshot(request: CoinBalanceSnapshotRequest): Promise<Array<CoinBalanceSnapshotResponse>> {
        return await this.client.doRequest<CoinBalanceSnapshotRequest, Array<CoinBalanceSnapshotResponse>>('/v1/coin/balance/snapshot', request);
    }

    /**
     * Retrieve Current Block Height for Currency
     * Retrieve the current block height for a specific cryptocurrency by providing its key.
     */
    async coinBlockHeight(request: CoinBlockHeightRequest): Promise<Array<CoinBlockHeightResponse>> {
        return await this.client.doRequest<CoinBlockHeightRequest, Array<CoinBlockHeightResponse>>('/v1/coin/block/height', request);
    }
}
