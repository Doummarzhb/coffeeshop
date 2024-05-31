// // import { Component } from '@angular/core';
// // import { AuthDataService } from '../../services/auth-data.service';
// // import { Router } from '@angular/router';

// // @Component({
// //   selector: 'app-sign',
// //   standalone: true,
// //   imports: [ ],
// //   templateUrl: './sign.component.html',
// //   styleUrl: './sign.component.css'
// // })
// // export class SignComponent {
// //   public email: string = "";
// //   public username: string = "";
// //   public password: string = "";
// //   public is_logged_in: boolean = false;
// //   constructor(private router: Router, private auth_data_service: AuthDataService) { }

// //   onclick(username:string,email:string,password:string): void {
// //     this.auth_data_service.onclick(username,email,password).subscribe({
// //       next: (_response: any) => {
// //         if (this.auth_data_service.isAdmin) {
// //           this.router.navigate(["./admin"]); //le heye enu yraje3ne 3al home kamen
// //         } else {
// //           this.is_logged_in = true;
// //           this.router.navigate(["./home"]);
// //         }
// //         // this.is_logged_in = true;
// //         // this.router.navigate(["./home"]);
// //       },
// //   }
// // )}
// // }
// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthDataService } from '../../services/auth-data.service';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-sign',
//   standalone: true,
//   templateUrl: './sign.component.html',
//   styleUrls: ['./sign.component.css'],
//   imports: [FormsModule],
// })
// export class SignComponent {
//   public email: string = "";
//   public username: string = "";
//   public password: string = "";
//   public is_logged_in: boolean = false;
//   public userRole: string = '';

//   constructor(private router: Router, private auth_data_service: AuthDataService) { }

//   onclick(username: string, email: string, password: string): void {
//     this.auth_data_service.onclick(username, email, password).subscribe({
//       next: (response: any) => {
//         this.is_logged_in = true;
//         this.userRole = this.auth_data_service.isAdmin ? 'admin' : 'user';
//         this.router.navigate([this.userRole === 'admin' ? '/menu' : './home']);
//       },
//       error: (error: any) => {
//         console.error('Login error:', error);
//       }
//     });
//   }
// }
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthDataService } from '../../services/auth-data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign',
  standalone: true,
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css'],
  imports: [FormsModule],
})
export class SignComponent {
  public email: string = "";
  public username: string = "";
  public password: string = "";
  public is_logged_in: boolean = false;
  public userRole: string = '';


  constructor(private router: Router, private auth_data_service: AuthDataService) { }

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
  //     },
  //     error: (error: any) => {
  //       console.error('Login error:', error);
  //     }
  //   });
  // }

  onclick(_username: string, _email: string, _password: string) {
    this.auth_data_service.onclick(this.username, this.email, this.password,)
      .subscribe(response => {
        if (response.success) {
          localStorage.setItem('user_data', JSON.stringify({ role: this.userRole }));
          if (this.userRole === '') {
            this.router.navigate(['/home']);
          } else if (this.userRole === 'admin') {
            this.router.navigate(['/home']);
          }
        } else {
          console.error('Signup failed:', response.error);
        }
      });
  }

}

