import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RSAHelper } from '../../helpers/RSA.Helper';
import *  as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  
  private baseUrl: string = environment.agilemoviesApi;
  private key: string = environment.secretKey;
  constructor(private rsaHelper: RSAHelper) { }

  public saveDataStorage(key: string, value: string) {
    localStorage.setItem(key, this.encryptAES(value));
  }

  public getDataStorage(key: string) {
    let data = localStorage.getItem(key) || "";
    return this.decryptAES(data);
  }
  public removeDataStorage(key: string) {
    localStorage.removeItem(key);
  }

  public clearDataStorage() {
    localStorage.clear();
  }

  public getTokenEncryptRSA() {
    let data = localStorage.getItem('ACCESS_TOKEN') || "";
    let decryptData = this.decryptAES(data);

    return this.rsaHelper.encryptWithPublicKey(decryptData);
  }

  private encryptAES(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

  private decryptAES(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }
}
