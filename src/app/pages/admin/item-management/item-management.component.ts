import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../../services/item.service';

@Component({
  selector: 'app-item-management',
  templateUrl: './item-management.component.html',
  styleUrls: ['./item-management.component.css']
})
export class ItemManagementComponent implements OnInit {

  constructor(private itemService:ItemService) { }

  ngOnInit() {
    this.itemService.getAllItem().subscribe((res) => console.log(res));
  }

}
