import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import * as crypto from 'crypto-js';

export class StorageType {
  data: any;
  type: StorageTypes;
  expiresAt?: number = new Date().getTime();
  constructor(_data: any, _type: StorageTypes, _expiresAt?: number){
    this.data = _data;
    this.type = _type;
    this.expiresAt = _expiresAt;
  }
}

export enum StorageTypes {
  Local = 'local',
  Session = 'session'
}
@Injectable({
  providedIn: 'root'
})
export class BrowserStorageService {

  constructor() {}

  public setItem<T extends StorageType>(key: string, value: T, encrypt = false): any {
    if (value.type === 'local'){
      localStorage.setItem(key, encrypt ? this.encryptData(value.data) : JSON.stringify(value.data));
      return;
    }
    else if (value.type === 'session') {
      sessionStorage.setItem(key, encrypt ? this.encryptData(value.data) : JSON.stringify(value.data));
      return;
    }
    console.error("Storage type not recognised, please use local or session storage.");
  }

  public getItem(key: string, storageType: StorageTypes = StorageTypes.Session, decrypt: boolean = false): any {
    let storedItem;
    switch (storageType){
      case 'session': {
        storedItem = sessionStorage.getItem(key);
        break;
      }
      case 'local': {
        storedItem = localStorage.getItem(key);
        break;
      }
      default: {
        console.error("Storage type does not exist");
        break;
      }
    }

    if(storedItem){
      return decrypt ? this.decryptData(storedItem) : storedItem;
    }
  }

  public removeItem(key: string, storageType: StorageTypes = StorageTypes.Session): any {
    let storedItem;
    switch (storageType){
      case 'session': {
        sessionStorage.removeItem(key);
        break;
      }
      case 'local': {
        localStorage.removeItem(key);
        break;
      }
      default: {
        console.error("Storage type does not exist");
        break;
      }
    }
  }

  public encryptData(value: any) {
    return crypto.AES.encrypt(JSON.stringify(value), environment.encryptionKey).toString();
  }

  public decryptData(value: string): any {
    return crypto.AES.decrypt(value, environment.encryptionKey).toString(crypto.enc.Utf8);
  }
}
