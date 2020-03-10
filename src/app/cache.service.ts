import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

	loginState: number = -1;
	user: any = {};
	API_DOMAIN: string = 'http://127.0.0.1:8000/api/';
  constructor(
		public http: HttpClient,
		private router: Router,
		private route: ActivatedRoute
	) { 
		this.checkUser();
	}

	get(uri: string, callback = (res) => { }, errorCallback = (err) => {}) {
		this.http.get(this.API_DOMAIN + uri, {
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem("api_token"),
				'Accept': 'application/json',
			}
		})
		.subscribe((data: any) => {
			callback(data);
		}, (err) => {
			errorCallback(err);
		});
	}

	post(uri: string, postData: any = {}, callback = (res) => { }, errorCallback = (err) => { } )
	{
		postData['api_token'] = localStorage.getItem("api_token");
		this.http.post(this.API_DOMAIN + uri, postData, {
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem("api_token"),
				'Accept': 'application/json',
			}
		})
		.subscribe((data: any) => {
			callback(data);
		}, (err) => {
			errorCallback(err);
		});
	}

	checkUser() {
		this.post('user', {}, (data: any) => {
			if (data.user == null) {
				this.loginState = 0;
			}
			else {
				this.loginState = 1;
				this.setUser(data.user);
			}
		}, (err) => {
				this.loginState = 0;
		});
	}
	
	
	setUser(user) {
		this.user = user;
		localStorage.setItem("api_token", user.api_token);
	}

	setLoggedOut() {
		this.loginState = 0;
		this.user = {};
		localStorage.setItem("api_token", '');
	}

	go(route: string) {
		this.router.navigate([route], { relativeTo: this.route });
	}


	
}
