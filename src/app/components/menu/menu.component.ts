

import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { AuthDataService } from '../../services/auth-data.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
// import { FilterPipe } from '../../pipes/filter.pipe';
import { FilterModule } from '../../pipes/filter/filter.module';
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
    FilterModule

  ],
  template: `
 <!-- <div *ngIf="userRole === 'admin'">
      <h2>Admin Page</h2>
      <p>Welcome, admin! You have full access to the system.</p>
      <button (click)="showAddMenuItemForm = !showAddMenuItemForm">
        {{ showAddMenuItemForm ? 'Cancel' : 'Add New Menu Item' }}
      </button>
      <input type="text" [(ngModel)]="searchTerm" placeholder="Search items..." />
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



    <div *ngIf="userRole !== 'user'">

    </div>



    <ul> //notess for search mnchn barka bde 3adel
  <li *ngFor="let item of items | filter: searchText">{{ item.name }}</li>
</ul> -->

    <!-- <ul>
      <li *ngFor="let item of items | filter:searchTerm ; let i = index">
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
            <button mat-button color="warn" (click)="deleteItem(i)">
          Delete
        </button>
          </mat-card-actions>
        </mat-card>
      </li>
    </ul>
    <ul> -->
    <div *ngIf="userRole === 'admin'">
  <!-- <h2>Admin Page</h2>
  <p>Welcome, admin! You have full access to the system.</p> -->
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
      <input id="description" [(ngModel)]="newItem.description" name="description" required />
      <label for="image">Image URL:</label>
      <input id="image" [(ngModel)]="newItem.image" name="image" required />
      <button type="submit">Add Item</button>
    </form>
  </div>
</div>

<ul>
  <li *ngFor="let item of items | filter:searchTerm; let i = index">
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
        <button mat-button color="warn" (click)="deleteItem(i)">
          Delete
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
deleteUser(arg0: any) {
throw new Error('Method not implemented.');
}
  userRole: string = '';
  showAddMenuItemForm = false;
  newItem = { name: '', price: '', description: '', image: '' };
  items: any[] = [];
  cartItems: any[] | undefined;
  searchTerm: string = '';
  // router: any;

  constructor(private auth_data_service: AuthDataService) {

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
    this.auth_data_service.addToCart(item);
    this.loadCartItems();
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


  //mnshn yzharo itemcart hayde method for cartItem
  loadCartItems() {
    this.auth_data_service.getCartItems().subscribe((cartItems) => {
      this.cartItems = cartItems;
    });
  }
  deleteItem(index: number) {
    if (this.userRole === 'admin') {
      this.items.splice(index, 1);
      localStorage.setItem('menu_items', JSON.stringify(this.items));
    } else {
      console.log('Only admins can delete items.');
    }
  }
}
