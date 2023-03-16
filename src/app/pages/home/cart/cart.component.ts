import { Component, OnInit } from '@angular/core';
import { Cart } from '../../../models/cart';
import { CartDetail } from '../../../models/cart-detail';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: Cart = new Cart();
  cartDetail: CartDetail = new CartDetail();
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.getCartByCustomerId(2);
  }
  getCartByCustomerId(id: number) {
    this.cartService.doGetCartByCustomerId(id).subscribe((res) => {
      this.cart = res;
      console.log("Cart",this.cart);
    })
  }
deleteItemByCartDetailId(id: number) {
  this.cartService.doDeleteItemByCartDetailId(id).subscribe(() => {
    
  })
}


}
