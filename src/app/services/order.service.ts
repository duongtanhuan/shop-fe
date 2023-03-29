import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ORDER_API } from "../constant/api";
import { CommonService } from "./common.service";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  constructor(private http: HttpClient, private commonService: CommonService) {}

  httpOptions = this.commonService.getHttpOptions();

  doGetAllByCustomerId(id: number): Observable<any> {
    return this.http.get(`${ORDER_API}/${id}`, this.httpOptions);
  }

  doGetPendingOrdersByStatus(): Observable<any> {
    return this.http.get(`${ORDER_API}` + "/pendingOrders", this.httpOptions);
  }
  doGetPendingOrdersByCustomerIdAndStatus(id: number): Observable<any> {
    return this.http.get(`${ORDER_API}` + "/pendingOrders" +`/${id}`, this.httpOptions);
  }

  doCreateOrder(order: Object): Observable<any> {
    return this.http.post(`${ORDER_API}`, order, this.httpOptions);
  }
}
