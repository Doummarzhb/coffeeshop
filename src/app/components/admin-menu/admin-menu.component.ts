// // admin-menu.component.ts
// import { Component } from '@angular/core';
// import { AuthDataService } from '../../services/auth-data.service';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// // import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-admin-menu',
//   templateUrl: './admin-menu.component.html',
//   styleUrls: ['./admin-menu.component.css'],
// })
// export class AdminMenuComponent {
//   itemName: string = '';
//   itemPrice: number = 0;
//   itemDescription: string = '';
//   itemImage: string = '';

//   constructor(private auth_data_service: AuthDataService ) { }

//   addItem(): void {
//     const newItem = {
//       name: this.itemName,
//       price: this.itemPrice,
//       description: this.itemDescription,
//       image: this.itemImage
//     };
//     this.auth_data_service.addItem(newItem).subscribe({
//       next: () => {
//         console.log('Item added successfully');
//         // Clear form fields after adding item
//         this.itemName = '';
//         this.itemPrice = 0;
//         this.itemDescription = '';
//         this.itemImage = '';
//       },
//       error: (error) => {
//         console.error('Error adding item:', error);
//       }
//     });
//   }
// }
