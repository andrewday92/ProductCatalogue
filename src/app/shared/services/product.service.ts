import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { ApiHttpService } from 'src/app/core/services/api-http.service';
import { BrowserStorageService, StorageType, StorageTypes } from 'src/app/core/services/browser-storage.service';
import { Product } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public categories!: string[];
  constructor(private _api: ApiHttpService, private _browserStorageService: BrowserStorageService) { }

  getAllProducts(): any {
    return this._api.get('products').pipe(
      tap((products: any) => {
        this._browserStorageService.setItem<StorageType>('products', {type: StorageTypes.Local, data: products});
        this.categories = [...new Set<string>(products.map((product: Product) => product.category))].sort();
      })
    );
  }
}
