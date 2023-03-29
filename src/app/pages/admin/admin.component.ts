import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonService } from "src/app/services/common.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
  isAdminLogged: boolean;
  isUserAdminLogged: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.isAdminLogged = this.commonService.getIsAdmin();
    this.isUserAdminLogged = this.commonService.getIsUserAdmin();
  }

  logout() {
    localStorage.clear();
    this.goLogin();
  }

  goLogin() {
    this.router.navigate(["/login"], { relativeTo: this.route });
  }

  goHome() {
    this.router.navigate([""], { relativeTo: this.route });
  }
}
