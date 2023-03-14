import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // CLI imports router
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { MyOrderComponent } from './pages/home/my-order/my-order.component';
import { ShowItemComponent } from './pages/home/show-item/show-item.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
    {
      path: 'admin', component: AdminComponent,
 
    },
    {
      path: 'home', component: HomeComponent,
      children: [
        { path: '**', component: ShowItemComponent }
      ]
    },
    {
      path: '', redirectTo:'/home', pathMatch: 'full'
    },
    {
      path: 'my-order', component: MyOrderComponent
    },
    {
      path: 'login', component: LoginComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }