import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  constructor() {}

  setCustomerId(id: string) {
    localStorage.setItem("customerId", id);
  }

  getCustomerId() {
    return Number(localStorage.getItem("customerId"));
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  getHttpOptions() {
    let token = localStorage.getItem("token");
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  setIsAdmin(isAdmin: string) {
    localStorage.setItem("isAdmin", isAdmin);
  }

  getIsAdmin() {
    return localStorage.getItem("isAdmin") === "admin";
  }

  setSizeCart(sizeCart: string) {
    localStorage.setItem("sizeCart", sizeCart);
  }

  getSizeCart() {
    return Number(localStorage.getItem("sizeCart"));
  }
}
