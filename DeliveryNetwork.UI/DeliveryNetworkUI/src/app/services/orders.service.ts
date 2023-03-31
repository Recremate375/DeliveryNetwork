import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateOrders } from '../models/create-order-model.model';
import { Orders } from '../models/orders-model.model';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  baseApiUrl: string = environment.baseApiUrl;

  address: string = '';

  constructor(private http: HttpClient) { }

  setAddress(Address: string){
    this.address = Address;
  }

  getAddress(): string {
    return this.address;
  }

  getAllOrders(): Observable<Orders[]> {
    return this.http.get<Orders[]>(this.baseApiUrl + '/api/Orders');
  }
  AddOrder(order: CreateOrders): Observable<CreateOrders>{
    return this.http.post<CreateOrders>(this.baseApiUrl + '/api/Orders', order);
  }
  getDeliveryManAddress(id: string): Observable<string[]>{
    return this.http.get<string[]>(this.baseApiUrl + '/api/Orders/GetAllPathsForMan/' + id);
  }
  getOrdersForUser(id: string): Observable<Orders[]>{
    return this.http.get<Orders[]>(this.baseApiUrl + '/api/Orders/' + id);
  }
  getOrdersForDeliveryMan(id: string): Observable<Orders[]>{
    return this.http.get<Orders[]>(this.baseApiUrl + '/api/Orders/GetAllOrdersForDeliveryMan/' + id);
  }
  changeOrderStatusToCompleted(id: string, updateUserRequest: Orders): Observable<Orders> {
    return this.http.put<Orders>(this.baseApiUrl + '/api/Orders/CompleteOrder/' + id, updateUserRequest);
  }
  updateOrder(id: string, updateUserRequest: Orders): Observable<Orders> {
    return this.http.put<Orders>(this.baseApiUrl + '/api/Orders/' + id, updateUserRequest);
  }
}
