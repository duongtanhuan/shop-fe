import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemManagementComponent } from '../pages/admin/item-management/item-management.component';
import { AdminComponent } from '../pages/admin/admin.component';
import { AppRoutingModule } from '../app-routing.module';
import { AdminRoutingModule } from '../pages/admin/admin-routing.module';

@NgModule({
  declarations: [
    AdminComponent,
    ItemManagementComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    AdminRoutingModule
  ]
})
export class SharedModule { }
