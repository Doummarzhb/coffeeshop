// import { Component } from '@angular/core';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { ToastModule } from 'primeng/toast';
// import { ButtonModule } from 'primeng/button';
// import { AuthDataService } from '../../services/auth-data.service';
// import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-menu',
//   standalone: true,
//   imports: [MatCardModule, MatButtonModule, ToastModule, ButtonModule, CommonModule,FormsModule],
//   template: `
//     <div *ngIf="userRole === 'admin'">
//       <h2>Admin Page</h2>
//       <p>Welcome, admin! You have full access to the system.</p>
//       <button (click)="showAddMenuItemForm = !showAddMenuItemForm">
//         {{ showAddMenuItemForm ? 'Cancel' : 'Add New Menu Item' }}
//       </button>
//       <div *ngIf="showAddMenuItemForm">
//         <form (ngSubmit)="addNewItem()">
//           <label for="name">Name:</label>
//           <input id="name" [(ngModel)]="newItem.name" name="name" required>
//           <label for="price">Price:</label>
//           <input id="price" [(ngModel)]="newItem.price" name="price" required>
//           <label for="description">Description:</label>
//           <input id="description" [(ngModel)]="newItem.description" name="description" required>
//           <label for="image">Image URL:</label>
//           <input id="image" [(ngModel)]="newItem.image" name="image" required>
//           <button type="submit">Add Item</button>
//         </form>
//       </div>
//     </div>

//     <div *ngIf="userRole === 'user'">
//       <h2>User Page</h2>
//       <p>Welcome, user! You have limited access.</p>
//     </div>

//     <ul>
//       <li *ngFor="let item of menuItems">
//         <mat-card>
//           <mat-card-header>
//             <mat-card-title>{{ item.name }}</mat-card-title>
//             <mat-card-subtitle>{{ item.price }}</mat-card-subtitle>
//           </mat-card-header>
//           <img mat-card-image [src]="item.image" alt="{{ item.name }}">
//           <mat-card-content>
//             <p>{{ item.description }}</p>
//           </mat-card-content>
//           <mat-card-actions>
//             <button mat-button routerLink="/cart" (click)="addToCart(item)">Add to Cart</button>
//           </mat-card-actions>
//         </mat-card>
//       </li>
//     </ul>
//   `,
//   styleUrls: ['./menu.component.css']
// })
// export class MenuComponent {
//   // userRole = 'user';
//   // userRole = 'admin';
//   userRole: string;
//   // let userRole: string;

//   showAddMenuItemForm = false;
//   newItem = { name: '', price: '', description: '', image: '' };

//   constructor(private auth_data_service: AuthDataService) {
//   const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
//   this.userRole = userData.role;
//   }

//   //static hayda eza bde yehon ybayno bde chil le tht loadMenuItems
//   items = [
//     { name: 'Coffee', price: '$15.00', description: 'Enjoy the rich and bold flavor of our premium coffee, made from the finest beans.', image: 'assets/imags/cup.jpg' },
//     { name: 'Tea', price: '$10.00', description: 'Savor the soothing aroma and delicate taste of our high-quality tea leaves.', image: 'assets/imags/cup.jpg' },
//     { name: 'Tea', price: '$10.00', description: 'Savor the soothing aroma and delicate taste of our high-quality tea leaves.', image: 'assets/imags/cup.jpg' },
//   ];
//   addToCart(item: any) {
//     this.auth_data_service.addToCart(item);
//   }

//   // addNewItem() {
//   //   this.menuItems.push({ ...this.newItem });
//   //   this.newItem = { name: '', price: '', description: '', image: '' };
//   //   this.showAddMenuItemForm = false;
//   // }
//   addNewItem() {
//     if (this.userRole === 'admin') {
//       this.menuItems.push({ ...this.newItem });
//       this.newItem = { name: '', price: '', description: '', image: '' };
//       this.showAddMenuItemForm = false;
//       this.loadMenuItems();
//     } else
//   //  this.userRole = 'user';
//     {
//       console.log("Only admins can add new items.");

//     }
//   }

//   ngOnInit() {
//     this.loadMenuItems();
//   }

