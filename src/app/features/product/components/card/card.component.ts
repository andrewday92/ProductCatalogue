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

  addToCart(product: Product) {
    let cart = this._browserStorageService.getItem('cart') ? JSON.parse(this._browserStorageService.getItem('cart')) : [];
    let cartIndex = cart.findIndex((cartItem: Product) => cartItem.id === product.id);
    cartIndex !== -1 ? cart[cartIndex].amount += 1 : cart.push({id: product.id, price: product.price, title: product.title, amount: 1});

    this._browserStorageService.setItem<StorageType>('cart', {data: cart,type: StorageTypes.Session})
  }
}
