import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUsers } from 'src/app/models/create-user-model.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  
  newUser: CreateUsers = {
    login: '', 
    password: '',
    name: '',
    surname: '', 
    lastname: '',
    passport: ''
  };

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  addUser() {
    this.usersService.addUser(this.newUser)
    .subscribe({
      next: (user) => {
        console.log(user);
      }
    })
    this.router.navigate(['/Home']);
  }
}
