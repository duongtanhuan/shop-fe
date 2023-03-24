import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/auth';

  private headerApplicationJson = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http:HttpClient) { }

  doPostCredentials(loginForm: object): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, loginForm, {headers: this.headerApplicationJson});
  }
}
