import { Item } from './item';
export class CartDetail {
    id: number;
    itemId: number;
    item: Item = new Item();
    quantity: number;
    dateAdded: Date;
}
