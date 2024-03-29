import { OrderDetail } from "./order-detail";
import { Customer } from './customer';

export class Order {
    id: number;
    totalPrice: number;
    status: boolean;
    customer: Customer = new Customer();
    orderDetails: OrderDetail[] = [new OrderDetail()];
    createDate: Date;
}
