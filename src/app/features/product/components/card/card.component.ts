import { Component, Input } from '@angular/core';
import { Product } from '@models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: false,
  host: {'class': 'card'}
})
export class CardComponent {
  @Input() product!: Product;
}
