import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Products } from '../models/products-model.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Products[]>{
    return this.http.get<Products[]>(this.baseApiUrl + '/api/Products');
  }
}
