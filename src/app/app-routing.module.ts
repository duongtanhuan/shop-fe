import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { ItemManagementComponent } from './pages/admin/item-management/item-management.component';
import { AdminComponent } from './pages/admin/admin.component';

const routes: Routes = [
    {
      path: 'admin', component: AdminComponent,
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }