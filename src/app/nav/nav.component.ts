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
  // logout(){

  // }
  constructor(public auth_data_service:AuthDataService){}
}


