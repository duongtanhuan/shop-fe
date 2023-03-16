import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Cart } from "src/app/models/cart";
import { CartDetail } from "src/app/models/cart-detail";
import { Item } from "src/app/models/item";
import { CartService } from "src/app/services/cart.service";
import { ItemService } from "src/app/services/item.service";
import { CartDetailService } from "../../../services/cart-detail.service";

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

  constructor(
    private itemService: ItemService,
    private cartService: CartService,
    private cartDetailService: CartDetailService
  ) {}

  ngOnInit() {
    this.getItemAll();
    this.cartService.doGetCartByCustomerId(2).subscribe((res) => {
      this.cartResponse = res;
    });
  }

  getItemAll() {
    this.itemService.doGetAll().subscribe((res) => {
      this.items = res;
    });
  }

  addItemToCart(itemId: number) {
    this.cartDetailService
      .doGetCartDetailByCartIdAndItemId(this.cartResponse.id, itemId)
      .subscribe((res) => {
        this.cartDetail = res;
        if (this.cartDetail != null) {
          this.cartDetail.quantity += 1;
          this.cartRequest.cartDetail.id = this.cartDetail.id;
          this.cartRequest.cartDetail.quantity = this.cartDetail.quantity;
          this.cartRequest.cartDetail.itemId = itemId;
          this.cartRequest.customerId = 2;
          this.cartService
            .doUpdateItemToCart(this.cartRequest)
            .subscribe(() => {
            });
        } else {
          this.cartRequest.cartDetail.itemId = itemId;
          this.cartRequest.cartDetail.quantity = 1;
          this.cartRequest.customerId = 2;
          this.cartService.doAddItemToCart(this.cartRequest).subscribe(() => {
          });
        }
      });
  }
}
