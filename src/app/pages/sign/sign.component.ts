
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthDataService } from '../../services/auth-data.service';
import { FormsModule } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css'],

})
export class SignComponent {
  public email: string = "";
  public username: string = "";
  public password: string = "";
  public is_logged_in: boolean = false;
  public userRole: string = '';
  messages: Message[] = [];

  constructor(private router: Router, private auth_data_service: AuthDataService,private messageService: MessageService) { }

  onclick(username: string, email: string, password: string): void {
    this.auth_data_service.onclick(username, email, password).subscribe({
      next: (response: any) => {
        if (response.error) {
          console.error('Login error:', response.error);
          return;
        }
        this.is_logged_in = true;
        this.userRole = response.isAdmin ? 'admin' : 'user';
        this.router.navigate([this.userRole === 'admin' ? '/home' : '/home']);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Reservation successful!' });
      },

      error: (error: any) => {
        console.error('Login error:', error);
        this.router.navigate(['/home']);
      }
    });
  }

  // onclick(_username: string, _email: string, _password: string) {
  //   this.auth_data_service.onclick(this.username, this.email, this.password,)
  //     .subscribe(response => {
  //       if (response.success) {
  //         localStorage.setItem('user_data', JSON.stringify({ role: this.userRole }));
  //         if (this.userRole === '') {
  //           this.router.navigate(['/home']);
  //         } else if (this.userRole === 'admin') {
  //           this.router.navigate(['/home']);
  //         }
  //       } else {
  //         console.error('Signup failed:', response.error);
  //       }
  //     });
  // }

}
  // standalone: true,
 // imports: [FormsModule],
