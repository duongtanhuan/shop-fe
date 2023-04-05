import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ADMIN_ROLE, USER_ADMIN_ROLE, USER_ROLE } from '../constant/utilities';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  setCustomerId(id: string) {
    localStorage.setItem('customerId', id);
  }

  getCustomerId() {
    return Number(localStorage.getItem('customerId'));
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getHttpOptions() {
    let token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  setIsRole(isAdmin: string) {
    localStorage.setItem('isRole', isAdmin);
  }

  getIsAdmin() {
    return localStorage.getItem('isRole') === ADMIN_ROLE;
  }

  getIsUserAdmin() {
    return localStorage.getItem('isRole') === USER_ADMIN_ROLE;
  }

  getIsUser() {
    return localStorage.getItem('isRole') === USER_ROLE;
  }

  setSizeCart(sizeCart: string) {
    localStorage.setItem('sizeCart', sizeCart);
  }

  getSizeCart() {
    return Number(localStorage.getItem('sizeCart'));
  }
}
