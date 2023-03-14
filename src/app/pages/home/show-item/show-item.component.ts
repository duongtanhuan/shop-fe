import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrls: ['./show-item.component.scss']
})
export class ShowItemComponent implements OnInit {

  items: Observable<Item[]>;
  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getItemAll()
  }

  getItemAll() {
    this.itemService.doGetAll().subscribe((res) => {
      this.items = res;
    });
  }
}
