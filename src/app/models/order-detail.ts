import { Item } from "./item";

export class OrderDetail {
    id: number;
    item: Item = new Item();
    quantity: number;
}
