import { Item } from "./item";

export class OrderDetail {
    id: number;
    itemId: number;
    item: Item = new Item();
    quantity: number;
}
