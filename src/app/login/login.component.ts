import { Component, OnInit } from '@angular/core';
import { CacheService } from '../cache.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(
		public cache: CacheService
	) { 
	}

  ngOnInit() {
		if(this.cache.loginState == 1) {
			this.redirectUser();
		}
	}
	
	form: any = {
		email: "",
		password: "",
	};
	onLogin() {
		this.cache.post('user/login', {
			...this.form
		}, (data: any) => {
			if (data.response != undefined && data.response == true)
			{
				this.cache.loginState = 1;
				this.cache.setUser(data.user);
				this.redirectUser();
			}
		});
	}

	checkUser() {
		this.cache.get('user', (data: any) => {
			if (data.user == null) {
				this.cache.loginState = 0;
			}
			else {
				this.cache.loginState = 1;
				this.cache.setUser(data.user);
				this.redirectUser();
			}
		});
	}

	redirectUser() {
		if (this.cache.user.role == 'admin') {
			this.cache.go('/orders');
		}
		else {
			this.cache.go('/catalogue');
		}
	}

}
