import {SafeheronClient} from '../safeheron';
import {SafeheronConfig} from "../config";


export interface KytReportRequest {
    /**
     * Transaction key. Cannot be empty at the same time as customerRefId. If both are provided, txKey takes precedence.
     */
    txKey?: string;

    /**
     * Merchant unique business ID (100 characters max). Cannot be empty at the same time as txKey.
     */
    customerRefId?: string;
}


export interface KytReportResponse {
    /**
     * Transaction key
     */
    txKey: string;

    /**
     * Merchant unique business ID
     */
    customerRefId: string;

    /**
     * Whether AML compliance screening was triggered for the transaction:
     * IN_PROGRESS: Evaluating — not yet confirmed whether screening will be triggered; amlList is unavailable, please wait for a status update
     * TRIGGERED: Triggered — screening was successfully initiated; check amlList for risk assessment results
     * UNTRIGGERED: Not triggered — screening was not initiated; amlList is empty
     */
    amlScreeningTriggeredState: string;

    /**
     * AML assessment information
     */
    amlList: Array<AmlReport>;
}


export interface AmlReport {
    /**
     * AML service provider: Elliptic, Chainalysis, MistTrack
     */
    provider: string;

    /**
     * Screening creation time, UNIX timestamp (ms)
     */
    timestamp: string;

    /**
     * PENDING: Requesting from provider
     * COMPLETED: Result obtained
     * SKIPPED: Manually skipped
     * FAILED: Provider unavailable or not completed within 8 hours
     */
    status: string;

    /**
     * LOW, MEDIUM, HIGH, SEVERE, UNKNOWN (report obtained but no risk level marked)
     */
    riskLevel: string;

    /**
     * Last update time, UNIX timestamp (ms)
     */
    lastUpdateTime: string;

    /**
     * Raw detailed report from the AML provider (structure varies by provider)
     */
    payload: Object;
}


export interface CreateKyaScreeningRequest {
    /**
     * On-chain address to screen (not limited to Safeheron addresses)
     */
    address: string;

    /**
     * Chain type. See "Retrieve Supported Networks & Providers" for valid values.
     */
    chainType: string;

    /**
     * Blockchain network identifier. Required when providers contains MistTrack.
     */
    network?: string;

    /**
     * Screening providers — at least one, no duplicates, screened in parallel.
     * Valid values: MistTrack, Elliptic, Chainalysis
     */
    providers: Array<string>;
}


export interface KyaScreeningOrder {
    /**
     * Screening order ID
     */
    screenOrderId: string;

    /**
     * Provider identifier
     */
    provider: string;
}


export interface CreateKyaScreeningResponse {
    /**
     * Screening request ID
     */
    screenId: string;

    /**
     * Screened address
     */
    address: string;

    /**
     * Chain type
     */
    chainType: string;

    /**
     * Network identifier
     */
    network: string;

    /**
     * One order generated per provider in providers
     */
    orders: Array<KyaScreeningOrder>;

    /**
     * Creation time, UNIX timestamp (ms)
     */
    createTime: number;
}


export interface KyaScreeningOneRequest {
    /**
     * Screening request ID
     */
    screenId: string;
}


export interface KyaScreeningOrderSummary {
    /**
     * Screening order ID
     */
    screenOrderId: string;

    /**
     * Provider identifier
     */
    provider: string;

    /**
     * PENDING: In progress
     * COMPLETED: Success
     * FAILED: Failed
     * SKIPPED: Skipped
     */
    status: string;

    /**
     * LOW, MEDIUM, HIGH, SEVERE, UNKNOWN
     */
    riskLevel: string;

    /**
     * Completion time, UNIX timestamp (ms) — only returned after terminal state
     */
    completedAt: number;
}


export interface KyaScreeningOneResponse {
    /**
     * Screening request ID
     */
    screenId: string;

    /**
     * Screened address
     */
    address: string;

    /**
     * Chain type
     */
    chainType: string;

    /**
     * Network identifier
     */
    network: string;

    /**
     * PROCESSING: Some orders still in progress
     * FINISHED: All orders completed
     */
    status: string;

    /**
     * Creation time, UNIX timestamp (ms)
     */
    createTime: number;

    /**
     * Screening order list
     */
    orders: Array<KyaScreeningOrderSummary>;
}


export interface KyaScreeningOrderOneRequest {
    /**
     * Screening order ID
     */
    screenOrderId: string;
}


export interface KyaScreeningOrderOneResponse {
    /**
     * Screening order ID
     */
    screenOrderId: string;

    /**
     * Parent screening request ID
     */
    screenId: string;

    /**
     * Provider identifier
     */
    provider: string;

    /**
     * Screened address
     */
    address: string;

    /**
     * VAULT_ACCOUNT: Vault wallet
     * WHITELISTING_ACCOUNT: Whitelist address
     * ONE_TIME_ADDRESS: Unknown address
     * If both vault and whitelist, marked as VAULT_ACCOUNT
     */
    addressType: string;

    /**
     * Chain type
     */
    chainType: string;

    /**
     * Network identifier
     */
    network: string;

    /**
     * PENDING, COMPLETED, FAILED, SKIPPED
     */
    status: string;

    /**
     * LOW, MEDIUM, HIGH, SEVERE, UNKNOWN
     */
    riskLevel: string;

    /**
     * Completion time, UNIX timestamp (ms) — only returned after terminal state
     */
    completedAt: number;

    /**
     * Screening initiation time, UNIX timestamp (ms)
     */
    createTime: number;

    /**
     * Provider's raw report — available after completion, structure varies by provider
     */
    payload: Object;
}


export interface KyaSupportedNetwork {
    /**
     * Network identifier
     */
    network: string;

    /**
     * Chain type
     */
    chainType: string;

    /**
     * Providers supporting this network
     */
    providers: Array<string>;
}


export class ComplianceApi {

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
     * Retrieve Transaction KYT Report
     */
    async kytReport(request: KytReportRequest): Promise<KytReportResponse> {
        return await this.client.doRequest<KytReportRequest, KytReportResponse>('/v1/compliance/kyt/report', request);
    }

    /**
     * Create KYA Screening Request
     * Initiates an address screening request against one or more AML providers in parallel.
     */
    async createKyaScreening(request: CreateKyaScreeningRequest): Promise<CreateKyaScreeningResponse> {
        return await this.client.doRequest<CreateKyaScreeningRequest, CreateKyaScreeningResponse>('/v1/compliance/kya/screening/create', request);
    }

    /**
     * Retrieve KYA Screening Summary
     * Returns the overall status and per-order results for a screening request.
     */
    async kyaScreeningOne(request: KyaScreeningOneRequest): Promise<KyaScreeningOneResponse> {
        return await this.client.doRequest<KyaScreeningOneRequest, KyaScreeningOneResponse>('/v1/compliance/kya/screening/one', request);
    }

    /**
     * Retrieve KYA Screening Order Details
     * Returns the detailed result of a single provider screening order, including the raw provider payload.
     */
    async kyaScreeningOrderOne(request: KyaScreeningOrderOneRequest): Promise<KyaScreeningOrderOneResponse> {
        return await this.client.doRequest<KyaScreeningOrderOneRequest, KyaScreeningOrderOneResponse>('/v1/compliance/kya/screening/order/one', request);
    }

    /**
     * Retrieve Supported Networks & Providers
     * Returns the list of blockchain networks and the AML providers that support each network.
     */
    async kyaSupportedNetworks(): Promise<Array<KyaSupportedNetwork>> {
        return await this.client.doRequest<{}, Array<KyaSupportedNetwork>>('/v1/compliance/kya/supportedNetworks', {});
    }
}
