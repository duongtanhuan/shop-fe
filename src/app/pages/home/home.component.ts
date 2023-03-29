import { Component, OnInit } from "@angular/core";
import { CommonService } from "src/app/services/common.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  isUserAdminLogged: boolean;
  isUserLogged: boolean;
  constructor(private commonService: CommonService) {}

  ngOnInit() {
    this.isUserAdminLogged = this.commonService.getIsUserAdmin();
    this.isUserLogged = this.commonService.getIsUser();
  }
}
