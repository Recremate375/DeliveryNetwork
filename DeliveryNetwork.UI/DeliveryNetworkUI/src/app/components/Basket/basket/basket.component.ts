import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/products-model.model';
import { BasketService } from 'src/app/services/basket.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  products: Products[] = [];

  constructor(private orderService: OrdersService, private basketService: BasketService) { }

  ngOnInit(): void {
    this.products = this.basketService.getItems();
  }

}
