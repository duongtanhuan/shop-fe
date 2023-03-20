import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../app-routing.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ItemManagementComponent } from './item-management/item-management.component';

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
