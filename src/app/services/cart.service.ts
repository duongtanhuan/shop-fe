import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CART_API } from '../constant/api';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient, private commonService: CommonService) {}

  httpOptions = this.commonService.getHttpOptions();

  doGetCartByCustomerId(id: number): Observable<any> {
    return this.http.get(`${CART_API}/${id}`, this.httpOptions);
  }

  doAddItemToCart(cart: object): Observable<any> {
    return this.http.post(`${CART_API}`, cart, this.httpOptions);
  }
  doUpdateItemToCart(cart: object): Observable<any> {
    return this.http.put(`${CART_API}`, cart, this.httpOptions);
  }

  doDeleteItemByCartDetailId(id: number): Observable<any> {
    return this.http.delete(`${CART_API}/${id}`, this.httpOptions);
  }
}
