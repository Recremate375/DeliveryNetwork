import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/products-model.model';
import { BasketService } from 'src/app/services/basket.service';
import { OrdersService } from 'src/app/services/orders.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  products: Products[] = [];

  constructor(private jwtHelper: JwtHelperService, private router: Router,
    private orderService: OrdersService, private basketService: BasketService) { }

  ngOnInit(): void {
    this.products = this.basketService.getItems();
  }

  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if(token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

}
