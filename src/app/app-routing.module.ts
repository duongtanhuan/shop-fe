import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // CLI imports router
import { AdminComponent } from './pages/admin/admin.component';
import { CartComponent } from './pages/home/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { MyOrderComponent } from './pages/home/my-order/my-order.component';
import { ShowItemComponent } from './pages/home/show-item/show-item.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'my-order',
        component: MyOrderComponent,
      },
      { path: '**', component: ShowItemComponent },
    ],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
