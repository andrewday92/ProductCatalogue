import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { Product } from '@models';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: false
})
export class ListComponent {
  protected products$: Observable<Product[]>;
  protected categories!: string[];
  protected sortField: keyof Product = 'title';
  protected sortFields: any;
  protected filterField: string = 'category';
  protected filterFieldValue: string = 'all';
  protected sortOrder: 'asc' | 'desc' = 'asc';
  protected sortFilterForm = new FormGroup({
    category: new FormControl<string>('all'),
    order: new FormControl<'asc' | 'desc'>('asc'),
    sortFields: new FormControl<string>(''),
  })
  constructor(private _productsService: ProductService){
    this.products$ = this._productsService.getAllProducts()
    .pipe(
      tap((products: Product[]) => {
        this.categories = this._productsService.categories;
        this.sortFields = Object.keys(products[0]).filter(x => x !== 'image');
      })
    )
  }

  sortOnField() {
    let fieldValue = this.sortFilterForm.controls['sortFields'].value;
    this.sortField = fieldValue as keyof Product ?? 'title';
  }

  selectCat(){
    let fieldValue = this.sortFilterForm.controls['category'].value;
    if(fieldValue !== 'all'){
      this.filterFieldValue =  fieldValue ?? 'all';
    }
    else {
      this.filterFieldValue =  'all';
    }
  }

  selectOrder(){
    this.sortOrder = this.sortFilterForm.controls['order'].value ?? 'asc';
  }

  trackById(index: number, product: Product) {
    return product.id;
  }
}
