import { Component, OnInit } from '@angular/core';
import { CacheService } from '../cache.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: []
})
export class OrdersComponent implements OnInit {

	constructor(
		public cache: CacheService,
		public cart: CartService
		) { 
	}

  ngOnInit() {
		if (this.cache.loginState == 0) {
			this.cache.go('/login');
		}
		else {
			this.loadData();
		}
	}
	list: any = [];
	loadData() {
		this.cache.post('orders', {}, (res) => {
			this.list = res.list;
		});
	}

}
