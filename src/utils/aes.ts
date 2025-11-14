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
        const ciphertext = Buffer.concat([cipher.update(srcData, 'utf8'), cipher.final()]);
        const tag = cipher.getAuthTag();
        return Buffer.concat([ciphertext, tag]).toString('base64');
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
        const data = Buffer.from(cipherText, 'base64');
        if (data.length < 16) throw new Error('ciphertext too short');
        const tag = data.subarray(data.length - 16);
        const ciphertext = data.subarray(0, data.length - 16);
        const decipher = crypto.createDecipheriv(this.algorithmGCM, key, iv);
        decipher.setAuthTag(tag);
        const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
        return plaintext.toString('utf8');
    }
}
