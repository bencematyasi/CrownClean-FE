import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserUpdateComponent } from './users/user-update/user-update.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { AdminComponent } from './admin/admin.component';
import { VehiclesListComponent } from './vehicles/vehicles-list/vehicles-list.component';
import { OrdersListComponent } from './orders/orders-list/orders-list.component';
import { OrderDetailComponent } from './orders/order-detail/order-detail.component';
import { VehicleDetailComponent } from './vehicles/vehicle-detail/vehicle-detail.component';
import { VehicleAddComponent } from './vehicles/vehicle-add/vehicle-add.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent, children: [
      { path: '', component: OrdersListComponent },
      { path: 'orders', component: OrdersListComponent },
      { path: 'orders/:id', component: OrderDetailComponent },
      { path: 'orders-update/:id', component: OrderDetailComponent },
      { path: 'users', component: UsersListComponent },
      { path: 'users/:id', component: UserDetailComponent },
      { path: 'user-update/:id', component: UserUpdateComponent },
    ]},
  { path: 'users', component: UsersListComponent },
  { path: 'users/:id', component: UserDetailComponent },
  { path: 'user-update/:id', component: UserUpdateComponent },
  { path: 'user-add', component: UserAddComponent },
  { path: 'vehicles', component: VehiclesListComponent },
  { path: 'vehicles/:id', component: VehicleDetailComponent},
  { path: 'vehicle-add', component: VehicleAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
