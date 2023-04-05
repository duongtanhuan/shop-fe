import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH_API } from '../constant/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private headerApplicationJson = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  doPostCredentials(loginForm: object): Observable<any> {
    return this.http.post(`${AUTH_API}/login`, loginForm, {
      headers: this.headerApplicationJson,
    });
  }
  doPostRegisterAccount(registerForm: object): Observable<any> {
    return this.http.post(`${AUTH_API}/signup`, registerForm, {
      headers: this.headerApplicationJson,
    });
  }
}
