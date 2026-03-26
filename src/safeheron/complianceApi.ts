import {SafeheronClient} from '../safeheron';
import {SafeheronConfig} from "../config";


export interface KytReportRequest {
    /**
     * Transaction key
     */
    txKey?: string;

    /**
     * Merchant unique business ID (100 characters max)
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
     * 	AML assessment information
     */
    amlList: Array<AmlReport>;
}


export interface AmlReport {
    provider: string;

    timestamp: string;

    status: string;

    riskLevel: string;

    lastUpdateTime: string;

    payload: Object;
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
}
