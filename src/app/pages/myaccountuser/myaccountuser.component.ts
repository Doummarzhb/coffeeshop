import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthDataService, User } from '../../services/auth-data.service';

@Component({
  selector: 'app-myaccountuser',
  templateUrl: './myaccountuser.component.html',
  styleUrls: ['./myaccountuser.component.css']
})
export class MyaccountuserComponent implements OnInit {
  username: User | null = null;
  editingEmail = false;
  newEmail = '';
  confirmPassword: string = '';
  newPassword: string = '';
  currentPassword: string = '';
  editingName = false;
  newName = '';

  constructor(private authDataService: AuthDataService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.username = this.authDataService.getCurrentUser();
  }

  editEmail(): void {
    if (this.username) {
      this.newEmail = this.username.email;
      this.editingEmail = true;
    }
  }

  saveEmail(): void {
    if (this.username) {
      this.username.email = this.newEmail;
      this.authDataService.saveUserToLocalStoragee(this.username, 'fake-token');
      this.editingEmail = false;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Email updated successfully!' });
    }
  }

  cancelEditEmail(): void {
    this.editingEmail = false;
  }

  // onFileSelected(event: any): void {
  //   const file: File = event.target.files[0];
  //   if (file) {
  //     this.uploadProfilePicture(file);
  //   }
  // }

  uploadProfilePicture(file: File): void {
    if (this.username) {
      const formData = new FormData();
      formData.append('profilePicture', file, file.name);

      this.authDataService.uploadProfilePicture(formData).subscribe(
        (response: any) => {
          console.log('Profile picture uploaded:', response);
          if (this.username) {
            this.username.profilePictureUrl = response.imageUrl;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile picture uploaded successfully!' });
          }
        },
        (error) => {
          console.error('Profile picture upload failed:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to upload profile picture!' });
        }
      );
    }
  }

  removeProfilePicture(): void {
    if (this.username) {
      this.authDataService.removeProfilePicture().subscribe(
        () => {
          if (this.username) {
            this.username.profilePictureUrl = '';
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile picture removed successfully!' });
          }
        },
        (error) => {
          console.error('Failed to remove profile picture:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to remove profile picture!' });
        }
      );
    }
  }
  // onFileSelected(event: any): void {
  //   const file: File = event.target.files[0];
  //   if (file) {
  //     this.uploadProfilePicture(file).subscribe(
  //       (response: any) => {
  //         console.log('Profile picture uploaded:', response);
  //         if (this.username) {
  //           this.username.profilePictureUrl = response.imageUrl; // Assuming API returns image URL
  //           this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile picture uploaded successfully!' });
  //         }
  //       },
  //       (error:any) => {
  //         console.error('Profile picture upload failed:', error);
  //         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to upload profile picture!' });
  //       }
  //     );
  //   }
  // }

//   changePassword(): void {
//     if (!this.username) {
//       return;
//     }
//     if (this.newPassword !== this.confirmPassword) {
//       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'New passwords do not match!' });
//       return;
//     }
//     this.authDataService.changePassword(this.username.email, this.currentPassword, this.newPassword).subscribe(
//       () => {
//         this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password updated successfully!' });
//         // Clear password fields after successful update if needed
//         this.currentPassword = '';
//         this.newPassword = '';
//         this.confirmPassword = '';
//       },
//       (error:any) => {
//         console.error('Failed to update password:', error);
//         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update password!' });
//       }
//     );
// }
editName(): void {
  if (this.username) {
    this.newName = this.username.username;
    this.editingName = true;
  }
}
saveName(): void {
  if (this.username) {
    this.username.username = this.newName;
    this.authDataService.saveUserToLocalStoragee(this.username, 'fake-token');
    this.editingName = false;
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Name updated successfully!' });
  }
}
cancelEditName(): void {
  this.editingName = false;
}
}
