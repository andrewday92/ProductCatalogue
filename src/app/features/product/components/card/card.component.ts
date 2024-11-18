import { Component, Input } from '@angular/core';
import { Product } from '@models';
import { BrowserStorageService, StorageType, StorageTypes } from 'src/app/core/services/browser-storage.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: false,
  host: {'class': 'card'}
})
export class CardComponent {
  @Input() product!: Product;
  constructor(private _browserStorageService: BrowserStorageService, private _productService: ProductService){}

  addToCart(product: Product){
    this._productService.addToCart(product);
  }
}
