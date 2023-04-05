import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './pages/admin/admin.module';
import { CartComponent } from './pages/home/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { MyOrderComponent } from './pages/home/my-order/my-order.component';
import { ShowItemComponent } from './pages/home/show-item/show-item.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ItemService } from './services/item.service';
import { HeaderComponent } from './shared/components/header/header.component';
import { TranslateHttpLoaderFactory } from './shared/factory/translate-http-loader-factory';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MyOrderComponent,
    HeaderComponent,
    ShowItemComponent,
    LoginComponent,
    CartComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    AdminModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot({ timeOut: 10000 }),
    ToastContainerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [ItemService],
  bootstrap: [AppComponent],
})
export class AppModule {}
