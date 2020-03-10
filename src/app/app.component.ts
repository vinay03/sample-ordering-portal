import { Component } from '@angular/core';
import { CacheService } from './cache.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(
		public cache: CacheService,
	) {
		
	}
	title = 'panel';

	onLogout() {
		this.cache.post('user/logout', {}, (res) => {
			this.cache.setLoggedOut();
			this.cache.go('/login');
		})
	}
}
