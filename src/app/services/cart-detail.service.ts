import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CART_DETAIL_API } from "../constant/api";
import { CommonService } from "./common.service";

@Injectable({
  providedIn: "root",
})
export class CartDetailService {
  constructor(private http: HttpClient, private commonService: CommonService) {}

  httpOptions = this.commonService.getHttpOptions();

  doGetCartDetailByCartIdAndItemId(cartId: number, itemId: number): Observable<any> {
    return this.http.get(
      `${CART_DETAIL_API}/${cartId}/${itemId}`,
      this.httpOptions
    );
  }

  doGetCartDetailById(cartDetailId: number): Observable<any> {
    return this.http.get(
      `${CART_DETAIL_API}/${cartDetailId}`,
      this.httpOptions
    );
  }
}
