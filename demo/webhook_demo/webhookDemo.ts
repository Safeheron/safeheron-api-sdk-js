import {SafeheronError} from './../../src/safeheronError';
import rc from 'rc';
import {WebHookConverter} from "../../src/safeheron/webHookConverter";
import {readFileSync} from "fs";
import path from "path";

const defaults = {
    WEB_HOOK_RSA_PRIVATE_KEY_PEM_FILE: '',
    SAFEHERON_WEB_HOOK_RSA_PUBLIC_KEY_PEM_FILE: ''
}

const safeheronWebHookConfigRC = rc('webhook', defaults)

function getConfigValue(key: string) {
    const value = safeheronWebHookConfigRC[key];
    if (!value) {
        throw new Error(`missing config entry for '${key}'`);
    }
    return value;
}


const webHookRsaPrivateKey = readFileSync(path.resolve(getConfigValue('WEB_HOOK_RSA_PRIVATE_KEY_PEM_FILE')), 'utf8');
const safeheronWebHookRsaPublicKey = readFileSync(path.resolve(getConfigValue('SAFEHERON_WEB_HOOK_RSA_PUBLIC_KEY_PEM_FILE')), 'utf8');


async function main() {
    try {
        const converter: WebHookConverter = new WebHookConverter({
            webHookRsaPrivateKey: webHookRsaPrivateKey,
            safeheronWebHookRsaPublicKey: safeheronWebHookRsaPublicKey
        });

        const webHook = converter.convertWebHook({
            //rsaType:"ECB_OAEP",
            //aesType:"GCM_NOPADDING",
            bizContent: 'AES-encrypted data of request parameters',
            key: 'Data obtained by using webhook RSA public key encrypt random AES key',
            timestamp: 'Callback timestamp, UNIX millisecond-format string',
            sig: 'Signature data obtained by signing the request parameters via Safeheron webhook RSA private key'
        })
        console.log(`Decrypt webHookBizContent: ${webHook}`);

        let webHookResponse = new Map();
        webHookResponse.set('message', 'SUCCESS');
        webHookResponse.set('code', 200);
        //The customer returns WebHookResponse after processing the business logic.
    } catch (e) {
        if (e instanceof SafeheronError) {
            console.error(`failed, error code:${e.code}, message:${e.message}`);
        } else {
            console.error(e)
        }
    }
}

main()

