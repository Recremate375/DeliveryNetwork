import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/models/users-model.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  editUser: Users = {
    id: '', 
    login: '',
    fio: '', 
    role: ''
  }

  constructor(private route: ActivatedRoute, private userService: UsersService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) =>{
        const id = params.get('id');

        if(id){
          this.userService.getUser(id)
          .subscribe({
            next: (response) =>{
              this.editUser = response;
            }
          })
        }
      }
    });
  }
  updateUser() {
    this.userService.updateUser(this.editUser.id, this.editUser)
    .subscribe({
      next: (response) => {
        this.router.navigate(['/AllUsers']);
      }
    });
  }
}
