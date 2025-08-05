import crypto from 'crypto';
import type {Encoding, BinaryLike, CipherGCMTypes, CipherKey} from 'crypto'

export class AES {

    GCM: string = "GCM_NOPADDING"

    algorithm: string = 'aes-256-cbc';

    algorithmGCM: CipherGCMTypes  = 'aes-256-gcm';

    encrypt(srcData: string, key: CipherKey, iv: BinaryLike): string {
        const cipher = crypto.createCipheriv(this.algorithm, key, iv);
        let encrypted = cipher.update(srcData);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return encrypted.toString('base64');
    }

    encryptGCM(srcData: string, key: CipherKey, iv: BinaryLike): string {
        const cipher = crypto.createCipheriv(this.algorithmGCM, key, iv);
        let encrypted = cipher.update(srcData, 'utf8' as Encoding, 'base64')
        encrypted += cipher.final('base64');
        const tags = cipher.getAuthTag();
        const encryptedBuffer = Buffer.from(encrypted, 'base64');
        return Buffer.concat([encryptedBuffer, tags]).toString('base64')
    }

    decrypt(cipherText: string, keyAndIv: Buffer): string {
        const key = keyAndIv.subarray(0, 32);
        const iv = keyAndIv.subarray(32);
        const decipher = crypto.createDecipheriv(this.algorithm, key, iv);
        let decrypted = decipher.update(Buffer.from(cipherText, 'base64'));
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }

    decryptGCM(cipherText: string, keyAndIv: Buffer): string {
        const key = keyAndIv.subarray(0, 32);
        const iv = keyAndIv.subarray(32);
        const decipher = crypto.createDecipheriv(this.algorithmGCM, key, iv);
        let decrypted = decipher.update(Buffer.from(cipherText, 'base64'));
        return decrypted.subarray(0,decrypted.length-iv.length).toString();
    }
}
