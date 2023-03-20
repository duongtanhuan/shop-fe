import { Component, OnInit } from "@angular/core";
import { OrderDetail } from "src/app/models/order-detail";
import { CartDetailService } from "src/app/services/cart-detail.service";
import { CartService } from "src/app/services/cart.service";
import { Cart } from "../../../models/cart";
import { CartDetail } from "../../../models/cart-detail";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  cartResponse: Cart = new Cart();
  cartRequest: Cart = new Cart();
  cartDetail: CartDetail = new CartDetail();
  orderDetails: OrderDetail[] = [];
  isChecked: boolean;
  priceTotal: number = 0;

  constructor(
    private cartService: CartService,
    private cartDetailService: CartDetailService
  ) {}

  ngOnInit() {
    this.getCartByCustomerId(2);
  }

  checkOut() {
    this.orderDetails.forEach((o) => {});
  }

  pushItemToOrderDetails(cartDetail: CartDetail, value: any) {
    // this.cartDetail.itemId = cartDetail.item.id;
    const cartDetaiRequest = Object.assign(cartDetail, this.cartDetail);
    console.log(cartDetail);
    if (value.target.checked) {
      this.orderDetails.push(cartDetail);
    } else {
      this.orderDetails = this.orderDetails.filter(
        (c) => c.id !== cartDetail.id
      );
    }
    this.priceTotal = 0;
    this.orderDetails.forEach((o) => {
      if (o) {
        this.priceTotal += o.item.price * o.quantity;
        this;
      } else {
        this.priceTotal = 0;
      }
    });
  }

  getCartByCustomerId(id: number) {
    this.cartService.doGetCartByCustomerId(id).subscribe((res) => {
      this.cartResponse = res;
    });
  }

  deleteItemByCartDetailId(id: number) {
    this.cartService.doDeleteItemByCartDetailId(id).subscribe(() => {
      this.getCartByCustomerId(2);
    });
  }

  increaseItemQuantity(cartDetail: CartDetail) {
    if (cartDetail.quantity) {
      cartDetail.quantity += 1;
    } else {
      cartDetail.quantity = 1;
    }
    this.updateItemInCart(cartDetail);
    console.log(cartDetail);
  }

  onChangeItemQuantity(cartDetail: CartDetail, newValue: any) {
    if (cartDetail.quantity) {
      cartDetail.quantity = newValue.target.value;
    } else {
      cartDetail.quantity = 1;
    }
    this.updateItemInCart(cartDetail);
  }

  decreaseItemQuantity(cartDetail: CartDetail) {
    if (cartDetail.quantity) {
      cartDetail.quantity -= 1;
    } else {
      cartDetail.quantity = 1;
    }
    this.updateItemInCart(cartDetail);
  }

  updateItemInCart(cartDetail: CartDetail) {
    this.cartDetailService
      .doGetCartDetailById(cartDetail.id)
      .subscribe((res) => {
        this.cartDetail = res;
        if (this.cartDetail) {
          this.cartRequest.cartDetail.id = this.cartDetail.id;
          this.cartRequest.cartDetail.quantity = cartDetail.quantity;
          this.cartRequest.cartDetail.itemId = this.cartDetail.item.id;
          this.cartRequest.customerId = 2;
          this.cartService
            .doUpdateItemToCart(this.cartRequest)
            .subscribe(() => {});
        }
      });
  }
}
