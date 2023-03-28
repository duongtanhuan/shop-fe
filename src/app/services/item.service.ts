import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ITEM_API } from "../constant/api";
import { CommonService } from "./common.service";

@Injectable({
  providedIn: "root",
})
export class ItemService {
  constructor(private http: HttpClient, private commonService: CommonService) {}
  httpOptions = this.commonService.getHttpOptions();

  doGetAll(): Observable<any> {
    return this.http.get(`${ITEM_API}`, this.httpOptions);
  }

  doGetById(id: number): Observable<any> {
    return this.http.get(`${ITEM_API}/${id}`, this.httpOptions);
  }

  doPost(item: object): Observable<any> {
    return this.http.post(`${ITEM_API}`, item, this.httpOptions);
  }

  doPut(item: object): Observable<any> {
    return this.http.put(`${ITEM_API}`, item, this.httpOptions);
  }

  doDelete(id: number): Observable<any> {
    return this.http.delete(`${ITEM_API}/${id}`, this.httpOptions);
  }
}
