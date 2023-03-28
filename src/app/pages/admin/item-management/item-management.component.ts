import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { Item } from "src/app/models/item";
import { ItemService } from "../../../services/item.service";

@Component({
  selector: "app-item-management",
  templateUrl: "./item-management.component.html",
  styleUrls: ["./item-management.component.scss"],
})
export class ItemManagementComponent implements OnInit {
  item: Item = new Item();
  items: Item[] = [];
  itemForm: FormGroup;

  modalTitle: string;
  isSaved = false;
  deleteMessage = false;
  submitted = false;

  constructor(private itemService: ItemService, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaved = false;
    this.getItemAll();

    this.itemForm = this.fb.group({
      itemId: ["", Validators.required],
      itemName: ["", Validators.required],
      itemPrice: ["", Validators.required],
    });
  }

  get f() {
    return this.itemForm.controls;
  }
  onReset() {
    this.submitted = false;
    this.itemForm.reset();
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
    this.submitted = true;

    if (this.itemForm.invalid) {
      return;
    }
    this.item = new Item();
    this.item.id = this.ItemId.value;
    this.item.name = this.ItemName.value;
    this.item.price = this.ItemPrice.value;

    if (this.item.id != null) {
      this.itemService.doPut(this.item).subscribe(() => {
        this.isSaved = true;
        this.getItemAll();
      });
    } else {
      this.itemService.doPost(this.item).subscribe(() => {
        this.isSaved = true;
        this.getItemAll();
      });
    }
    this.onReset();
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
    this.submitted = false;
    this.item = new Item();
    this.modalTitle = "Add";
  }

  updateItem(id: number) {
    this.submitted = false;
    this.modalTitle = "Update";
    this.itemService.doGetById(id).subscribe((res) => {
      this.item = res;
    });
  }
}
