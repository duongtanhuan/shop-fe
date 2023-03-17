import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Cart } from "src/app/models/cart";
import { CartDetail } from "src/app/models/cart-detail";
import { Item } from "src/app/models/item";
import { CartService } from "src/app/services/cart.service";
import { ItemService } from "src/app/services/item.service";
import { CartDetailService } from "../../../services/cart-detail.service";
import { ToastrService } from "ngx-toastr";

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
    private cartDetailService: CartDetailService,
    private toastr: ToastrService,
    
  ) {}

  ngOnInit() {
    this.getItemAll();
    this.cartService.doGetCartByCustomerId(2).subscribe((res) => {
      this.cartResponse = res;
    });
  }
  showSuccess() {
    this.toastr.success("Hello world!", "Toastr fun!", {
      timeOut: 300,
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
    this.cartRequest.customerId = 2;
    this.cartService.doAddItemToCart(this.cartRequest).subscribe(() => {
      this.showSuccess();
    });
  }

  updateCartDetail(itemId: number) {
    this.cartRequest.cartDetail.id = this.cartDetail.id;
    this.cartRequest.cartDetail.quantity = this.cartDetail.quantity + 1;
    this.cartRequest.cartDetail.itemId = itemId;
    this.cartRequest.customerId = 2;
    this.cartService.doUpdateItemToCart(this.cartRequest).subscribe(() => {
      this.toastr.success("View cart and pay", "Add to cart successfully");
    });
  }

  addItemToCart(itemId: number) {
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
  }
}
