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

  addToCart(product: Product) {
    let cart = this._browserStorageService.getItem('cart') ? JSON.parse(this._browserStorageService.getItem('cart')) : [];
    let cartIndex = cart.findIndex((cartItem: Product) => cartItem.id === product.id);
    cartIndex !== -1 ? cart[cartIndex].amount += 1 : cart.push({id: product.id, price: product.price, title: product.title, amount: 1});

    this._browserStorageService.setItem<StorageType>('cart', {data: cart,type: StorageTypes.Session});
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
