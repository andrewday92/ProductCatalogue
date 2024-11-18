import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './features/product/components/list/list.component';
import { ViewComponent } from './features/product/components/view/view.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: ':id', component: ViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
