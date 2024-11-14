import { TestBed } from '@angular/core/testing';
import * as crypto from 'crypto-js';
import { BrowserStorageService, StorageType, StorageTypes } from './browser-storage.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { environment } from '@environments/environment';

describe('BrowserStorageService', () => {
  let service: BrowserStorageService;
  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        BrowserStorageService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    let store: {[key: string]: string} = {};
    const mockLocalStorage = {
      getItem: (key: string): string | null => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);

    let sessionStore: {[key: string]: string} = {};
    const mockSessionStorage = {
      getItem: (key: string): string | null => {
        return key in sessionStore ? sessionStore[key] : null;
      },
      setItem: (key: string, value: string) => {
        sessionStore[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete sessionStore[key];
      },
      clear: () => {
        sessionStore = {};
      },
    };
    spyOn(sessionStorage, 'getItem').and.callFake(mockSessionStorage.getItem);
    spyOn(sessionStorage, 'setItem').and.callFake(mockSessionStorage.setItem);
    spyOn(sessionStorage, 'removeItem').and.callFake(mockSessionStorage.removeItem);
    spyOn(sessionStorage, 'clear').and.callFake(mockSessionStorage.clear);

    service = TestBed.inject(BrowserStorageService);
  });

  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#setItem', () => {
    it('should store an item in localStorage when type is local', () => {
      const data = { key: 'value' };
      const storageType = new StorageType(data, StorageTypes.Local);
      service.setItem<StorageType>('testKey', storageType);
      expect(localStorage.setItem).toHaveBeenCalledWith('testKey', JSON.stringify(data));
    });

    it('should store an item in sessionStorage when type is session', () => {
      const data = { key: 'value' };
      const storageType = new StorageType(data, StorageTypes.Session);
      service.setItem('testKey', storageType);
      expect(sessionStorage.setItem).toHaveBeenCalledWith('testKey', JSON.stringify(data));
    });

    it('should encrypt and store an item in localStorage when encrypt is true', () => {
      const data = { key: 'value' };
      const storageType = new StorageType(JSON.stringify(data), StorageTypes.Local);
      spyOn(service, 'encryptData').and.callThrough();
      service.setItem('testKey', storageType, true);
      expect(service.encryptData).toHaveBeenCalledWith(JSON.stringify(data));
    });

    it('should encrypt and store an item in sessionStorage when encrypt is true', () => {
      const data = { key: 'value' };
      const storageType = new StorageType(JSON.stringify(data), StorageTypes.Session);
      spyOn(service, 'encryptData').and.callThrough();
      service.setItem('testKey', storageType, true);
      expect(service.encryptData).toHaveBeenCalledWith(JSON.stringify(data));
    });
  });

  describe('#getItem', () => {
    it('should retrieve an item from localStorage', () => {
      const data = { key: 'value' };
      localStorage.setItem('testKey', JSON.stringify(data));
      const result = service.getItem('testKey', StorageTypes.Local);
      expect(localStorage.getItem).toHaveBeenCalledWith('testKey');
      expect(result).toEqual(JSON.stringify(data));
    });

    it('should retrieve an item from sessionStorage', () => {
      const data = { key: 'value' };
      sessionStorage.setItem('testKey', JSON.stringify(data));
      const result = service.getItem('testKey', StorageTypes.Session);
      expect(sessionStorage.getItem).toHaveBeenCalledWith('testKey');
      expect(result).toEqual(JSON.stringify(data));
    });

    it('should decrypt an encrypted item from localStorage when decrypt is true', () => {
      const encryptedData = crypto.AES.encrypt(JSON.stringify({ key: 'value' }), environment.encryptionKey).toString();
      localStorage.setItem('testKey', encryptedData);
      spyOn<any>(service, 'decryptData').and.callThrough();
      const result = service.getItem('testKey', StorageTypes.Local, true);
      expect(service['decryptData']).toHaveBeenCalledWith(encryptedData);
    });

    it('should decrypt an encrypted item from sessionStorage when decrypt is true', () => {
      const encryptedData = crypto.AES.encrypt(JSON.stringify({ key: 'value' }), environment.encryptionKey).toString();
      sessionStorage.setItem('testKey', encryptedData);
      spyOn<any>(service, 'decryptData').and.callThrough();
      const result = service.getItem('testKey', StorageTypes.Session, true);
      expect(service['decryptData']).toHaveBeenCalledWith(encryptedData);
    });
  });

  describe('#removeItem', () => {
    it('should remove an item from localStorage', () => {
      service.removeItem('testKey', StorageTypes.Local);
      expect(localStorage.removeItem).toHaveBeenCalledWith('testKey');
    });

    it('should remove an item from sessionStorage', () => {
      service.removeItem('testKey', StorageTypes.Session);
      expect(sessionStorage.removeItem).toHaveBeenCalledWith('testKey');
    });
  });

  describe('#encryptData', () => {
    it('should encrypt data correctly', () => {
      const data = { key: 'value' };
      const encrypted = service.encryptData(data);
      expect(encrypted).not.toEqual(JSON.stringify(data));
    });
  });

  describe('#decryptData', () => {
    it('should decrypt data correctly', () => {
      const data = { 'key': 'value' };
      const encrypted = crypto.AES.encrypt(JSON.stringify(data), environment.encryptionKey).toString();
      const decrypted = service.decryptData(encrypted);
      expect(decrypted).toEqual(JSON.stringify(data));
    });
  });
});
