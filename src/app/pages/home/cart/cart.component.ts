import { Component, OnInit } from "@angular/core";
import { Cart } from "../../../models/cart";
import { CartDetail } from "../../../models/cart-detail";
import { CartService } from "src/app/services/cart.service";
import { CartDetailService } from "src/app/services/cart-detail.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  cartResponse: Cart = new Cart();
  cartRequest: Cart = new Cart();
  cartDetail: CartDetail = new CartDetail();
  quantity: number = 0;
  isIncrease = false;
  isDecrease = false;
  constructor(
    private cartService: CartService,
    private cartDetailService: CartDetailService
  ) {}

  ngOnInit() {
    this.getCartByCustomerId(2);
  }
  getCartByCustomerId(id: number) {
    this.cartService.doGetCartByCustomerId(id).subscribe((res) => {
      this.cartResponse = res;
      // this.quantity = this.cartResponse.cartDetail.quantity;
    });
  }

  deleteItemByCartDetailId(id: number) {
    this.cartService.doDeleteItemByCartDetailId(id).subscribe(() => {});
  }

  increaseItemQuantity() {
    console.log("plus");
    this.isIncrease = true;
    this.isDecrease = false;
  }

  decreaseItemQuantity() {
    console.log("minus");
    this.isDecrease = true;
    this.isIncrease = false;
  }

  updateItemInCart(cartId: number, itemId: number) {
    this.cartDetailService
      .doGetCartDetailByCartIdAndItemId(cartId, itemId)
      .subscribe((res) => {
        this.cartDetail = res;
        if (this.cartDetail) {
          this.cartRequest.cartDetail.id = this.cartDetail.id;
          if ((this.isIncrease = true)) {
            this.cartRequest.cartDetail.quantity = this.cartDetail.quantity + 1;
          }
          if ((this.isDecrease = true)) {
            this.cartRequest.cartDetail.quantity = this.cartDetail.quantity - 1;
          }
          this.cartRequest.cartDetail.itemId = itemId;
          this.cartRequest.customerId = 2;
          console.log("request", this.cartRequest);
          // this.cartService
          //   .doUpdateItemToCart(this.cartRequest)
          //   .subscribe(() => {});
        }
      });
    this.getCartByCustomerId(2);
    console.log("change");
  }
}
