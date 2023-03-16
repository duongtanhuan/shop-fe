import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import "bootstrap/dist/css/bootstrap.min.css";
import { Item } from "src/app/models/item";
import { ItemService } from "../../../services/item.service";
@Component({
  selector: "app-item-management",
  templateUrl: "./item-management.component.html",
  styleUrls: ["./item-management.component.scss"],
})
export class ItemManagementComponent implements OnInit {
  item: Item = new Item();
  items: Item[] = [new Item()];

  modalTitle: string;
  isSaved = false;
  deleteMessage = false;

  itemForm = new FormGroup({
    itemId: new FormControl(null),
    itemName: new FormControl("", Validators.required),
    itemPrice: new FormControl("", Validators.required),
  });
  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.isSaved = false;
    this.getItemAll();
  }

  get ItemId() {
    return this.itemForm.get("itemId");
  }

  get ItemName() {
    return this.itemForm.get("itemName");
  }

  get ItemPrice() {
    return this.itemForm.get("itemPrice");
  }

  getItemAll() {
    this.itemService.doGetAll().subscribe((res) => {
      this.items = res;
    });
  }

  saveItem() {
    this.item = new Item();
    this.item.id = this.ItemId.value;
    this.item.name = this.ItemName.value;
    this.item.price = this.ItemPrice.value;

    if (this.item.id != null) {
      this.itemService.doPut(this.item).subscribe((res) => {
        this.isSaved = true;
        this.getItemAll();
      });
    } else {
      this.itemService.doPost(this.item).subscribe((res) => {
        this.isSaved = true;
        this.getItemAll();
      });
    }
  }

  changeisSaved() {
    this.isSaved = false;
  }

  deleteItem(id: number) {
    this.itemService.doDelete(id).subscribe((res) => {
      this.deleteMessage = true;
      this.getItemAll();
    });
  }

  addNew() {
    this.item = new Item();
    this.modalTitle = "Add";
  }

  updateItem(id: number) {
    this.modalTitle = "Update";
    this.itemService.doGetById(id).subscribe((res) => {
      this.item = res;
    });
  }
}
