import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EllipsisPipe } from 'src/app/shared/pipes/ellipsis.pipe';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let mockProduct: Product;
  beforeEach(() => {
    productService = jasmine.createSpyObj(ProductService, ['addToCart']);
    mockProduct = new Product(1, 'Product 1', 100, 'Description 1', 'Category 1', 'image-1', { rate: 4.5, count: 10});
    TestBed.configureTestingModule({
      declarations: [CardComponent, EllipsisPipe],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ProductService, useValue: productService }
      ]
    });
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('addToCart', ()=> {
    it('should call addToCart in the product service', () => {
      component.addToCart(mockProduct);
      expect(productService.addToCart).toHaveBeenCalledWith(mockProduct);
    });
  })
});
