import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/Account/account/account.component';
import { AllOrdersComponent } from './components/AllOrders/all-orders/all-orders.component';
import { AllUsersComponent } from './components/AllUsers/all-users/all-users.component';
import { BasketComponent } from './components/Basket/basket/basket.component';
import { MyMapComponent } from './components/Mymap/my-map/my-map.component';
import { RegistrationComponent } from './components/Registration/registration/registration.component';
import { SignUpComponent } from './components/Registration/sign-up/sign-up.component';
import { AllProductsComponent } from './components/AllProducts/all-products/all-products.component';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/HomePage/home-page/home-page.component';
import { EditUserComponent } from './components/AllUsers/edit-user/edit-user.component';
import { CreateOrderComponent } from './components/CreateOrder/create-order/create-order.component';
import { RouteComponent } from './components/Mymap/route/route.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'Home',
    component: HomePageComponent
  },
  {
    path: 'allProducts',
    component: AllProductsComponent
  },
  {
    path: 'Basket',
    component: BasketComponent
  },
  {
    path: 'AllOrders',
    component: AllOrdersComponent
  },
  {
    path: 'AllUsers',
    component: AllUsersComponent
  },
  {
    path: 'MyMap',
    component: MyMapComponent
  },
  {
    path: 'Account',
    component: AccountComponent
  },
  {
    path: 'Registration',
    component: RegistrationComponent
  },
  {
    path: 'SignIn',
    component: SignUpComponent
  },
  {
    path: 'AllUsers/edit/:id',
    component: EditUserComponent
  },
  {
    path: 'Basket/CreateOrder',
    component: CreateOrderComponent
  },
  {
    path: 'Route',
    component: RouteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppRoutingModule { }
