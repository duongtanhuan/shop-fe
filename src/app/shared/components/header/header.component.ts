import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CartService } from "src/app/services/cart.service";
import { CartDetail } from "../../../models/cart-detail";
import { CommonService } from "../../../services/common.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  cartDetails: CartDetail[] = [new CartDetail()];
  customerId: number;
  isAdmin: boolean;
  sizeCart: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.customerId = this.commonService.getCustomerId();
    this.cartService.doGetCartByCustomerId(this.customerId).subscribe((res) => {
      this.cartDetails = res.cartDetails;
      this.commonService.setSizeCart(res.cartDetails.length)
    });
    this.isAdmin = this.commonService.getIsAdmin();
    this.sizeCart = this.commonService.getSizeCart();
  }

  logout() {
    localStorage.clear();
    this.goLogin();
  }

  goLogin() {
    this.router.navigate(["/login"], { relativeTo: this.route });
  }
  goMyOrder() {
    this.router.navigate(["my-order"], { relativeTo: this.route });
  }

  goHome() {
    this.router.navigate([""], { relativeTo: this.route });
  }

  goCart() {
    this.router.navigate(["cart"], { relativeTo: this.route });
  }
}
