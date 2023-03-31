import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Users } from '../models/users-model.model';
import { Observable } from 'rxjs';
import { CreateUsers } from '../models/create-user-model.model';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.baseApiUrl + '/api/Users');
  }

  addUser(user: CreateUsers): Observable<CreateUsers>{
    return this.http.post<CreateUsers>(this.baseApiUrl + '/api/Users', user);
  }

  getUser(id: string): Observable<Users>{
    return this.http.get<Users>(this.baseApiUrl + '/api/Users/' + id);
  }
  
  getUserRole(login: string): Observable<Users> {
    return this.http.get<Users>(this.baseApiUrl + '/api/Users/' + login);
  }
  updateUser(id: string, updateUserRequest: Users): Observable<Users> {
    return this.http.put<Users>(this.baseApiUrl + '/api/Users/' + id, updateUserRequest);
  }
  deleteUser(id: string): Observable<Users>{
    return this.http.delete<Users>(this.baseApiUrl + '/api/Users/' + id);
  }

  getAccountInformation(): Observable<Account> {
    return this.http.get<Account>(this.baseApiUrl + 'api/Users');
  }
}
