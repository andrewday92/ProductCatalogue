import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent, Cart } from './cart.component';
import { BrowserStorageService, StorageTypes } from 'src/app/core/services/browser-storage.service';
import { ProductService } from 'src/app/shared/services/product.service';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let browserStorageServiceMock: jasmine.SpyObj<BrowserStorageService>;
  let productServiceMock: any;

  const mockCart: Cart[] = [
    { id: '1', title: 'Product 1', price: 100, amount: 2 },
    { id: '2', title: 'Product 2', price: 50, amount: 1 },
  ];

  beforeEach(async () => {
    browserStorageServiceMock = jasmine.createSpyObj('BrowserStorageService', ['getItem', 'setItem', 'removeItem']);
    productServiceMock = jasmine.createSpyObj('ProductService', ['someMethod']);

    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [
        { provide: BrowserStorageService, useValue: browserStorageServiceMock },
        { provide: ProductService, useValue: productServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    browserStorageServiceMock.getItem.and.returnValue(JSON.stringify(mockCart));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return cart items from storage', () => {
    const cart = component.cart;
    expect(cart).toEqual(mockCart);
    expect(browserStorageServiceMock.getItem).toHaveBeenCalledWith('cart');
  });

  it('should calculate total number of items in the cart', () => {
    expect(component.cartTotal).toBe(3);
  });

  it('should calculate total price of items in the cart', () => {
    expect(component.cartTotalPrice).toBe(250);
  });

  it('should return true for hasCart if there are items in the cart', () => {
    expect(component.hasCart).toBeTrue();
  });

  it('should toggle the cart visibility', () => {
    expect(component.showCart).toBeFalse();
    component.toggleCart();
    expect(component.showCart).toBeTrue();
    component.toggleCart();
    expect(component.showCart).toBeFalse();
  });

  it('should remove a cart item and decrease amount', () => {
    component.removeCartItem('1', 0);
    expect(browserStorageServiceMock.setItem).toHaveBeenCalledWith('cart', {
      data: [
        { id: '1', title: 'Product 1', price: 100, amount: 1 },
        { id: '2', title: 'Product 2', price: 50, amount: 1 },
      ],
      type: StorageTypes.Session,
    });
  });

});
