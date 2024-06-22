import { Component, OnInit } from '@angular/core';
import { AuthDataService } from '../../services/auth-data.service';

@Component({
  selector: 'app-total-itemuser',
  templateUrl: './total-itemuser.component.html',
  styleUrl: './total-itemuser.component.css'
})
export class TotalItemuserComponent  implements OnInit{
  item: any[] = [];
  cartItems: any[] = [];
    total: number = 0;
  constructor(private auth_data_service:AuthDataService) { }
  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems() {
    this.auth_data_service.getUserCartItems().subscribe(
      (cartItems) => {
        this.cartItems = cartItems;
        this.calculateTotal();
      },
      (error) => {
        console.error('Error loading cart items:', error);
      }
    );
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((acc, curr) => {
      const price = parseFloat(curr.price);
      return !isNaN(price) ? acc + price : acc;
    }, 0);
  }
  addToAnotherCart(item: any) {
    this.auth_data_service.addToAnotherCart(item);
    this.loadCartItems();

  }
  removeFromCart(item: any) {
    this.auth_data_service.removeFromAnotherCart(item);
    this.loadCartItems();
  }

}
