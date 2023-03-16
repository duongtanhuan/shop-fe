import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartDetailService {

  private baseUrl = 'http://localhost:8080/cartDetails';

  private headerApplicationJson = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(private http:HttpClient) { }

  doGetCartDetailByCartIdAndItemId(cartId: number, itemId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${cartId}/${itemId}`, {headers: this.headerApplicationJson});
  }
}
