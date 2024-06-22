import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class AuthDataService {
  // private purchasesSubject = new BehaviorSubject<any[]>(this.getStoredPurchases());


  private currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));


  private purchaseInfoSubject = new BehaviorSubject<any[]>(JSON.parse(localStorage.getItem('purchases') || '[]'));


  private reservations: any[] = JSON.parse(localStorage.getItem('reservations') || '[]');

  username = '';
  email = '';
  password = '';


  //if we have backend this is the api for it
  private purchaseInfo = new BehaviorSubject<any[]>([]);
  private apiUrl = 'http://localhost:3000/users';
  // private users = [
  //   { username: '', email: '', password: '' }
  // ];
  // private users: any[] = [];
  private currentUser: any = null;
  // private user: any = null;
  public isAdmin: boolean = false;
  // private user: any = null;
  // private apiUrl = 'http://localhost:3000/items'; //hayda api khla2to
  private httpOptions = {
    headers: { 'Content-Type': 'application/json' },
  };

  router: any;
  isLoggedIn = false;
  // private currentUser: any = null;
  constructor(private http: HttpClient) {

  }

  onclick(username: string, email: string, password: string): Observable<any> {
    const isAdmin = username === 'admin' && email === 'admin@example.com' && password === 'admin123';

    if (isAdmin) {
      this.currentUser = { username, email, role: 'admin' };
      this.isAdmin = true;
      const token = this.generateAuthToken(username, email);
      localStorage.setItem('auth_token', 'fake-token');
      localStorage.setItem('user_data', JSON.stringify(this.currentUser));

      return of({
        isAdmin: true,
        data: { token: 'fake-token', userData: this.currentUser }
      });
    } else {
      const storedUsers = JSON.parse(localStorage.getItem('stored_users') || '[]');
      const foundUser = storedUsers.find((user: any) => user.username === username && user.email === email && user.password === password);

      if (foundUser) {
        this.currentUser = { ...foundUser, role: 'user' };
        this.isAdmin = false;
        const token = this.generateAuthToken(username, email);
        localStorage.setItem('auth_token', 'fake-token');
        localStorage.setItem('user_data', JSON.stringify(this.currentUser));

        return of({
          isAdmin: false,
          data: { token: 'fake-token', userData: this.currentUser }
        });
      } else {
        storedUsers.push({ username, email, password, role: 'user' });
        localStorage.setItem('stored_users', JSON.stringify(storedUsers));

        this.currentUser = { username, email, role: 'user' };
        this.isAdmin = false;
        localStorage.setItem('auth_token', 'fake-token');
        localStorage.setItem('user_data', JSON.stringify(this.currentUser));

        return of({
          isAdmin: false,
          data: { token: 'fake-token', userData: this.currentUser }
        });
      }
    }
  }
  private generateAuthToken(username: string, email: string): string {
    return `${username}:${email}`;
  }
  private saveUserToLocalStorage(user: any, token: string): void {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_data', JSON.stringify(user));
    localStorage.setItem('username', user.username);
    // localStorage.setItem('email', user.email);
    localStorage.setItem('auth_token', 'fake-token');

  }

  getRole(): string | null {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData).role : null;
  }

  addToCart(item: any) {
    if (this.getRole() !== 'admin') {
      let cartItems = JSON.parse(localStorage.getItem('cart_items') || '[]');
      cartItems.push(item);
      localStorage.setItem('cart_items', JSON.stringify(cartItems));
      // alert('Item added to cart successfully!');
      this.submitReservation({ user: this.currentUser, item }).subscribe(
        (response) => {
          console.log('Reservation successful:', response);
          // Navigate to reservation page
          this.router.navigateByUrl('/reservation');
        },
        (error) => {
          console.error('Reservation failed:', error);
        }
      );
    } else {
      alert('Admins cannot add items to the cart.');
      return;
    }
  }


    // const currentUser = this.getCurrentUser();
    // const cartItems = JSON.parse(localStorage.getItem('cart_items') || '[]');
    // const userCartItems = cartItems.filter((item: any) => item.username === currentUser.username);
    // return of(userCartItems);


  getMenuItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/items`).pipe(
      catchError((error) => {
        console.error('Get items error:', error);
        return of([]);
      })
    );
  }
  getUsername(): string | null {
    const userData = localStorage.getItem('user_data');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      return parsedUserData.username;
    }
    return null;
  }

  getCurrentUser(): any {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  }






  deleteReservation(reservationId: number): Observable<void> {
    this.reservations = this.reservations.filter(r => r.id !== reservationId);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
    return of();
  }

  submitReservation(reservationData: any): Observable<any> {
    this.reservations.push(reservationData);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
    return of({ success: true, reservation: reservationData });
  }

  getReservations(): Observable<any[]> {
    return of(this.reservations);
  }

  submitFeedback(feedbackData: any): void {
    const storedFeedback = localStorage.getItem('feedbackList');
    const feedbackList = storedFeedback ? JSON.parse(storedFeedback) : [];
    feedbackList.push(feedbackData);
    localStorage.setItem('feedbackList', JSON.stringify(feedbackList));
  }

  getFeedback(): any[] {
    const storedFeedback = localStorage.getItem('feedbackList');
    return storedFeedback ? JSON.parse(storedFeedback) : [];
  }

  buyNow(item: any): Observable<any> {
    const currentUser = this.getCurrentUser();
    const purchase = {
      username: currentUser.username,
      name: item.name,
      description: item.description,
      price: item.price,
      id: new Date().getTime()
    };

    const currentPurchases = JSON.parse(localStorage.getItem('purchases') || '[]');
    currentPurchases.push(purchase);
    localStorage.setItem('purchases', JSON.stringify(currentPurchases));

    return of({ success: true, purchase });
  }





  getSelectedUserItem(): Observable<any> {
    return this.http.get<any>('api/user/item');
  }

  getSelectedAdminItem(): Observable<any> {
    return this.http.get<any>('api/admin/item');
  }
  storePurchase(purchase: any): void {
    let purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
    purchases.push(purchase);
    localStorage.setItem('purchases', JSON.stringify(purchases));
  }


  private getStoredPurchases(): any[] {
    return JSON.parse(localStorage.getItem('purchases') || '[]');
  }


  getPurchases(): Observable<any[]> {
    const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
    this.purchaseInfoSubject.next(purchases);
    return this.purchaseInfoSubject.asObservable();
  }


  deletePurchase(purchaseId: number): Observable<void> {
    const currentPurchases = this.purchaseInfoSubject.value;
    const updatedPurchases = currentPurchases.filter(p => p.id !== purchaseId);
    this.purchaseInfoSubject.next(updatedPurchases);
    localStorage.setItem('purchases', JSON.stringify(updatedPurchases));
    return of();
  }

login(username: string, password: string): Observable<any> {
  const isAdmin = username === 'admin' && password === 'admin123';

  if (isAdmin) {
    this.currentUser = { username, role: 'admin' };
    this.isAdmin = true;
    const token = this.generateAuthToken(username, 'admin@example.com');
    localStorage.setItem('user_data', JSON.stringify(this.currentUser));
    localStorage.setItem('auth_token', 'fake-token');

    return of({
      isAdmin: true,
      data: { token: 'fake-token', userData: this.currentUser }
    });
  } else {
    const storedUsers = JSON.parse(localStorage.getItem('stored_users') || '[]');
    const foundUser = storedUsers.find((user: any) => user.username === username && user.password === password);

    if (foundUser) {
      this.currentUser = { ...foundUser };
      this.isAdmin = false;
      const token = this.generateAuthToken(username, foundUser.email);
      localStorage.setItem('user_data', JSON.stringify(this.currentUser));
      localStorage.setItem('auth_token', 'fake-token');

      return of({
        isAdmin: false,
        data: { token: 'fake-token', userData: this.currentUser }
      });
    } else {
      return of({ error: 'Invalid username or password' });
    }
  }
}

addToAnotherCart(item: any) {
  const currentUser = this.getCurrentUser();
  if (!currentUser || !currentUser.username) {
    console.error('User not logged in');
    return;
  }
  let cartItems = JSON.parse(localStorage.getItem(currentUser.username + '_cart_items') || '[]');
  cartItems.push(item);
  localStorage.setItem(currentUser.username + '_cart_items', JSON.stringify(cartItems));
}


getCartItems(): Observable<any[]> {
  const cartItems = JSON.parse(localStorage.getItem('cart_items') || '[]');
  return of(cartItems);
}
getUserCartItems(): Observable<any[]> {
  const currentUser = this.getCurrentUser();
  if (!currentUser || !currentUser.username) {
    console.error('User not logged in');
    return of([]);
  }
  const cartItems = JSON.parse(localStorage.getItem(currentUser.username + '_cart_items') || '[]');
  return of(cartItems);
}
removeFromAnotherCart(item: any): void {
  const currentUser = this.getCurrentUser();
  if (!currentUser || !currentUser.username) {
    console.error('User not logged in');
    return;
  }
  let cartItems = JSON.parse(localStorage.getItem(currentUser.username + '_cart_items') || '[]');
  cartItems = cartItems.filter((cartItem: any) => cartItem.name !== item.name || cartItem.price !== item.price);
  localStorage.setItem(currentUser.username + '_cart_items', JSON.stringify(cartItems));
}
clearCart(): void {
  const currentUser = this.getCurrentUser();
  if (!currentUser || !currentUser.username) {
    console.error('User not logged in');
    return;
  }
  localStorage.removeItem(currentUser.username + '_cart_items');
}



}

export interface User {
  username: any;
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

// buyNow(item: any): Observable<any> {
//   const currentUser = this.getCurrentUser();
//   if (currentUser && this.getRole() !== 'admin') {
//     const purchase = { ...item, username: currentUser.username, purchaseDate: new Date() };
//     let cartItems = JSON.parse(localStorage.getItem('cart_items') || '[]');
//     cartItems.push(purchase);
//     localStorage.setItem('cart_items', JSON.stringify(cartItems));
//     return of({ success: true, purchase });
//   } else {
//     return of({ success: false, message: 'Admins cannot buy items.' });
//   }
// }
   // } //hayde mnchn yhafz ben le tnn
    // deleteUsers(userId: string): Observable<any> {
    //   return this.http.delete(`${this.apiUrl}/${userId}`, this.httpOptions).pipe(
    //     tap(() => {
    //       this.users = this.users.filter((user) => user.id !== userId);
    //     }),
    //     catchError((error) => {
    //       console.error('Delete user error:', error);
    //       return of({ error: 'delete failed' });
    //     })
    //   );
    // }
    // private menuItems: any[] = [];
    // getMenuItems(): Observable<any[]> {
    //   return of(this.menuItems);
    // }

    // addMenuItem(item: any) {
    //   this.menuItems.push(item);
    //   localStorage.setItem('menu_items', JSON.stringify(this.menuItems));
    // }

    // updateMenuItem(index: number, item: any) {
    //   this.menuItems[index] = item;
    //   localStorage.setItem('menu_items', JSON.stringify(this.menuItems));
    // }

    // deleteMenuItem(index: number) {
    //   this.menuItems.splice(index, 1);
    //   localStorage.setItem('menu_items', JSON.stringify(this.menuItems));
    // }

    //   getUserss(): Observable<any[]> {
    //     return this.http.get<any[]>(`${this.apiUrl}/users`).pipe(
    //       tap((users) => {
    //         this.users = users;
    //       }),
    //       catchError((error) => {
    //         console.error('Get users error:', error);
    //         return of([]);
    //       })
    //     );
    //   }
    // }
    // getUsers(): Observable<any[]> {
    //   return this.http.get<any[]>(`${this.apiUrl}/users`).pipe(
    //     tap((user) => {
    //       this.users = user;
    //     }),
    //     catchError((error) => {
    //       console.error('Get users error:', error);
    //       return of([]);
    //     })
    //   );
    // }
