import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { Account } from 'src/app/models/account.model';
import { decodeToken } from 'src/app/models/decodeToken';
import { Users } from 'src/app/models/users-model.model';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  baseApiUrl: string = environment.baseApiUrl
  invalidLogin?: boolean;

  decodeToken: decodeToken = {
    aud: '',
    email: '',
    exp: 0,
    iss: '',
    role: '',
    sub: ''
  }

  account: Account = {
    id: '',
    login: '',
    role: ''
  }

  constructor(private router: Router, private http: HttpClient,
    private jwtHepler: JwtHelperService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  public login = (form: NgForm) => {
    const credentials = JSON.stringify(form.value);
    console.log(credentials);
    this.http.post(this.baseApiUrl + '/api/Authentication', credentials, {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      })
    }).subscribe(response => {
      const token = (<any>response).token;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      this.addAccountInformation(token);
    }, err => {
      this.invalidLogin = true;
    });
  }

  addAccountInformation(token: string){
    this.decodeToken = this.jwtHepler.decodeToken(token);
    console.log(this.decodeToken);
    this.account = {
      id: this.decodeToken.sub,
      login: this.decodeToken.email,
      role: this.decodeToken.role
    };
    this.authService.addToAccount(this.account);
    this.router.navigate([""]);
  }

  isUserAutenticated(){
    const token = localStorage.getItem("jwt");
    if(token && !this.jwtHepler.isTokenExpired(token)){
      return true;
    }
    else{
      return false;
    }
  }
}
