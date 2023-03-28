import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Cart } from "src/app/models/cart";
import { CartDetail } from "src/app/models/cart-detail";
import { Item } from "src/app/models/item";
import { CartService } from "src/app/services/cart.service";
import { ItemService } from "src/app/services/item.service";
import { CartDetailService } from "../../../services/cart-detail.service";
import { CommonService } from '../../../services/common.service';

@Component({
  selector: "app-show-item",
  templateUrl: "./show-item.component.html",
  styleUrls: ["./show-item.component.scss"],
})
export class ShowItemComponent implements OnInit {
  cartResponse: Cart = new Cart();
  cartRequest: Cart = new Cart();
  cartDetail: CartDetail = new CartDetail();
  items: Observable<Item[]>;
  isAdmin: boolean;
  customerId: number;

  constructor(
    private itemService: ItemService,
    private cartService: CartService,
    private cartDetailService: CartDetailService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.customerId = this.commonService.getCustomerId();
    this.isAdmin = this.commonService .getIsAdmin();
    this.getItemAll();
    this.getCartByCustomerId(this.customerId);
  }

  getCartByCustomerId(id: number) {
    this.cartService.doGetCartByCustomerId(id).subscribe((res) => {
      this.cartResponse = res;
      this.commonService.setSizeCart(res.cartDetails.length)
    });
  }

  getItemAll() {
    this.itemService.doGetAll().subscribe((res) => {
      this.items = res;
    });
  }

  newCartDetail(itemId: number) {
    this.cartRequest.cartDetail.itemId = itemId;
    this.cartRequest.cartDetail.quantity = 1;
    this.cartRequest.customerId = this.customerId;
    this.cartService.doAddItemToCart(this.cartRequest).subscribe(() => {});
  }

  updateCartDetail(itemId: number) {
    this.cartRequest.cartDetail.id = this.cartDetail.id;
    this.cartRequest.cartDetail.quantity = this.cartDetail.quantity + 1;
    this.cartRequest.cartDetail.itemId = itemId;
    this.cartRequest.customerId = this.customerId;
    this.cartService.doUpdateItemToCart(this.cartRequest).subscribe(() => {});
  }

  addItemToCart(itemId: number) {
    if (this.cartResponse.id) {
      this.cartDetailService
        .doGetCartDetailByCartIdAndItemId(this.cartResponse.id, itemId)
        .subscribe((res) => {
          this.cartDetail = res;
          if (this.cartDetail != null) {
            this.updateCartDetail(itemId);
          } else {
            this.newCartDetail(itemId);
          }
        });
    } else {
      this.newCartDetail(itemId);
    }
    this.getCartByCustomerId(this.customerId);
  }
}
