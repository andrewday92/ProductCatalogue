import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderByPipe } from './pipes/order-by.pipe';
import { FilterByPipe } from './pipes/filter-by.pipe';

@NgModule({
  declarations: [
    OrderByPipe,
    FilterByPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [OrderByPipe, FilterByPipe],
  providers: []
})
export class SharedModule { }
