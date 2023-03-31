import { Component } from '@angular/core';
import { Router, RouteReuseStrategy } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Account } from './models/account.model';
import { Users } from './models/users-model.model';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DeliveryNetworkUI';

  account: Account = {
    id: '',
    login: '',
    role: ''
  }
  

  constructor(private jwtHelper: JwtHelperService, private router: Router,
    private authService: AuthService) {
      
     }

  ngOnInit(): void {

  }

  isAdmin(): boolean{
    this.account = this.authService.getAccount();

    if(this.account.role == 'admin'){
      return true;
    }
    else {
      return false;
    }
  }

  isDeliveryMan(): boolean{
    this.account = this.authService.getAccount();

    if(this.account.role == 'deliveryman'){
      return true;
    }
    else {
      return false;
    }
  }

  isAdminOrDeliveryMan(): boolean{
    this.account = this.authService.getAccount();
    
    if(this.account.role == 'admin' || this.account.role == 'deliveryman')
    {
      return true;
    }
    else{
      return false;
    }
  }

  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if(token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    else {
      return false;
    }
  }
}
