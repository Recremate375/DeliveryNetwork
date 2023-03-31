import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/models/products-model.model';
import { BasketService } from 'src/app/services/basket.service';
import { ProductsService } from 'src/app/services/products.service';
import { NotifierService } from 'angular-notifier/lib/services/notifier.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Account } from 'src/app/models/account.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  products: Products[] = [];

  account: Account = {
    id: '',
    login: '',
    role: ''
  }
  
  constructor(private productService: ProductsService,
     private basketService: BasketService, private jwtHelper: JwtHelperService,
     private authService: AuthService) {
      //this.notifier = notifierService;
      }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  addBasket(product: Products){
    this.basketService.addToBasket(product);
  }
  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if(token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    else {
      return false;
    }
  }

  isAdminOrDeliveryMan(): boolean{
    this.account = this.authService.getAccount();
    
    if(this.account.role == 'admin' || this.account.role == 'deliveryman')
    {
      return true;
    }
    else{
      return false;
    }
  }
}
