import { Injectable } from '@angular/core';
import * as Forge from 'node-forge';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})

export class RSAHelper {
    publicKey: string = environment.RSAPublicKey;


    constructor() {}

    encryptWithPublicKey(valueToEncrypt: string): string {
        const rsa = Forge.pki.publicKeyFromPem(this.publicKey);
        return window.btoa(rsa.encrypt(valueToEncrypt.toString()));
    }
}