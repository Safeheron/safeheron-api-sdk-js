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
     * MistTrack risk assessment result
     */
    amlList: Array<Aml>;
}


export interface Aml {
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
