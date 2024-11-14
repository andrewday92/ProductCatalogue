import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from './shared/services/product.service';
import { ListComponent } from "./features/product/components/list/list.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent {
  title = 'ProductCatalogue';

}
