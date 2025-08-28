import {SafeheronError} from '../../src/safeheronError';
import {v4 as uuid} from 'uuid';
import {readFileSync} from 'fs';
import path from 'path'
import rc from 'rc';
import {CreateTransactionRequest, TransactionApi} from "../../src/safeheron/transactionApi";

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
const ACCOUNT_KEY = getConfigValue('ACCOUNT_KEY');
const DESTINATION_ADDRESS = getConfigValue('DESTINATION_ADDRESS');


async function main() {
    try {

        const transactionApi: TransactionApi = new TransactionApi({
            baseUrl: getConfigValue('BASE_URL'),
            apiKey,
            rsaPrivateKey: yourPrivateKey,
            safeheronRsaPublicKey: apiKeyPublicKey,
            requestTimeout: 20000
        });

        const request: CreateTransactionRequest = {
            sourceAccountKey: ACCOUNT_KEY,
            sourceAccountType: 'VAULT_ACCOUNT',
            destinationAccountType: 'ONE_TIME_ADDRESS',
            destinationAddress: DESTINATION_ADDRESS,
            coinKey: 'ETH_GOERLI',
            txAmount: '0.001',
            txFeeLevel: 'MIDDLE',
            customerRefId: uuid(),
        };

        const transactionResult = await transactionApi.createTransactions(request);
        console.log(`transaction has been created, txKey: ${transactionResult.txKey}`);
    } catch (e) {
        if (e instanceof SafeheronError) {
            console.error(`failed to create transaction, error code: ${e.code}, message: ${e.message}`);
        } else {
            console.error(e)
        }

    }
}

main()

