import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of, Subject, takeUntil, tap } from 'rxjs';
import { ApiHttpService } from 'src/app/core/services/api-http.service';
import { BrowserStorageService, StorageType, StorageTypes } from 'src/app/core/services/browser-storage.service';
import { Product } from '@models';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements OnDestroy{
  private destroy$: Subject<void> = new Subject();
  public categories!: string[];
  public products$: Subject<Product[]> = new Subject<Product[]>();
  constructor(private _api: ApiHttpService, private _browserStorageService: BrowserStorageService) {
  }

  getAllProducts<Product>(): Observable<Product[]> {
    return this._api.get('products').pipe(
      tap((products: any) => {
        this._browserStorageService.setItem<StorageType>('products', {type: StorageTypes.Local, data: products});
        this.categories = [...new Set<string>(products.map((product: any) => product.category))].sort();
        this.products$.next(products);

      })
    );
  }

  getProductById<Product>(id: number): Observable<Product> {
    return this._api.get<Product>(`products/${id}`);
  }

  ngOnDestroy() {
    console.log('was destroyed');
    this.destroy$.next();
    this.destroy$.complete();
  }
}
