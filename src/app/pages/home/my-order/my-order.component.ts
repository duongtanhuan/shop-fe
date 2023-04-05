import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { CommonService } from 'src/app/services/common.service';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss'],
})
export class MyOrderComponent implements OnInit {
  order: Order = new Order();
  orders: Order[] = [];
  pendingOrders: Order[] = [];
  pendingOrdersOfCustomer: Order[] = [];
  customerId: number;
  isAdmin: boolean;

  constructor(
    private service: OrderService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.customerId = this.commonService.getCustomerId();
    this.getOrdersByCustomerId(this.customerId);
    this.getPendingOrdersByStatus();
    this.getPendingOrdersByCustomerIdAndStatus(2);
    this.isAdmin = this.commonService.getIsAdmin();
  }

  getOrdersByCustomerId(id: number) {
    this.service.doGetAllByCustomerId(id).subscribe((res) => {
      this.orders = res;
    });
  }

  getPendingOrdersByStatus() {
    this.service.doGetPendingOrdersByStatus().subscribe((res) => {
      this.pendingOrders = res;
    });
  }

  getPendingOrdersByCustomerIdAndStatus(id: number) {
    this.service
      .doGetPendingOrdersByCustomerIdAndStatus(id)
      .subscribe((res) => {
        this.pendingOrdersOfCustomer = res;
      });
  }
}
