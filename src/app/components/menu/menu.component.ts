import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { AuthDataService } from '../../services/auth-data.service';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FilterModule } from '../../pipes/filter/filter.module';
import { Router } from '@angular/router';

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
    FilterModule,
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  userRole: string = '';
  showAddMenuItemForm = false;
  newItem = { name: '', price: '', description: '', image: '' };
  items: any[] = [];
  cartItems: any[] =[];
  searchTerm: string = '';
  editingIndex: number | null = null;
  editingItem = { name: '', price: '', description: '', image: '' };
  filteredItems: any[] = this.items;
  total: any;

  constructor(
    private auth_data_service: AuthDataService,
    @Inject(Router) private router: Router
  ) {}

  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
    this.userRole = userData.role;
    this.loadMenuItems();
  }

  addNewItem() {
    if (this.userRole === 'admin') {
      this.items.push({ ...this.newItem });
      localStorage.setItem('menu_items', JSON.stringify(this.items));
      this.newItem = { name: '', price: '', description: '', image: '' };
      this.showAddMenuItemForm = false;
    } else {
      console.log('Only admins can add new items.');
    }
  }

  deleteItem(index: number) {
    if (this.userRole === 'admin') {
      this.items.splice(index, 1);
      localStorage.setItem('menu_items', JSON.stringify(this.items));
    } else {
      console.log('Only admins can delete items.');
    }
  }

  editItem(index: number) {
    if (this.userRole === 'admin') {
      this.editingIndex = index;
      this.editingItem = { ...this.items[index] };
    } else {
      console.log('Only admins can edit items.');
    }
  }

  updateItem() {
    if (this.userRole === 'admin' && this.editingIndex !== null) {
      this.items[this.editingIndex] = { ...this.editingItem };
      localStorage.setItem('menu_items', JSON.stringify(this.items));
      this.cancelEdit();
    } else {
      console.log('Only admins can update items.');
    }
  }

  cancelEdit() {
    this.editingIndex = null;
    this.editingItem = { name: '', price: '', description: '', image: '' };
  }

  loadMenuItems() {
    const savedItems = localStorage.getItem('menu_items');
    if (savedItems) {
      this.items = JSON.parse(savedItems);
    } else {
      this.auth_data_service.getMenuItems().subscribe((items) => {
        this.items = items;
        localStorage.setItem('menu_items', JSON.stringify(this.items));
      });
    }
  }

  addToCart(item: any) {
    this.auth_data_service.addToCart(item);
    this.loadCartItems();
    this.router.navigate(['/reservation']);
  }

  loadCartItems() {
    this.auth_data_service.getCartItems().subscribe((cartItems) => {
      this.cartItems = cartItems;
    });
  }

  buyNow(item: any): void {
    this.auth_data_service.buyNow(item).subscribe((response) => {
      if (response.success) {
        console.log('Purchase successful:', response.purchase);
      } else {
        console.error('Purchase failed:', response.message);
      }
    });
  }

  applyFilter(): void {
    if (!this.searchTerm) {
      this.filteredItems = this.items;
    } else {
      this.filteredItems = this.items.filter(item =>
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  // private calculateTotal() {
  //   this.total = this.items.reduce((acc, curr) => acc + parseFloat(curr.price), 0);
  // }


  addToAnotherCart(item: any){
    this.auth_data_service.addToAnotherCart(item);

    this.calculateTotal();
  }
  calculateTotal() {
    this.total = this.cartItems.reduce((acc, curr) => {
      const price = parseFloat(curr.price);
      return !isNaN(price) ? acc + price : acc;
    }, 0);
  }
}
