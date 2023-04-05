import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../app-routing.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ItemManagementComponent } from './item-management/item-management.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoaderFactory } from 'src/app/shared/factory/translate-http-loader-factory';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [AdminComponent, ItemManagementComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
})
export class AdminModule {}
