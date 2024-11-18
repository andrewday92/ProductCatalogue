import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
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
  protected filterFieldValue: string[] = [];
  protected sortOrder: 'asc' | 'desc' = 'asc';
  protected sortFilterForm = new FormGroup({
    categories: new FormArray<any>([]),
    order: new FormControl<'asc' | 'desc'>('asc'),
    sortFields: new FormControl<string>('title'),
  });
  protected isSidebarCollapsed: boolean = true;
  get categoriesFormArray() {
    return this.sortFilterForm.get('categories') as FormArray;
  }
  constructor(private _productsService: ProductService){
    this.products$ = this._productsService.getAllProducts<Product>()
    .pipe(
      tap((products: Product[]) => {
        this.categories = this._productsService.categories;
        this.categories.forEach(() => this.categoriesFormArray.push(new FormControl(false)))
        this.sortFields = Object.keys(products[0]).filter(x => x !== 'image' && x !== 'id' && x !== 'rating');
      })
    )
  }

  sortOnField() {
    let fieldValue = this.sortFilterForm.controls['sortFields'].value;
    this.sortField = fieldValue as keyof Product ?? 'title';
  }

  selectCat(){

    this.filterFieldValue = this.sortFilterForm.controls['categories'].value.map((x: boolean, i: number) => {
      if(x === true){
        return this.categories[i];
      } return;
    }).filter((cat: string) => cat !== undefined);
  }

  selectOrder(){
    this.sortOrder = this.sortFilterForm.controls['order'].value ?? 'asc';
  }

  trackById(index: number, product: Product) {
    return product.id;
  }


}
