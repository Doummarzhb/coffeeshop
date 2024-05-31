import { Component } from '@angular/core';
import { AuthDataService } from './services/auth-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  // isLoggedIn = false;

  // constructor(private auth_data_service: AuthDataService, private router: Router) {
  //   this.isLoggedIn = !!localStorage.getItem('auth_token');
  // }

  // logout() {
  //   this.auth_data_service.logout();
  //   this.isLoggedIn = false;
  //   this.router.navigate(['/sign']);
  // }
}
