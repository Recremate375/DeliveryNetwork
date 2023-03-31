import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponent } from './components/Account/account/account.component';
import { AllOrdersComponent } from './components/AllOrders/all-orders/all-orders.component';
import { AllProductsComponent } from './components/AllProducts/all-products/all-products.component';
import { AllUsersComponent } from './components/AllUsers/all-users/all-users.component';
import { BasketComponent } from './components/Basket/basket/basket.component';
import { MyMapComponent } from './components/Mymap/my-map/my-map.component';
import { RegistrationComponent } from './components/Registration/registration/registration.component';
import { SignUpComponent } from './components/Registration/sign-up/sign-up.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomePageComponent } from './components/HomePage/home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EditUserComponent } from './components/AllUsers/edit-user/edit-user.component';
import { NotifierModule } from 'angular-notifier';
import { CreateOrderComponent } from './components/CreateOrder/create-order/create-order.component';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { RouteComponent } from './components/Mymap/route/route.component';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

const mapConfig: YaConfig = {
  apikey: 'Insert your key',
}

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    AllOrdersComponent,
    AllProductsComponent,
    AllUsersComponent,
    BasketComponent,
    MyMapComponent,
    RegistrationComponent,
    SignUpComponent,
    HomePageComponent,
    EditUserComponent,
    CreateOrderComponent,
    RouteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularYandexMapsModule.forRoot(mapConfig),
    NgbModule,
    HttpClientModule,
    FormsModule,
    NotifierModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost: 5224"]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
