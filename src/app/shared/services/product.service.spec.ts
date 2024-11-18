import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { ApiHttpService } from 'src/app/core/services/api-http.service';
import { BrowserStorageService, StorageTypes } from 'src/app/core/services/browser-storage.service';
import { of, Subject } from 'rxjs';
import { Product } from '@models';

describe('ProductService', () => {
  let service: ProductService;
  let apiHttpServiceMock: any;
  let browserStorageServiceMock: any;

  const mockProducts: Product[] = [
    new Product(1, 'Product 1', 100, 'Description 1', 'Category 1', 'image-1', { rate: 4.5, count: 10}),
    new Product(2, 'Product 2', 150, 'Description 2', 'Category 2', 'image-2', { rate: 4.0, count: 20}),
  ];

  beforeEach(() => {
    apiHttpServiceMock = {
      get: jasmine.createSpy().and.callFake((url: string) => {
        if (url.startsWith('products/')) {
          return of(mockProducts.find(product => product.id === 1));
        }
        return of(mockProducts);
      }),
    };

    browserStorageServiceMock = {
      getItem: jasmine.createSpy().and.returnValue(null),
      setItem: jasmine.createSpy(),
    };

    TestBed.configureTestingModule({
      providers: [
        ProductService,
        { provide: ApiHttpService, useValue: apiHttpServiceMock },
        { provide: BrowserStorageService, useValue: browserStorageServiceMock },
      ],
    });

    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllProducts', () => {
    it('should fetch products and store them in browser storage', (done) => {
      service.getAllProducts<Product>().subscribe((products) => {
        expect(products).toEqual(mockProducts);
        expect(apiHttpServiceMock.get).toHaveBeenCalledWith('products');
        expect(browserStorageServiceMock.setItem).toHaveBeenCalledWith('products', {
          type: StorageTypes.Local,
          data: mockProducts,
        });
        done();
      });
    });

    it('should set categories from fetched products', (done) => {
      service.getAllProducts<Product>().subscribe(() => {
        expect(service.categories).toEqual(['Category 1', 'Category 2']);
        done();
      });
    });

    it('should emit products via the products$ subject', (done) => {
      service.products$.subscribe((products) => {
        expect(products).toEqual(mockProducts);
        done();
      });

      service.getAllProducts<Product>().subscribe();
    });
  });

  describe('getProductById', () => {
    it('should fetch product by id', (done) => {
      service.getProductById<Product>(1).subscribe((product) => {
        expect(product).toEqual(mockProducts[0]);
        expect(apiHttpServiceMock.get).toHaveBeenCalledWith('products/1');
        done();
      });
    });
  });

  describe('addToCart', () => {
    it('should add a product to an empty cart', () => {
      const product: Product = new Product(1, 'Product 1', 100, 'Description 1', 'Category 1', 'image-1', { rate: 4.5, count: 10});

      service.addToCart(product);

      expect(browserStorageServiceMock.setItem).toHaveBeenCalledWith('cart', {
        data: [{ id: 1, price: 100, title: 'Product 1', amount: 1 }],
        type: StorageTypes.Session,
      });
    });

    it('should increment the amount if the product already exists in the cart', () => {
      const product: Product = new Product(1, 'Product 1', 100, 'Description 1', 'Category 1', 'image-1', { rate: 4.5, count: 10});
      browserStorageServiceMock.getItem.and.returnValue(
        JSON.stringify([{ id: 1, price: 100, title: 'Product 1', amount: 1 }])
      );

      service.addToCart(product);

      expect(browserStorageServiceMock.setItem).toHaveBeenCalledWith('cart', {
        data: [{ id: 1, price: 100, title: 'Product 1', amount: 2 }],
        type: StorageTypes.Session,
      });
    });
  });

  describe('ngOnDestroy', () => {
    it('should complete the destroy$ subject', () => {
      const destroySpy = spyOn(service['destroy$'], 'next').and.callThrough();
      const completeSpy = spyOn(service['destroy$'], 'complete').and.callThrough();

      service.ngOnDestroy();

      expect(destroySpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });
});
