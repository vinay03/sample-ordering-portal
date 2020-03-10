import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { OrdersComponent } from './orders/orders.component';
import { OrdersViewComponent } from './orders-view/orders-view.component';

const routes: Routes = [
	{ path: "", redirectTo: "login", pathMatch: "full" },
	{ path: "login", component: LoginComponent },
	{ path: "catalogue", component: CatalogueComponent },
	{ path: "orders", component: OrdersComponent },
	{ path: "orders/:id", component: OrdersViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
