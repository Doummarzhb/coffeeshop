import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthDataService } from '../services/auth-data.service';
import { CommonModule } from '@angular/common';

interface NavLink{
  label: string;
  path: string;
  icon: string;
  roles: string[];
}
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  router: any;
  // userRole: string = '';
  @Input()
  navLinks!: NavLink[];
  @Input() userRole: string='';


  //sharing data from child to parent (nav -> app)
  @Output() buttonClick = new EventEmitter<string>();

//initialize a word to be alert bl app comp parent

  ngOnInit() {
    //the old back way
    // const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
    // this.userRole = userData.role;

    //get the role of each user or admin by calling the service getRole form  services
    this.userRole = this.auth_data_service.getRole()|| '';

    }
  constructor(public auth_data_service:AuthDataService){}

  onButtonClick(){
    this.buttonClick.emit('Button clicked  in NavComponent');
  }
}


