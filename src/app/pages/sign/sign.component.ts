
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthDataService } from '../../services/auth-data.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
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
  signupForm!: FormGroup;


  constructor(
    private router: Router,
    private auth_data_service: AuthDataService,
    private messageService: MessageService,
    private fb:FormBuilder
  ) { }

  ngOnInit():void{
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  onSignup(): void {
    if (this.signupForm.valid) {
      const { username, email, password } = this.signupForm.value;
      this.auth_data_service.onclick(username, email, password).subscribe({
        next: (response: any) => {
          if (response.error) {
            console.error('Signup error:', response.error);
            return;
          }
          // Assuming successful signup, redirect to login or home page
          this.router.navigate(['/home']);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Signup successful!' });
        },
        error: (error: any) => {
          console.error('Signup error:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Signup failed!' });
        }
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Form is not valid!' });
    }
  }
  // onclick(username: string, email: string, password: string): void {
  //   this.auth_data_service.onclick(username, email, password).subscribe({
  //     next: (response: any) => {
  //       if (response.error) {
  //         console.error('Login error:', response.error);
  //         return;
  //       }
  //       this.is_logged_in = true;
  //       this.userRole = response.isAdmin ? 'admin' : 'user';
  //       this.router.navigate([this.userRole === 'admin' ? '/home' : '/home']);
  //       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Reservation successful!' });
  //     },

  //     error: (error: any) => {
  //       console.error('Login error:', error);
  //       this.router.navigate(['/home']);
  //     }
  //   });
  // }

}
