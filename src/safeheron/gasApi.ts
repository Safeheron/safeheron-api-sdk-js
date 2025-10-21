import {SafeheronClient} from '../safeheron';
import {SafeheronConfig} from "../config";

export interface GasStatusResponse {
    /**
     * Gas Balance
     */
    gasBalance: Array<GasBalance>;

    /**
     * Gas configuration
     */
    configuration: Array<Configuration>;
}

export interface GasBalance {
    /**
     * Coin
     */
    symbol: string;

    /**
     * Balance
     */
    amount: string;
}

export interface Configuration {
    /**
     * Network. Currently supported networks are: Ethereum、TRON、BNB Smart Chain、Arbitrum、Polygon
     */
    network: string;

    /**
     * Whether automatic refueling is enabled
     */
    enabled: boolean;
}

export interface GasTransactionsGetByTxKeyRequest {
    /**
     * Transaction key, obtained from transactions created via the Create a Transaction V3 API, App, or Web Console.
     */
    txKey: string;
}

export interface GasTransactionsGetByTxKeyResponse {
    /**
     * Transaction key
     */
     txKey: string;

    /**
     * Transaction fee coin
     */
     symbol: string;

    /**
     * Total fee amount. A single transaction may have multiple Gas records; the total fee paid is the sum of all records with SUCCESS and FAILURE_GAS_CONSUMED statuses.
     */
     totalAmount: string;

    /**
     * Gas records
     */
    detailList: Array<Detail>;
}




export interface Detail {
    /**
     * Energy rental transaction Key
     */
     gasServiceTxKey: string;

    /**
     * Transaction fee coin
     */
     symbol: string;

    /**
     * Amount
     */
     amount: string;

    /**
     * Balance after paying the fee
     */
     balance: string;

    /**
     * SUCCESS: Gas successful
     * FAILURE_GAS_REFUNDED: Gas failed, refunded
     * FAILURE_GAS_CONSUMED: Gas failed, but fees were incurred
     */
     status: string;

    /**
     * Gas resource type, only valid for TRON network:
     * ENERGY
     * BANDWIDTH
     */
     resourceType: string;

    /**
     * Gas deduction time, UNIX timestamp in milliseconds
     */
     timestamp: string;
}

export class GasApi {

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
     * Retrieve Gas Balance
     * Retrieve your Gas balance for the TRON energy rental service.
     */
    async gasStatus(): Promise<GasStatusResponse> {
        return await this.client.doRequest<null, GasStatusResponse>('/v1/gas/status', null);
    }


    /**
     * Retrieve Automatic Gas Records for Transactions
     * When the TRON energy rental service is enabled, Safeheron automatically tops up the required Gas fees for TRON network transactions. This API allows you to query the energy rental records used by a transaction. A single transaction may have multiple records. The actual Gas fee consumed by the transaction is the sum of all records with SUCCESS and FAILURE_GAS_CONSUMED statuses.
     */
    async gasTransactionsGetByTxKey(request: GasTransactionsGetByTxKeyRequest): Promise<GasTransactionsGetByTxKeyResponse> {
        return await this.client.doRequest<GasTransactionsGetByTxKeyRequest, GasTransactionsGetByTxKeyResponse>('/v1/gas/transactions/getByTxKey', request);
    }
}
