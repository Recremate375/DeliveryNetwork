import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Account } from 'src/app/models/account.model';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {
  FirstPoint: string = 'Минск, ул. Гикало, 9';
  account: Account = {
    id: '',
    login: '',
    role: ''
  };
  stringArray: string[] = [];
  pathArray: string[] = [];
  i: number = 0;
  referencePoints: ymaps.IMultiRouteReferencePoint[] = [];
  constructor(private route: ActivatedRoute, private orderService: OrdersService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.account = this.authService.getAccount();
    this.orderService.getDeliveryManAddress(this.account.id).subscribe({
      next: (response) =>{
        console.log(response);
        this.pathArray = response;
        console.log(this.pathArray);
        this.createPath(this.pathArray);
      }
    });

  }

  createPath(paths: string[]) {
    let length = paths.length + 1;
    for(this.i = 0; this.i < length; this.i++){
      if(this.i == 0){
        this.stringArray.push(this.FirstPoint);
      }
      else{
        this.stringArray.push(paths[this.i - 1]);
      }
    }
    console.log(this.stringArray);
    this.referencePoints = this.stringArray;
    console.log(this.referencePoints);
  }
}
