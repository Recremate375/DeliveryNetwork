import { Injectable } from '@angular/core';
import { Products } from '../models/products-model.model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  products: Products[] = [];

  constructor() { }

  addToBasket(product: Products){
    this.products.push(product);
  }

  getItems(){
    return this.products;
  }

  clearCart(){
    this.products = [];
    return this.products;
  }
}
