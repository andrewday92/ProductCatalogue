import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '@environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiHttpService {
  private _apiURL = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  public get<T>(endpoint?: string, params?: any): Observable<T> {
    return this._http
      .get<T>(`${this._apiURL}${endpoint}`, {
        params: params,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => console.error(error));
        })
      );
  }
}
