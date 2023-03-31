import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/models/account.model';
import { Orders } from 'src/app/models/orders-model.model';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';
@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
  orders: Orders[] = [ ];
  
  account: Account = {
    id: '',
    login: '',
    role: ''
  } 
  
  constructor(private orderService: OrdersService, private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void { //Получение всех заказов и вывод на страницу
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        console.log(orders);
        this.orders = orders;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  isDeliveryMan(): boolean{
    this.account = this.authService.getAccount();
    if(this.account.role == 'deliveryman'){
      return true;
    }
    else{
      return false;
    }
  }

  dontHaveExecutor(order: Orders): boolean{
    if(order.executor == null){
      return true;
    }
    else{
      return false;
    }
  }

  isyourId(order: Orders): boolean{
    if(order.executor == this.account.login){
      return true;
    }
    else{
      return false;
    }
  }

  isNotCompleted(order: Orders){
    if(order.status != 'Completed'){
      return true;
    }
    else {
      return false;
    }
  }

  completedOrder(order: Orders){
    this.orderService.changeOrderStatusToCompleted(order.id, order).subscribe({
      next: (response) => {
        this.ngOnInit();
      }
    })
  }

  takeToWork(order: Orders){
    order.executor = this.account.login;
    this.orderService.updateOrder(order.id, order)
    .subscribe({
      next: (response) => {
        this.ngOnInit();
      }
    });
  }

  showFullOrder(address: string){
    this.orderService.setAddress(address);
    this.router.navigate(['/MyMap']);
  }
}
