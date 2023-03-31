import { Component, OnInit } from "@angular/core";
import { Order } from "src/app/models/order";
import { OrderDetail } from "src/app/models/order-detail";
import { CartDetailService } from "src/app/services/cart-detail.service";
import { CartService } from "src/app/services/cart.service";
import { CommonService } from "src/app/services/common.service";
import { OrderService } from "src/app/services/order.service";
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
  orderRequest: Order = new Order();
  orderDetails: OrderDetail[] = [];
  isChecked: boolean;
  priceTotal: number = 0;
  itemQuantity: number;
  customerId: number;

  constructor(
    private cartService: CartService,
    private cartDetailService: CartDetailService,
    private orderService: OrderService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.customerId = this.commonService.getCustomerId();
    this.getCartByCustomerId(this.customerId);
  }

  pushItemToOrderDetails(cartDetail: CartDetail, value: any) {
    Object.assign(cartDetail, {
      itemId: cartDetail.item.id,
    });

    if (value.target.checked) {
      this.orderDetails.push(cartDetail);
      this.increaseTotalPrice(cartDetail);
    } else {
      this.orderDetails = this.orderDetails.filter(
        (c) => c.id !== cartDetail.id
      );
      this.priceTotal -= cartDetail.item.price * cartDetail.quantity;
    }

    Object.assign(this.orderRequest, {
      customerId: this.customerId,
      orderDetails: this.orderDetails,
      status: true,
    });
  }

  createOrder() {
    this.orderService.doCreateOrder(this.orderRequest).subscribe(() => {
      this.orderRequest = new Order();
      this.getCartByCustomerId(this.customerId);
    });
  }

  getCartByCustomerId(id: number) {
    this.cartService.doGetCartByCustomerId(id).subscribe((res) => {
      this.cartResponse = res;
    });
  }

  deleteItemByCartDetailId(id: number) {
    this.cartService.doDeleteItemByCartDetailId(id).subscribe(() => {
      this.getCartByCustomerId(this.customerId);
    });
  }

  increaseTotalPrice(cartDetail: CartDetail) {
    var orderDetail = this.orderDetails.filter((o) => {
      return o.id === cartDetail.id;
    });

    if (orderDetail.length === 1) {
      this.priceTotal += cartDetail.item.price * cartDetail.quantity;
    }
  }

  decreaseTotalPrice(cartDetail: CartDetail) {
    var orderDetail = this.orderDetails.filter((o) => {
      return o.id === cartDetail.id;
    });

    if (orderDetail.length === 1) {
      this.priceTotal -= cartDetail.item.price * cartDetail.quantity;
    }
  }
  increaseItemQuantity(cartDetail: CartDetail) {
    this.decreaseTotalPrice(cartDetail);

    if (cartDetail.quantity) {
      cartDetail.quantity += 1;
    } else {
      cartDetail.quantity = 1;
    }
    this.itemQuantity = cartDetail.quantity;
    this.updateItemInCart(cartDetail);
    this.increaseTotalPrice(cartDetail);
  }

  onChangeItemQuantity(cartDetail: CartDetail, newValue: any) {
    this.decreaseTotalPrice(cartDetail);
    if (cartDetail.quantity) {
      cartDetail.quantity = newValue.target.value;
    } else {
      cartDetail.quantity = 1;
    }
    this.itemQuantity = cartDetail.quantity;
    this.updateItemInCart(cartDetail);
    this.increaseTotalPrice(cartDetail);
  }

  decreaseItemQuantity(cartDetail: CartDetail) {
    this.decreaseTotalPrice(cartDetail);
    if (cartDetail.quantity) {
      cartDetail.quantity -= 1;
    } else {
      cartDetail.quantity = 1;
    }
    this.itemQuantity = cartDetail.quantity;
    this.updateItemInCart(cartDetail);
    this.increaseTotalPrice(cartDetail);
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
          this.cartRequest.customerId = this.customerId;
          this.cartService
            .doUpdateItemToCart(this.cartRequest)
            .subscribe(() => {});
        }
      });
  }
}
