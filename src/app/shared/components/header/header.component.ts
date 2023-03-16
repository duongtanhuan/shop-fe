import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';
import { CartDetail } from '../../../models/cart-detail';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartDetails: CartDetail[] = [new CartDetail()];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
    ) { }

  ngOnInit() {
    this.cartService.doGetCartByCustomerId(2).subscribe((res) => {
      this.cartDetails = res.cartDetails;
    });
  }

  goMyOrder() {
    this.router.navigate(['my-order'], { relativeTo: this.route });
  }
  
  goHome() {
    this.router.navigate(['home'], { relativeTo: this.route });
  }

  goCart() {
    this.router.navigate(['cart'], { relativeTo: this.route });
  }
}
