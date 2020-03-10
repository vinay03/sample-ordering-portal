import { Component, OnInit } from '@angular/core';
import { CacheService } from '../cache.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styles: []
})
export class CatalogueComponent implements OnInit {

  constructor(
		public cache: CacheService,
		public cart: CartService
	) { }

  ngOnInit() {
		if (this.cache.loginState == 0) {
			this.cache.go('/login');
		}
		else {
			this.loadData();
		}
	}
	
	products: any = [];
	loadData() {
		this.cache.post('products',{}, (res) => {
			this.products = res.products;
			this.calculateTotal();
		});
	}

	setQuantity(productID, variantID, quantity = 1) 
	{
		this.cart.setQuantity(productID, variantID, quantity)
		this.calculateTotal();
	}
	total: number = 0;
	calculateTotal() {
		this.total = 0;
		let key = '';
		for(let index1 in this.products)
		{
			for(let index2 in this.products[index1].variants)
			{
				key = this.products[index1].productID + '-' + this.products[index1].variants[index2].variantID;
				if(this.cart.cart[key] != undefined)
				{
					
					this.total += (this.products[index1].variants[index2].price * this.cart.cart[key]);
				}
			}
		}
	}

	clearCart() {
		this.cart.clearCart();
		this.calculateTotal();
	}

	submitError: string = '';
	submitSuccess: string = '';
	onSubmit() {
		this.submitError = '';
		this.submitSuccess = '';
		if(Object.keys(this.cart.cart).length == 0) {
			this.submitError = 'Your cart is empty.';
			return false;
		}

		this.cache.post('order/create', {
			cart: this.cart.cart
		}, (res) => {
			this.clearCart();
			this.submitSuccess = 'Order placed successfully.'
		});

	}
}
