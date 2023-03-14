import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemManagementComponent } from './item-management/item-management.component';
import { AdminComponent } from './admin.component';
import { AppRoutingModule } from '../../app-routing.module';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminComponent,
    ItemManagementComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
