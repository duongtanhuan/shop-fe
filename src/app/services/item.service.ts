import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';  

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private baseUrl = 'http://localhost:8080/items/';

  constructor(private http:HttpClient) { }

  getAllItem(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
