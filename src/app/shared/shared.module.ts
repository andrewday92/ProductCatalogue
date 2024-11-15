import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderByPipe } from './pipes/order-by.pipe';
import { FilterByPipe } from './pipes/filter-by.pipe';
import { EllipsisPipe } from './pipes/ellipsis.pipe';

@NgModule({
  declarations: [
    OrderByPipe,
    FilterByPipe,
    EllipsisPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [OrderByPipe, FilterByPipe, EllipsisPipe],
  providers: []
})
export class SharedModule { }
