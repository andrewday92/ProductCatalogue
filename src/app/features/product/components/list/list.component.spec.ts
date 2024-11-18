import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { ProductService } from 'src/app/shared/services/product.service';
import { of } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Product } from '@models';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { OrderByPipe } from 'src/app/shared/pipes/order-by.pipe';
import { EllipsisPipe } from 'src/app/shared/pipes/ellipsis.pipe';
import { FilterByPipe } from 'src/app/shared/pipes/filter-by.pipe';
import { CardComponent } from '../card/card.component';
import { NgOptimizedImage } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';


describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let productServiceMock: any;

  const mockProducts: Product[] = [
    new Product(1, 'Product 1', 100, 'Description 1', 'Category 1', 'image-1', { rate: 4.5, count: 10}),
    new Product(2, 'Product 2', 150, 'Description 2', 'Category 2', 'image-2', { rate: 4.0, count: 20}),
  ];

  beforeEach(async () => {
    productServiceMock = {
      getAllProducts: jasmine.createSpy().and.returnValue(of(mockProducts)),
      categories: ['Category 1', 'Category 2'],
    };

    await TestBed.configureTestingModule({
      declarations: [ListComponent, OrderByPipe, EllipsisPipe, FilterByPipe, CardComponent],
      providers: [
        { provide: ProductService, useValue: productServiceMock }
      ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, NgOptimizedImage, RouterTestingModule]
    }).compileComponents();
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  it('should set sortField when sortOnField is called', () => {
    component.sortFilterForm.controls['sortFields'].setValue('category');
    component.sortOnField();
    expect(component.sortField).toBe('category');
  });


  it('should set sortOrder when selectOrder is called', () => {
    component.sortFilterForm.controls['order'].setValue('desc');
    component.selectOrder();
    expect(component.sortOrder).toBe('desc');
  });

  it('should track products by id using trackById', () => {
    const product = mockProducts[0]
    const result = component.trackById(0, product);
    expect(result).toBe(1);
  });

  it('should default to "title" sortField if sortFields control is empty', () => {
    component.sortFilterForm.controls['sortFields'].setValue(null);
    component.sortOnField();
    expect(component.sortField).toBe('title');
  });
});
