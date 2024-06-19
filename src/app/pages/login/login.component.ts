import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { AuthDataService } from '../../services/auth-data.service';

@Component({
  selector: 'app-login',
  // standalone: true,
  // imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public username: string = "";
  public password: string = "";
  messages: Message[] = [];
  public is_logged_in: boolean = false;
  public userRole: string = '';


  constructor(private router: Router, private auth_data_service: AuthDataService,private messageService: MessageService) { }


  onLogin(username: string, password: string): void {
    this.auth_data_service.login(username, password).subscribe({
      next: (response: any) => {
        if (response.error) {
          console.error('Login error:', response.error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Login failed!' });
          return;
        }
        this.is_logged_in = true;
        this.userRole = response.isAdmin ? 'admin' : 'user';
        this.router.navigate([this.userRole === 'admin' ? '/admin-dashboard' : '/user-dashboard']);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successful!' });
      },
      error: (error: any) => {
        console.error('Login error:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Login failed!' });
      }
    });
  }
}

