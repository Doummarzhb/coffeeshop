import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];
  constructor() { }

  addToCart(item: any) {
    this.cart.push(item);
  }

  getCartItems() {
    return this.cart;
  }
}
