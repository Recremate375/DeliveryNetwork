import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Account } from 'src/app/models/account.model';
import { Orders } from 'src/app/models/orders-model.model';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  orders: Orders[] = [];
  account: Account = {
    id: '',
    login: '',
    role: ''
  }

  constructor(private jwtHepler: JwtHelperService, private router: Router,
    private authService: AuthService, private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.account = this.authService.getAccount();
    if(this.account.role == 'user'){
      this.isUser();
    }
    else if(this.account.role == 'deliveryman'){
      this.isDeliveryMan();
    }
  }

  isAdmin(){
    this.account = this.authService.getAccount();

    if(this.account.role == 'admin'){
      return true;
    }
    else {
      return false;
    }
  }

  isDeliveryMan(){
    this.ordersService.getOrdersForDeliveryMan(this.account.id).
    subscribe({
      next: (response) => {
        this.orders = response
      }
    });
  }

  isUser(){
    this.ordersService.getOrdersForUser(this.account.id).
    subscribe({
      next: (response) => {
        this.orders = response
      }
    });
  }

  public logout = () => {
    localStorage.removeItem("jwt");
    this.router.navigate(['']);
  }
}
