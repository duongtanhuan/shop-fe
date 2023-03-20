import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ItemService } from "./services/item.service";
import { AdminModule } from "./pages/admin/admin.module";
import { HomeComponent } from "./pages/home/home.component";
import { MyOrderComponent } from "./pages/home/my-order/my-order.component";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./shared/components/header/header.component";
import { ShowItemComponent } from "./pages/home/show-item/show-item.component";
import { LoginComponent } from "./pages/login/login.component";
import { CartComponent } from "./pages/home/cart/cart.component";
import { ToastContainerModule, ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MyOrderComponent,
    HeaderComponent,
    ShowItemComponent,
    LoginComponent,
    CartComponent,
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
  ],
  providers: [ItemService],
  bootstrap: [AppComponent],
})
export class AppModule {}
