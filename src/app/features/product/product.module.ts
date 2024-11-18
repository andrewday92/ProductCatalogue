import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { ViewComponent } from './components/view/view.component';
import { CoreModule } from 'src/app/core/core.module';
import { CardComponent } from './components/card/card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ListComponent,
    ViewComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CoreModule,
    SharedModule
  ],
  exports: [
    ListComponent,
    ViewComponent,
    CardComponent
  ]
})
export class ProductModule { }
