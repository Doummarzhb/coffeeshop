import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthDataService } from '../services/auth-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  router: any;
  userRole: string = '';

  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
    this.userRole = userData.role;
  }
  // userRole: string = '';
  // logout(){

  // }
  constructor(public auth_data_service:AuthDataService){}
}


