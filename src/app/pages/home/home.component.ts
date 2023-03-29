import { Component, OnInit } from "@angular/core";
import { CommonService } from "src/app/services/common.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  isLogged: boolean;
  constructor(private commonService: CommonService) {}

  ngOnInit() {
    if (this.commonService.getCustomerId()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
}
