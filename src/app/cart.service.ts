import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
	cart: any = {};
	constructor() { 
		var jsonStr = localStorage.getItem('order_cart'), json = '{}';
		if (jsonStr == undefined) {
			this.updateStorage();
		}
		else if (jsonStr.length > 2) {
			json = JSON.parse(jsonStr);
			if (json) {
				this.cart = json;
			}
		}
	}
	setQuantity(productID, variantID, new_quantity) {
		var key = productID +'-' + variantID;
		if (new_quantity == 0 /* && this.cart[key] != undefined */) {
			delete this.cart[key];
			console.log('Deleted');
		}
		else {
			this.cart[key] = new_quantity;
		}
		this.updateStorage();
	}

	updateStorage() {
		localStorage.setItem('order_cart', JSON.stringify(this.cart));
	}
	clearCart() {
		this.cart = {};
		this.updateStorage();
	}
}
