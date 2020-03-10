import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, PipeTransform } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import bootstrap from "bootstrap";
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { OrdersComponent } from './orders/orders.component';
import { CacheService } from './cache.service';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from './cart.service';
import localeIN from "@angular/common/locales/en-IN";
import { registerLocaleData } from '@angular/common';
import { OrdersViewComponent } from './orders-view/orders-view.component';


@Pipe({
	name: "OrderStatus"
})
export class OrderStatusPipe implements PipeTransform {
	constructor() { }
	transform(value: any, args?: any): string {
		if (value == 'pending') { return 'Pending'; }
		else if (value == 'approved') { return 'Approved'; }
		else if (value == 'rejected') { return 'Rejected'; }
		else return value;
	}
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CatalogueComponent,
    OrdersComponent,
		OrdersViewComponent,
		OrderStatusPipe,
  ],
  imports: [
    BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule
  ],
  providers: [CacheService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }

registerLocaleData(localeIN, "IN");
