import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = 'http://localhost:8080/carts';

  private headerApplicationJson = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  
  constructor(private http:HttpClient) { }

  doGetCartByCustomerId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, {headers: this.headerApplicationJson});
  }

  doAddItemToCart(cart: object): Observable<any> {
    return this.http.post(`${this.baseUrl}`, cart, {headers: this.headerApplicationJson});
  }
  doUpdateItemToCart(cart: object): Observable<any> {
    return this.http.put(`${this.baseUrl}`, cart, {headers: this.headerApplicationJson});
  }

  doDeleteItemByCartDetailId(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {headers: this.headerApplicationJson});
  }
}
