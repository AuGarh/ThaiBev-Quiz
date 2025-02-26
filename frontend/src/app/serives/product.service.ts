import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  baseUrl: string = 'https://localhost:7201/api/Product';

  getProductList(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(this.baseUrl);
  }

  createProduct(productCode: string): Observable<Product> {
    return this._httpClient.post<Product>(this.baseUrl, { ProductCode: productCode });
  }

  deleteProduct(id: number): Observable<void> {
    return this._httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
