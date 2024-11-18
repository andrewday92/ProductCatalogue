import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, Event, ActivatedRoute, ParamMap } from '@angular/router';
import { filter, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Product } from 'src/app/shared/models';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  standalone: false
})
export class ViewComponent implements OnDestroy{
  private destroy$: Subject<void> = new Subject();
  protected product!: Product;

  constructor(private _productService: ProductService, private _activatedRoute: ActivatedRoute){
    this._activatedRoute.paramMap.pipe(
      takeUntil(this.destroy$),
      switchMap((params: ParamMap) => {
        let productId = parseInt(params.get('id') ?? "0");
        return this._productService.getProductById(productId);
      })
    ).subscribe({
      next: (product: any) => {
        this.product = product;
      },
      error: (err) =>{ console.error(err)}
    })
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }
}
