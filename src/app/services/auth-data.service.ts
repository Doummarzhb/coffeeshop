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
//-----------------------------------------------------------
  //start the part of signup a user or an admin
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
  //wala mara msta3mlina so fina nchila lzm
  private saveUserToLocalStorage(user: any, token: string): void {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_data', JSON.stringify(user));
    localStorage.setItem('username', user.username);
    // localStorage.setItem('email', user.email);
    localStorage.setItem('auth_token', 'fake-token');

  }
  //login user and admin
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
  getRole(): string | null {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData).role : null;
  }
  //end the part of the sign up and login
//-----------------------------------------------------------


//-----------------------------------------------------------
  //start the part of cartadmin
  getPurchases(): Observable<any[]> {
    const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
    this.purchaseInfoSubject.next(purchases);
    return this.purchaseInfoSubject.asObservable();
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

  deletePurchase(purchaseId: number): Observable<void> {
    const currentPurchases = this.purchaseInfoSubject.value;
    const updatedPurchases = currentPurchases.filter(p => p.id !== purchaseId);
    this.purchaseInfoSubject.next(updatedPurchases);
    localStorage.setItem('purchases', JSON.stringify(updatedPurchases));
    return of();
  }
  //end the part of the cartadmin
//-----------------------------------------------------------


//-----------------------------------------------------------
  //start the part the usercart which is the total-itemUser

  getUserCartItems(): Observable<any[]> {
    const currentUser = this.getCurrentUser();
    if (!currentUser || !currentUser.username) {
      console.error('User not logged in');
      return of([]);
    }
    const cartItems = JSON.parse(localStorage.getItem(currentUser.username + '_cart_items') || '[]');
    return of(cartItems);
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
//end of the part of the user cart
//----------------------------------------------------------

//----------------------------------------------------------
//Start of the part of the feedback which is the feedback

getFeedback(): any[] {
  const storedFeedback = localStorage.getItem('feedbackList');
  return storedFeedback ? JSON.parse(storedFeedback) : [];
}

//end of the feedback part
//----------------------------------------------------------


//----------------------------------------------------------
//start the contact part

submitFeedback(feedbackData: any): void {
  const storedFeedback = localStorage.getItem('feedbackList');
  const feedbackList = storedFeedback ? JSON.parse(storedFeedback) : [];
  feedbackList.push(feedbackData);
  localStorage.setItem('feedbackList', JSON.stringify(feedbackList));
}
//end of the contact part
//----------------------------------------------------------


//----------------------------------------------------------
//start of the RSERVATION part
submitReservation(reservationData: any): Observable<any> {
  this.reservations.push(reservationData);
  localStorage.setItem('reservations', JSON.stringify(this.reservations));
  return of({ success: true, reservation: reservationData });
}
//end of the RESERVATION part
//----------------------------------------------------------


//----------------------------------------------------------
//start of the MENU part

  getMenuItems(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/items`).pipe(
    catchError((error) => {
      console.error('Get items error:', error);
      return of([]);
    })
  );
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

  getCartItems(): Observable<any[]> {
    const cartItems = JSON.parse(localStorage.getItem('cart_items') || '[]');
    return of(cartItems);
  }


//end of the menu part
//---------------------------------------------------------



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


  getReservations(): Observable<any[]> {
    return of(this.reservations);
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

  //kamen haydi ma staemalneha so delete
  private getStoredPurchases(): any[] {
    return JSON.parse(localStorage.getItem('purchases') || '[]');
  }
}

export interface User {
  username: any;
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

