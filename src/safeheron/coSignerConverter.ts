import {SafeheronCoSignerConfig} from '../config';
import {RSA} from '../utils/rsa';
import {AES} from '../utils/aes';
import {
    CoSignerCallBack,
    CoSignerRequestV3,
    CoSignerResponse, CoSignerResponseV3,
    CoSignerResponseWithNewCryptoType
} from '../model/BaseModel';
import crypto from "crypto";
import {readFileSync} from "fs";
import path from "path";

export class CoSignerConverter {
    config: SafeheronCoSignerConfig;
    rsa: RSA;
    aes: AES;

    constructor(config: SafeheronCoSignerConfig) {
        // support read from file.
        if (config.approvalCallbackServicePrivateKey && config.approvalCallbackServicePrivateKey.startsWith("file:")) {
            config.approvalCallbackServicePrivateKey = readFileSync(path.resolve(config.approvalCallbackServicePrivateKey.substring(5)), 'utf8');
        }

        // Support base64 format approvalCallbackServicePrivateKey.
        if (config.approvalCallbackServicePrivateKey && !config.approvalCallbackServicePrivateKey.startsWith("-----BEGIN")) {
            config.approvalCallbackServicePrivateKey = ["-----BEGIN PRIVATE KEY-----", config.approvalCallbackServicePrivateKey, "-----END PRIVATE KEY-----"].join("\n")
        }

        // support read from file.
        if (config.coSignerPubKey && config.coSignerPubKey.startsWith("file:")) {
            config.coSignerPubKey = readFileSync(path.resolve(config.coSignerPubKey.substring(5)), 'utf8');
        }

        // Support base64 format coSignerPubKey.
        if (config.coSignerPubKey && !config.coSignerPubKey.startsWith("-----BEGIN")) {
            config.coSignerPubKey = ["-----BEGIN PUBLIC KEY-----", config.coSignerPubKey, "-----END PUBLIC KEY-----"].join("\n")
        }

        this.config = config;
        this.aes = new AES();
        //Supports both coSignerPubKey and apiPublKey
        //Supports both approvalCallbackServicePrivateKey and bizPrivKey
        this.rsa = new RSA(config.coSignerPubKey || config.apiPubKey || "", config.approvalCallbackServicePrivateKey || config.bizPrivKey || "");
    }

    // It has been Deprecated,Please use convertCoSignerResponseWithNewCryptoType
    convertCoSignerResponse(data: any): CoSignerResponse {

        const key = crypto.randomBytes(32);
        const iv = crypto.randomBytes(16);

        // Use Safeheron RSA public key to encrypt request's aesKey and aesIv
        const encryptKeyAndIv = this.rsa.encrypt(Buffer.concat([key, iv]));

        const req: CoSignerResponse = {
            message: 'SUCCESS',
            code: 200,
            timestamp: String(new Date().getTime()),
            key: encryptKeyAndIv,
        };

        if (data != null) {
            // Use AES to encrypt request data
            req.bizContent = this.aes.encrypt(JSON.stringify(data), key, iv);
        }

        // Sign the request data with your RSA private key
        let paramStr = [];
        let reqMap = new Map(Object.entries(req));
        for (const key of Array.from(reqMap.keys()).slice().sort()) {
            paramStr.push(key + "=" + reqMap.get(key))
        }
        const signSrc = paramStr.join("&");
        req.sig = this.rsa.sign(signSrc);
        return req;
    }

    convertCoSignerResponseWithNewCryptoType(data: any): CoSignerResponseWithNewCryptoType {

        const key = crypto.randomBytes(32);
        const iv = crypto.randomBytes(16);

        // Use Safeheron RSA public key to encrypt request's aesKey and aesIv
        const encryptKeyAndIv = this.rsa.encryptOAEP(Buffer.concat([key, iv]));

        const req: CoSignerResponseWithNewCryptoType = {
            message: 'SUCCESS',
            code: 200,
            timestamp: String(new Date().getTime()),
            key: encryptKeyAndIv,
        };

        if (data != null) {
            // Use AES to encrypt request data
            req.bizContent = this.aes.encryptGCM(JSON.stringify(data), key, iv);
        }

        // Sign the request data with your RSA private key
        let paramStr = [];
        let reqMap = new Map(Object.entries(req));
        for (const key of Array.from(reqMap.keys()).slice().sort()) {
            paramStr.push(key + "=" + reqMap.get(key))
        }
        const signSrc = paramStr.join("&");
        req.sig = this.rsa.sign(signSrc);
        req.rsaType = this.rsa.ECB_OAEP;
        req.aesType = this.aes.GCM;
        return req;
    }

    responseV3convert(data: any): CoSignerResponseV3 {
        const req: CoSignerResponseV3 = {
            message: 'SUCCESS',
            version: 'v3',
            code: '200',
            timestamp: String(new Date().getTime()),
        };

        if (data != null) {
            req.bizContent = Buffer.from(JSON.stringify(data)).toString('base64');
        }

        // Sign the request data with your Approval Callback Service's private key
        let paramStr = [];
        let reqMap = new Map(Object.entries(req));
        for (const key of Array.from(reqMap.keys()).slice().sort()) {
            paramStr.push(key + "=" + reqMap.get(key))
        }
        const signSrc = paramStr.join("&");
        req.sig = this.rsa.signPSS(signSrc);
        return req;
    }

    requestV3convert(data: CoSignerRequestV3) {
        // Verify sign
        const content = `bizContent=${data.bizContent}&timestamp=${data.timestamp}&version=v3`;
        const verifyRes = this.rsa.verifyPSS(content, data.sig);
        if (!verifyRes) {
            throw new Error('CoSignerCallBack signature verification failed');
        }
        return Buffer.from(data.bizContent, 'base64');
    }

    convertCoSignerCallBack(data: CoSignerCallBack) {
        // Verify sign
        const content = `bizContent=${data.bizContent}&key=${data.key}&timestamp=${data.timestamp}`;
        const verifyRes = this.rsa.verify(content, data.sig);
        if (!verifyRes) {
            throw new Error('CoSignerCallBack signature verification failed');
        }

        // Use your RSA private key to decrypt response's aesKey and aesIv
        let keyAndIv;
        if(this.rsa.ECB_OAEP ==data.rsaType){
            keyAndIv = this.rsa.decryptOAEP(data.key);
        }else {
            keyAndIv = this.rsa.decrypt(data.key);
        }

        // Use AES to decrypt bizContent
        let callBackContent;
        if(this.aes.GCM == data.aesType){
            callBackContent = this.aes.decryptGCM(data.bizContent, keyAndIv);
        }else {
            callBackContent =this.aes.decrypt(data.bizContent, keyAndIv);
        }
        return callBackContent;
    }
}
