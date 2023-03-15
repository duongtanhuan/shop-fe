import { OrderDetail } from "./order-detail";

export class Order {
    id: number;
    orderDetails: OrderDetail[] = [new OrderDetail];
    createDate: Date;
    hi: string;
}
