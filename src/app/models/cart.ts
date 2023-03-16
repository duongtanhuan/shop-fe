import { CartDetail } from './cart-detail';
import { Customer } from "./customer";

export class Cart {
    id: number;
    customerId: number;
    customer: Customer = new Customer();
    cartDetail: CartDetail = new CartDetail();
}
