import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountComponent } from '../components/Account/account/account.component';
import { Account } from '../models/account.model';
import { Login } from '../models/login.model';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  baseApiUrl: string = environment.baseApiUrl;

  account: Account = {
    login: '',
    role: '',
    id: ''
  }

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) { }

  addToAccount(account: Account){
    this.account = account;
  }

  getAccount(){
    return this.account;
  }

  clearCart(){
    this.account = {login: '', role: '', id:''};
    return this.account;
  }
}
