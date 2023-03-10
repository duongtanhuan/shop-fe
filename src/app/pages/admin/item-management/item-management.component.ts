import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../services/item.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/models/item';
import { Observable } from 'rxjs';
import 'bootstrap/dist/css/bootstrap.min.css';
@Component({
  selector: 'app-item-management',
  templateUrl: './item-management.component.html',
  styleUrls: ['./item-management.component.scss']
})
export class ItemManagementComponent implements OnInit {

  // itemForm = this.fb.group({
  //   itemId:[],
  //   itemName:['',Validators.required, Validators.minLength(5)],
  //   itemPrice:['',Validators.required]
  // })
  items: Observable<Item[]>;
  item: Item = new Item();

  itemForm = new FormGroup({
    itemName: new FormControl("",Validators.required),
    itemPrice: new FormControl("",Validators.required)
  })
  constructor(
    private itemService:ItemService,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.getItemAll();

  }

  get ItemName() {
    return this.itemForm.get('itemName');
  }

  getItemAll() {
    this.itemService.doGetAll().subscribe((res) => {
      this.items = res;
      console.log("items: ", this.items)
    });
  }
  saveItem() {
    this.item = new Item();
    this.item.id = 6;
    this.item.name = this.ItemName.value;
    this.item.price = this.ItemPrice.value;
    console.log("Form value: ", this.item)
    // this.itemService.doPost(this.item).subscribe((res) => console.log(res));
  }

  deleteItem(id: number) {
    this.itemService.doDelete(id).subscribe((res) => console.log(res));
  }
  get ItemPrice() {
    return this.itemForm.get('itemPrice');
  }

}
