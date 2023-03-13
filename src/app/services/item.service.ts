import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';  

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private baseUrl = 'http://localhost:8080/items';

  private headerApplicationJson = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  
  constructor(private http:HttpClient) { }

  doGetAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`, {headers: this.headerApplicationJson});
  }
  
  doGetById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, {headers: this.headerApplicationJson});
  }

  doPost(item: object): Observable<any> {
    return this.http.post(`${this.baseUrl}`, item, {headers: this.headerApplicationJson});
  }
  
  doPut(item: object): Observable<any> {
    return this.http.put(`${this.baseUrl}`, item, {headers: this.headerApplicationJson});
  }

  doDelete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {headers: this.headerApplicationJson});
  }
}
