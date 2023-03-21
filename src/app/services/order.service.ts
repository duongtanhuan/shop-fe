import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://localhost:8080/orders';

  private headerApplicationJson = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  
  constructor(private http:HttpClient) { }

  doGetAllByCustomerId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, {headers: this.headerApplicationJson});
  }

  doCreateOrder(order: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}`, order, {headers: this.headerApplicationJson})
  }
}
