import {SafeheronClient} from '../safeheron';
import {SafeheronConfig} from "../config";
import {ResultResponse} from "./accountApi";

export interface ResendWebhookRequest {

    /**
     * Supported events:
     * TRANSACTION
     * MPC_SIGN
     * WEB3_SIGN
     */
    category?: string;

    /**
     * Transaction key
     */
    txKey?: string;
}

export interface ResendFailedRequest {
    /**
     * Start time in UNIX timestamp (ms). The time interval [startTime, endTime] is up to 1 hour
     */
    startTime: number;

    /**
     * End time in UNIX timestamp (ms). The time interval [startTime, endTime] is up to 1 hour
     */
    endTime: number;
}

export interface MessagesCountResponse {
    /**
     * The number of failed webhook events to be re-pushed
     */
    messagesCount: number;
}

export class WebhookApi {

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
     * Re-push Transaction Webhook Events
     * Re-push the transaction webhook events generated in the last 15 days. In certain situations, such as network jitter or your system being unavailable to receive webhook events, you may miss receiving notifications. You can use this interface to notify Safeheron to re-push the webhook events. It is important to note that for a single transaction, only the last webhook event will be re-pushed. For example, during the lifecycle of a transaction, multiple TRANSACTION_STATUS_CHANGED webhook events such as BROADCASTING, CONFIRMING, COMPLETED, etc., may be generated. The re-push will only send the last webhook event recorded by the current system. Re-pushing is supported for the following types of webhook events:
     *
     * Events related to asset transactions, including TRANSACTION_CREATED and TRANSACTION_STATUS_CHANGED.
     * Events related to MPC signing, including MPC_SIGN_CREATED and MPC_SIGN_STATUS_CHANGED.
     * Events related to Web3, including WEB3_SIGN_CREATED and WEB3_SIGN_STATUS_CHANGED.
     * More types of webhook events will be supported in the future.
     */
    async resendWebhook(request: ResendWebhookRequest): Promise<ResultResponse> {
        return await this.client.doRequest<ResendWebhookRequest, ResultResponse>('/v1/webhook/resend', request);
    }


    /**
     * Push All Failed Webhook Events
     * Resend all webhook events that failed to push within any duration not exceeding 1 hour in the past 7 days (limited to 1 call every 10 minutes). In certain situations, such as network failures or your system being unavailable to receive webhook events, you may miss receiving notifications. Once the issue is resolved, you can use this interface to notify Safeheron to resend all webhook events that failed to push within a certain period. Support re-pushing the following types of webhook events:
     *
     * TRANSACTION_CREATED
     * TRANSACTION_STATUS_CHANGED
     * MPC_SIGN_CREATED
     * MPC_SIGN_STATUS_CHANGED
     * WEB3_SIGN_CREATED
     * WEB3_SIGN_STATUS_CHANGED
     * ILLEGAL_IP_REQUEST
     * NO_MATCHING_TRANSACTION_POLICY
     * More types of webhook events will be supported in the future.
     * Please note that when re-pushing all failed webhook events, your system needs to avoid rollback issues. For example, during the lifecycle of a transaction, multiple TRANSACTION_STATUS_CHANGED webhook events may be generated, such as BROADCASTING, CONFIRMING, and COMPLETED. If your system did not receive the CONFIRMING event due to network issues but did receive the COMPLETED event, using this interface would cause Safeheron to attempt resending the CONFIRMING event to your system. Your system needs to ensure that the transaction does not incorrectly revert from the COMPLETED status back to the CONFIRMING status.
     */
    async resendFailed(request: ResendFailedRequest): Promise<MessagesCountResponse> {
        return await this.client.doRequest<ResendFailedRequest, MessagesCountResponse>('/v1/webhook/resend/failed', request);
    }
}
