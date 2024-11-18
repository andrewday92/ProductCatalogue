import { Component } from '@angular/core';
import { Product } from '@models';
import { BrowserStorageService, StorageType, StorageTypes } from 'src/app/core/services/browser-storage.service';
import { ProductService } from 'src/app/shared/services/product.service';
export type Cart = {
  "id": string,
  "title": string,
  "price": number,
  "amount": number
}
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  get cart(): Cart[] {
    return this._browserStorageService.getItem('cart') ? JSON.parse(this._browserStorageService.getItem('cart')) : undefined;
  }

  get cartTotal(): number {
    return this.cart.reduce((newValue: any, product: any) => newValue += product.amount , 0);
  }

  get cartTotalPrice(): number {
    return this.cart.reduce((newValue: any, product: any) => newValue += (product.price * product.amount) , 0);
  }

  get hasCart(): boolean {
    return !!this.cart
  };
  public showCart : boolean = false;
  constructor(private _browserStorageService: BrowserStorageService, private _productsService: ProductService) {
  }

  toggleCart(): void{
    this.showCart = !this.showCart;
  }

  removeCartItem(productId: string, index: number): void {
    let updatedCart = this.cart;
    updatedCart[index].amount -= 1;

    if(updatedCart[index].amount < 1){
      updatedCart = this.cart.filter((cartItem: Cart) => cartItem.id !== productId);
    }

    this._browserStorageService.setItem<StorageType>('cart', {data: updatedCart,type: StorageTypes.Session});

    if(this.cart.length === 0){
      this.clearBasket();
    }
  }

  clearBasket(){
    this._browserStorageService.removeItem('cart');
    this.showCart = false;
  }

}