//   //hayde mnchn yhafez ben admin w user
//   loadMenuItems() {
//     this.auth_data_service.getMenuItems().subscribe(items => {
//       this.menuItems = items;
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { AuthDataService } from '../../services/auth-data.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    ToastModule,
    ButtonModule,
    CommonModule,
    FormsModule,
  ],
  template: `
    <div *ngIf="userRole === 'admin'">
      <h2>Admin Page</h2>
      <p>Welcome, admin! You have full access to the system.</p>
      <button (click)="showAddMenuItemForm = !showAddMenuItemForm">
        {{ showAddMenuItemForm ? 'Cancel' : 'Add New Menu Item' }}
      </button>
      <div *ngIf="showAddMenuItemForm">
        <form (ngSubmit)="addNewItem()">
          <label for="name">Name:</label>
          <input id="name" [(ngModel)]="newItem.name" name="name" required />
          <label for="price">Price:</label>
          <input id="price" [(ngModel)]="newItem.price" name="price" required />
          <label for="description">Description:</label>
          <input
            id="description"
            [(ngModel)]="newItem.description"
            name="description"
            required
          />
          <label for="image">Image URL:</label>
          <input id="image" [(ngModel)]="newItem.image" name="image" required />
          <button type="submit">Add Item</button>
        </form>
      </div>
    </div>

    <!--user-->
    <div *ngIf="userRole === 'user'">
      <h2>User Page</h2>

      <p>Welcome, user! You have limited access.</p>
      <!-- <button (click)="sendRequest()">Send Request</button> -->
    </div>

    <ul>
      <li *ngFor="let item of items">
        <mat-card>
          <mat-card-header>
            <mat-card-title>{{ item.name }}</mat-card-title>
            <mat-card-subtitle>{{ item.price }}</mat-card-subtitle>
          </mat-card-header>
          <img mat-card-image [src]="item.image" alt="{{ item.name }}" />
          <mat-card-content>
            <p>{{ item.description }}</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button routerLink="/cart" (click)="addToCart(item)">
              Add to Cart
            </button>
          </mat-card-actions>
        </mat-card>
      </li>
    </ul>
  `,
  styleUrls: ['./menu.component.css'],
})

//change la klchi hon bs halaa saro bsayvo kellon ka localstoage
export class MenuComponent implements OnInit {
  userRole: string = '';
  showAddMenuItemForm = false;
  newItem = { name: '', price: '', description: '', image: '' };
  items: any[] = [];
  // router: any;

  constructor(private auth_data_service: AuthDataService) {
    // const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
    // this.userRole = userData.role || '';
  }
  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
    this.userRole = userData.role;
    // this.showWelcomeMessage();
    this.loadMenuItems(); //mnchn lamayfth safha ybyno le dafon
  }

  addNewItem() {
    if (this.userRole === 'admin') {
      this.items.push({ ...this.newItem });
      localStorage.setItem('menu_items', JSON.stringify(this.items));
      this.newItem = { name: '', price: '', description: '', image: '' };
      this.showAddMenuItemForm = false;
      this.loadMenuItems(); //mnchn new item w ybayno edema save
    } else {
      console.log('Only admins can add new items.');
    }
  }
  addToCart(item: any) {
    // if (this.userRole === 'user') {
    //   let cartItems = JSON.parse(localStorage.getItem('cart_items') || '[]');
    //   cartItems.push(item);
    //   localStorage.setItem('cart_items', JSON.stringify(cartItems));
    //   alert('Item added to cart successfully!');
    // } else {
    //   alert('Only users can add items to the cart!');
    // }
    this.auth_data_service.addToCart(item);
  }

  //la yhafez new item
  loadMenuItems() {
    const savedItems = localStorage.getItem('menu_items');
    if (savedItems) {
      this.items = JSON.parse(savedItems);
    } else {
      // kln bysayavo bel local storage
      this.auth_data_service.getMenuItems().subscribe((items) => {
        this.items = items;
        localStorage.setItem('menu_items', JSON.stringify(this.items));
      });
    }
  }
  // sendRequest() {
  //   if (this.userRole === 'user') {
  //     alert("Request sent successfully!");
  //   } else {
  //     alert("Only users can send requests!");
  //   }
  // }
}
