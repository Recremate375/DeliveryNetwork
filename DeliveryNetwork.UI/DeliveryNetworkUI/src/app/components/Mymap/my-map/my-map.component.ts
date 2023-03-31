import { Component, getNgModuleById, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrls: ['./my-map.component.css']
})
export class MyMapComponent implements OnInit {
  FirstPoint: string = 'Минск, ул. Гикало, 9';
  SecondPoint: string = 'Минск, пр. Независимости, 65';
  referencePoints: ymaps.IMultiRouteReferencePoint[] = [];
  constructor(private route: ActivatedRoute, private orderService: OrdersService) { }

  ngOnInit(): void {
    this.SecondPoint = this.orderService.getAddress();
    this.referencePoints = [this.FirstPoint, this.SecondPoint];
  }

}
