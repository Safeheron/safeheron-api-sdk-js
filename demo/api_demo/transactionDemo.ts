import {SafeheronError} from '../../src/safeheronError';
import {v4 as uuid} from 'uuid';
import {readFileSync} from 'fs';
import path from 'path'
import rc from 'rc';
import {CreateTransactionRequest, ListTransactionsV2Request, TransactionApi} from "../../src/safeheron/transactionApi";

const defaults = {
    APIKEY: '',
    PRIVATE_KEY_PEM_FILE: '',
    APIKEY_PUBLIC_KEY_PEM_FILE: '',
    BASE_URL: '',
    ACCOUNT_KEY: '',
    DESTINATION_ADDRESS: '',
}
const safeheronConfigRC = rc('sendtransaction', defaults)

function getConfigValue(key: string) {
    const value = safeheronConfigRC[key];
    if (!value) {
        throw new Error(`missing config entry for '${key}'`);
    }
    return value;
}

const apiKey = getConfigValue('APIKEY');
const apiKeyPublicKey = readFileSync(path.resolve(getConfigValue('APIKEY_PUBLIC_KEY_PEM_FILE')), 'utf8');
const yourPrivateKey = readFileSync(path.resolve(getConfigValue('PRIVATE_KEY_PEM_FILE')), 'utf8');


async function main() {
    try {

        const transactionApi: TransactionApi = new TransactionApi({
            baseUrl: getConfigValue('BASE_URL'),
            apiKey,
            rsaPrivateKey: yourPrivateKey,
            safeheronRsaPublicKey: apiKeyPublicKey,
            requestTimeout: 20000
        });



        const request: ListTransactionsV2Request = {
            accountKey: "account08a2369f59214b1e9099dc6346f694ca",
            createTimeMin:1756006706000,
            createTimeMax:1756352306000
        };

        const transactionResult = await transactionApi.listTransactionsV2(request);
        console.log(`transaction has been created, txKey: ${transactionResult}`);
    } catch (e) {
        if (e instanceof SafeheronError) {
            console.error(`failed to create transaction, error code: ${e.code}, message: ${e.message}`);
        } else {
            console.error(e)
        }

    }
}

main()

