import {SafeheronClient} from '../safeheron';
import {SafeheronConfig} from "../config";
import {LimitSearch} from "./transactionApi";
import {ResultResponse} from "./accountApi";



export interface ListWhitelistRequest extends LimitSearch {
    /**
     * The supported public blockchains for whitelist addresses are:
     * EVM: Ethereum-compatible public chain networks or Layer 2 addresses that can receive its native token and other tokens
     * Bitcoin: Bitcoin mainnet addresses that can receive Bitcoin
     * Bitcoin Cash: Bitcoin Cash network, which can receive BCH
     * Dash: anonymous Dash network, which can receive DASH
     * TRON: Tron mainnet addresses, which can receive TRX and TRC20 tokens, such as USDT and USDC
     * NEAR: NEAR mainnet, which can receive native token NEAR
     * Filecoin: Receive Filecoin native token FIL, but does not support receiving FIL or tokens from the FVM network
     * Sui: Sui mainnet, which can receive native token Sui and other tokens
     * Aptos: Aptos mainnet, which only supports receiving native token Aptos and does not support other tokens yet
     * Solana: Solana mainnet, which can receive native token SOL and other tokens
     * Bitcoin Testnet: Bitcoin testnet, which can receive Bitcoin testnet ass
     */
    chainType?: string;

    /**
     * Whitelist status
     * AUDIT: pending approval
     * APPROVED: active
     * REJECTED: rejected
     */
    whitelistStatus?: string;

    /**
     * Start time for creating a whitelist in UNIX timestamp (ms) (If no value is provided, the default value is createTimeMax minus 24 hours)
     */
    createTimeMin?: number;

    /**
     * End time for creating a whitelist in UNIX timestamp (ms) (If no value is provided, the default value is the current UTC time)
     */
    createTimeMax?: number;
}

export interface OneWhitelistRequest {
    /**
     * Whitelist unique identifier. It is required if address is not provided. If both are provided, the whitelistKey takes precedence
     */
    whitelistKey: string;

    /**
     * Whitelist address. It is required if whitelistKey is not provided and please make sure the provided address is correct
     */
    address: string;
}


export interface WhitelistResponse {
    /**
     * Whitelist unique identifier
     */
    whitelistKey?: string;

    /**
     * The supported public blockchains for whitelist addresses are:
     * EVM: Ethereum-compatible public chain networks or Layer 2 addresses that can receive its native token and other tokens
     * Bitcoin: Bitcoin mainnet addresses that can receive Bitcoin
     * Bitcoin Cash: Bitcoin Cash network, which can receive BCH
     * Dash: anonymous Dash network, which can receive DASH
     * TRON: Tron mainnet addresses, which can receive TRX and TRC20 tokens, such as USDT and USDC
     * NEAR: NEAR mainnet, which can receive native token NEAR
     * Filecoin: Receive Filecoin native token FIL, but does not support receiving FIL or tokens from the FVM network
     * Sui: Sui mainnet, which can receive native token Sui and other tokens
     * Aptos: Aptos mainnet, which only supports receiving native token Aptos and does not support other tokens yet
     * Solana: Solana mainnet, which can receive native token SOL and other tokens
     * Bitcoin Testnet: Bitcoin testnet, which can receive Bitcoin testnet ass
     */
    chainType?: string;

    /**
     * Whitelist name
     */
    whitelistName?: string;

    /**
     * Whitelisted address
     */
    address?: string;

    /**
     * Memo of the address when creating a whitelist
     */
    memo?: string;

    /**
     * Whitelist status
     * AUDIT: pending approval
     * APPROVED: active
     * REJECTED: rejected
     */
    whitelistStatus?: string;

    /**
     * Note
     */
    note?: string;

    /**
     * Whitelist creation time in UNIX timestamp (ms)
     */
    createTime?: number;

    /**
     * Last update time of the whitelist in UNIX timestamp (ms)
     */
    lastUpdateTime?: number;
}

export interface CreateWhitelistRequest {
    /**
     * Whitelist unique name, 20 characters max
     */
    whitelistName?: string;

    /**
     * The supported public blockchains for whitelist addresses are:
     * EVM: Ethereum-compatible public chain networks or Layer 2 addresses that can receive its native token and other tokens
     * Bitcoin: Bitcoin mainnet addresses that can receive Bitcoin
     * Bitcoin Cash: Bitcoin Cash network, which can receive BCH
     * Dash: anonymous Dash network, which can receive DASH
     * TRON: Tron mainnet addresses, which can receive TRX and TRC20 tokens, such as USDT and USDC
     * NEAR: NEAR mainnet, which can receive native token NEAR
     * Filecoin: Receive Filecoin native token FIL, but does not support receiving FIL or tokens from the FVM network
     * Sui: Sui mainnet, which can receive native token Sui and other tokens
     * Aptos: Aptos mainnet, which only supports receiving native token Aptos and does not support other tokens yet
     * Solana: Solana mainnet, which can receive native token SOL and other tokens
     * Bitcoin Testnet: Bitcoin testnet, which can receive Bitcoin testnet assets
     */
    chainType?: string;

    /**
     * Public blockchain address and the address format needs to meet the requirements of the chain
     */
    address?: string;

    /**
     * The memo (up to 20 characters) for the destination address, also known as a comment or tag. For the following networks, if a destination address memo was set initially, a memo matching the one in the transaction record must be provided
     * TON: TON mainnet
     * TON_TESTNET: TON testnet
     */
    memo?: string;

