import { Component, Input } from '@angular/core';
import { Product } from '@models';
import { BrowserStorageService, StorageType, StorageTypes } from 'src/app/core/services/browser-storage.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: false,
  host: {'class': 'card'}
})
export class CardComponent {
  @Input() product!: Product;
  constructor(private _browserStorageService: BrowserStorageService){}

  addToCart(productId: string) {
    let cart = this._browserStorageService.getItem('cart') ? JSON.parse(this._browserStorageService.getItem('cart')) : {[`product-${productId}`]: 1};
    if(cart){
      let propName = `product-${productId}`;
     if(cart.hasOwnProperty(propName)){
       cart[propName] += 1;
     } else {
      cart[propName] = 1;
     }
    }
    this._browserStorageService.setItem<StorageType>('cart', {data: cart,type: StorageTypes.Session})


  }
}
