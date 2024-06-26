import { Component } from '@angular/core';
import { AuthDataService } from './services/auth-data.service';
import { Router } from '@angular/router';

interface NavLink{
  label: string;
  path: string;
  icon: string;
  roles: string[];
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  userRole:string = 'admin';


  navLinks: NavLink[]=[
    { label: 'Home', path: '/home', icon: 'pi pi-home', roles: ['admin', 'user'] },
    { label: 'Menu', path: '/menu', icon: 'pi pi-face-smile', roles: ['admin', 'user'] },
    { label: 'Reservation', path: '/reservation', icon: 'pi pi-eye', roles: ['user'] },
    { label: 'Contact', path: '/contact', icon: 'pi pi-address-book', roles: ['user'] },
    { label: 'Feedback', path: '/feedback', icon: 'pi pi-address-book', roles: ['admin'] },
    { label: 'SignUp', path: '../sign', icon: 'pi pi-user', roles: ['admin', 'user'] },
    { label: 'Manage Reservations', path: '/manage-reservations', icon: 'pi pi-user', roles: ['admin'] },
    { label: 'Cart Admin', path: '/cartadmin', icon: 'pi pi-shopping-cart', roles: ['admin'] },
    { label: 'My Cart', path: '/total-itemuser', icon: 'pi pi-shopping-cart', roles: ['user'] },
    { label: 'My Account', path: '/myaccountuser', icon: 'pi pi-eye', roles: ['user'] }
  ];

  onButtonClick(message: string){
    console.log(message);
  }
}
