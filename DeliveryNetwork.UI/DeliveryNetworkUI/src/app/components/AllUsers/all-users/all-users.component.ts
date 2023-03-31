import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/users-model.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  users: Users[] = [];
  
  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }
  deleteUser(id: string){
    this.usersService.deleteUser(id).subscribe({
      next: (response) => {
        this.ngOnInit();
      }
    })
  }
}
