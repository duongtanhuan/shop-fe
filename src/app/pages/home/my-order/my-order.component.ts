import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
// import { Order } from 'src/app/models/item';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit {

  order: Order = new Order();
  orders: Order[] = [new Order()];
  constructor(private service:OrderService) { }

  ngOnInit() {
    this.getOrdersByCustomerId(2)
  }

  getOrdersByCustomerId(id: number) {
    this.service.doGetAllByCustomerId(id).subscribe((res) => {
      this.orders = res;
      console.log(this.orders)
    })
  }
}
