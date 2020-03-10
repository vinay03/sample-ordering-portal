import { Component, OnInit } from '@angular/core';
import { CacheService } from '../cache.service';
import { CartService } from '../cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders-view',
  templateUrl: './orders-view.component.html',
  styles: []
})
export class OrdersViewComponent implements OnInit {

	id: number = 0;
	constructor(
		public cache: CacheService,
		public cart: CartService,
		private route: ActivatedRoute
	) {
		this.id = +this.route.snapshot.paramMap.get("id");
	}

	ngOnInit() {
		if (this.cache.loginState == 0) {
			this.cache.go('/login');
		}
		else {
			this.loadData();
		}
	}

	loaded: boolean = false;
	info: any = [];
	items: any = [];
	products: any = {};
	loadData() {
		this.loaded = false;
		this.cache.post('orders', {
			orderID: this.id
		}, (res) => {
			this.info = res.info;
			this.items = res.items;
			this.products = res.products;
			this.loaded = true;
		});
	}
	performAction(action) {
		this.cache.post('order/action', {
			orderID: this.id,
			action: action
		}, (res) => {
			this.loadData();
		});
	}
}
