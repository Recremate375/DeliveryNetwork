import { DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account.model';
import { CreateOrders } from 'src/app/models/create-order-model.model';
import { Orders } from 'src/app/models/orders-model.model';
import { Products } from 'src/app/models/products-model.model';
import { AuthService } from 'src/app/services/auth.service';
import { BasketService } from 'src/app/services/basket.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  i: number = 0;
  products: Products[] = [];
  order: CreateOrders = {
    products: '',
    address: '',
    status: '',
    dateOfStart: '',
    dateOfEnd: '',
    customer: '',
    executor: ''
  };
  account: Account = {
    id: '',
    login: '',
    role: '',
  }

  constructor(private orderService: OrdersService, private basketService: BasketService,
    private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.products = this.basketService.getItems();
    this.account = this.authService.getAccount();
  }

  prepareOrder(){

    this.order.customer = this.account.login;
    for(this.i = 0; this.i < this.products.length; this.i++){
      this.order.products += this.products[this.i].productName;
      this.order.products += " ";
    }
    console.log(this.order);
    this.createOrder();
  }

  createOrder() {
    this.orderService.AddOrder(this.order).
    subscribe({
      next: (request) => { // убрать историю заказов у админа 
        console.log(request); // У перевозчика историю заказов сделать по тем заказам, которые он уже выполнил (статус Completed)
      }
    });
    this.router.navigate(['/Home']);
  }
}