    /**
     * Visibility status in Safeheron App and Web Console
     * False: Visible by default
     * True: Invisible; the invisible whitelist can only be managed and used through the API, such as querying, modifying, and using the whitelist as the destination address when initiating transactions
     */
    hiddenOnUI?: boolean;

    /**
     * Note
     */
    note?: string;
}

export interface CreateFromTransactionWhitelistRequest {
    /**
     * Whitelist unique name, 20 characters max
     */
    whitelistName?: string;

    /**
     * Transaction key
     */
    txKey?: string;

    /**
     * The destination address in the transaction record; case-sensitive
     */
    destinationAddress?: string;

    /**
     * The memo (up to 20 characters) for the destination address, also known as a comment or tag. For the following networks, if a destination address memo was set initially, a memo matching the one in the transaction record must be provided
     * TON: TON mainnet
     * TON_TESTNET: TON testnet
     */
    memo?: string;

    /**
     * Visibility status in Safeheron App and Web Console
     * False: Visible by default
     * True: Invisible; the invisible whitelist can only be managed and used through the API, such as querying, modifying, and using the whitelist as the destination address when initiating transactions
     */
    hiddenOnUI?: boolean;

    /**
     * Note
     */
    note?: string;
}

export interface CreateWhitelistResponse {
    /**
     * Whitelist unique identifier
     */
    whitelistKey: string;
}


export interface EditWhitelistRequest {

    /**
     * Whitelist unique identifier
     */
    whitelistKey: string;

    /**
     * Whitelist unique name, 20 characters max
     */
    whitelistName: string;

    /**
     * Public blockchain address and the address format needs to meet the requirements of the chain
     */
    address: string;

    /**
     * The memo (up to 20 characters) for the destination address, also known as a comment or tag. For the following networks, if a destination address memo was set initially, a memo matching the one in the transaction record must be provided
     * TON: TON mainnet
     * TON_TESTNET: TON testnet
     */
    memo?: string;

    /**
     * When the whitelist is involved in a transaction approval policy, modifications will result in the new whitelist being directly applied to the approval policy. False by default, meaning that when involved in a transaction approval policy, it will not be modified.
     */
    force: boolean;

    /**
     * Note
     */
    note: string;
}

export interface DeleteWhitelistRequest {
    /**
     * Whitelist unique identifier
     */
    whitelistKey: string;
}

export class WhitelistApi {

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
     * List Whitelist Data
     * Paginate the whitelist data based on the query criteria.
     */
    async listWhitelist(request: ListWhitelistRequest): Promise<Array<WhitelistResponse>> {
        return await this.client.doRequest<ListWhitelistRequest, Array<WhitelistResponse>>('/v1/whitelist/list', request);
    }

    /**
     * Retrieve a Single Whitelist
     * Retrieve the data of a whitelist.
     */
    async oneWhitelist(request: OneWhitelistRequest): Promise<WhitelistResponse> {
        return await this.client.doRequest<OneWhitelistRequest, WhitelistResponse>('/v1/whitelist/one', request);
    }

    /**
     * Create a Whitelist
     * Add a new whitelisted address. The newly added address needs to be approved in the Safeheron App before it becomes effective. The approval details are as follows:
     *
     * Admin approval: If a custom whitelist approval process is not set, it will become effective after being approved by the team admins according to the team's decision-making process.
     * Custom whitelist approval: If a whitelist approval process is set, it will become effective after being approved according to the process.
     */
    async createWhitelist(request: CreateWhitelistRequest): Promise<CreateWhitelistResponse> {
        return await this.client.doRequest<CreateWhitelistRequest, CreateWhitelistResponse>('/v1/whitelist/create', request);
    }

    /**
     * Create a Whitelist Based on a Transaction
     * Whitelist the transaction's destination address when the transaction meets the following conditions:
     *
     * A transfer transaction from an asset wallet; Web3 wallet transactions or MPC Sign transactions are not supported.
     * The transaction is in a completed state as COMPLETED.
     * The transaction's destination address is a one-time address.
     */
    async createFromTransactionWhitelist(request: CreateFromTransactionWhitelistRequest): Promise<CreateWhitelistResponse> {
        return await this.client.doRequest<CreateFromTransactionWhitelistRequest, CreateWhitelistResponse>('/v1/whitelist/createFromTransaction', request);
    }


    /**
     * Modify a Whitelist
     * Modify a whitelist based on its unique identifier. The whitelist only supports modifying its name and address; whitelists pending for approval cannot be modified. After modifying the whitelist, it needs to be reviewed and approved in the Safeheron App before it becomes effective. The approval details are as follows:
     *
     * Admin approval: If a custom whitelist approval process is not set, it will become effective after being approved by the team admins according to the team's decision-making process.
     * Custom whitelist approval: If a whitelist approval process is set, it will become effective after being approved according to the process.
     */
    async editWhitelist(request: EditWhitelistRequest): Promise<ResultResponse> {
        return await this.client.doRequest<EditWhitelistRequest, ResultResponse>('/v1/whitelist/edit', request);
    }


    /**
     * Delete a Whitelist
     * To delete a whitelisted address, note that no approval is required for deletion. If a whitelisted address that is under approval is deleted, the approval task will also be automatically cancelled.
     */
    async deleteWhitelist(request: DeleteWhitelistRequest): Promise<ResultResponse> {
        return await this.client.doRequest<DeleteWhitelistRequest, ResultResponse>('/v1/whitelist/delete', request);
    }
}
