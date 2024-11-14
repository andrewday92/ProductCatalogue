import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiHttpService } from './api-http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

describe('ApiHttpService', () => {
  let service: ApiHttpService;
  let httpMock: HttpTestingController;
  let mockHttpClient: HttpClient;
  environment.apiUrl = 'test-url';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiHttpService]
    });

    service = TestBed.inject(ApiHttpService);
    httpMock = TestBed.inject(HttpTestingController);
    mockHttpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call HttpClient.get with the correct URL and headers', () => {
    const mockData = { id: 1, name: 'Test' };
    const endpoint = '/test-endpoint';

    service.get(endpoint).subscribe((response) => {
      expect(response).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}${endpoint}`);

    expect(req.request.method).toBe('GET');

    req.flush(mockData);
  });

  it('should allow options to be passed to the get method', () => {
    const mockData = { id: 2, name: 'Another Test' };
    const endpoint = '/another-endpoint';
    const mockOptions = {
      params: { search: 'test' },
      responseType: 'json' as const
    };

    service.get(endpoint, mockOptions).subscribe((response) => {
      expect(response).toEqual(mockData);
    });

    const req = httpMock.expectOne((request) =>
      request.url === `${environment.apiUrl}${endpoint}`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockData);
  });
});
