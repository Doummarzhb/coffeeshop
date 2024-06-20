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
  //sign up button
  onclick(username: string, email: string, password: string): Observable<any> {
    const admin =
      username === 'admin' &&
      email === 'admin@example.com' &&
      password === 'admin123';
    // const user = this.users.find(
    //   (user) =>
    //     user.username === username &&
    //     user.email === email &&
    //     user.password === password
    // );
    if (admin) {
      this.currentUser = { username, email, role: 'admin' };
      this.isAdmin = true;
      localStorage.setItem('auth_token', 'fake-token');
      localStorage.setItem('user_data', JSON.stringify(this.currentUser));

      return of({
        isAdmin: true,
        data: { token: 'fake-token', userData: this.currentUser },
      });
    } else {
      // const user = this.users.find(user => user.username === username && user.email === email && user.password === password);
      if (!admin) {
        // this.user = { ...user, role: 'user' };
        this.currentUser = !admin;
        this.isAdmin = false;
        this.saveUserToLocalStorage(this.currentUser, 'fake-token');
        localStorage.setItem('auth_token', 'fake-token');
        localStorage.setItem('user_data', JSON.stringify(this.currentUser));
        localStorage.setItem('username', username);
        return of({
          isAdmin: false,
          data: { token: 'fake-token', userData: this.currentUser },
        });
      } else {
        return this.http
          .post<any>('/api/sign', { username, email, password })
          .pipe(
            tap((response) => {
              this.currentUser = response.data.userData;
              this.isAdmin = false;
              localStorage.setItem('auth_token', response.data.token);
              localStorage.setItem(
                'user_data',
                JSON.stringify(this.currentUser)
              );
              localStorage.setItem('username', username);
        this.saveUserToLocalStorage(this.currentUser, 'fake-token');

            }),
            catchError((error) => {
              console.error('sign error:', error);
              return of({ error: 'sign failed' });
            })
          );
      }
    }
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

  getCartItems(): Observable<any[]> {
    const cartItems = JSON.parse(localStorage.getItem('cart_items') || '[]');
    return of(cartItems);
  }

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
  // getCurrentUser(): any {
  //   if (!this.currentUser) {
  //     this.currentUser = JSON.parse(localStorage.getItem('user_data') || 'null');
  //   }
  //   return this.currentUser;
  // }
  getCurrentUser(): Observable<any> {
    this.currentUser = JSON.parse(localStorage.getItem('user_data') || 'null');
    return this.currentUserSubject.asObservable();
  }

  //lal reservation
  // private reservations: any[] = [];




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
      username: currentUser,
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


  // getPurchases(): Observable<any[]> {
  //   const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
  //   return of(purchases);
  // }
  getPurchases(): Observable<any[]> {
    const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
    this.purchaseInfoSubject.next(purchases);
    return this.purchaseInfoSubject.asObservable();
  }

  // deletePurchase(purchaseId: number): void {
  //   const updatedPurchases = this.purchasesSubject.value.filter(p => p.id !== purchaseId);
  //   this.purchasesSubject.next(updatedPurchases);
  //   localStorage.setItem('purchases', JSON.stringify(updatedPurchases));
  // }
  deletePurchase(purchaseId: number): Observable<void> {
    const currentPurchases = this.purchaseInfoSubject.value;
    const updatedPurchases = currentPurchases.filter(p => p.id !== purchaseId);
    this.purchaseInfoSubject.next(updatedPurchases);
    localStorage.setItem('purchases', JSON.stringify(updatedPurchases));
    return of();
  }
  login(username: string, password: string): Observable<any> {
    const admin =
      username === 'admin' &&
      password === 'admin123';

    // Check if user is admin
    if (admin) {
      this.currentUser = { username, role: 'admin' };
      this.isAdmin = true;
      this.saveUserToLocalStorage(this.currentUser, 'fake-token');
      localStorage.setItem('auth_token', 'fake-token');
      localStorage.setItem('user_data', JSON.stringify(this.currentUser));

      return of({
        isAdmin: true,
        data: { token: 'fake-token', userData: this.currentUser },
      });
    } else {


      if (!admin) {
        this.currentUser = !admin;
        this.isAdmin = false;
        this.saveUserToLocalStorage(this.currentUser, 'fake-token');
        localStorage.setItem('auth_token', 'fake-token');
        localStorage.setItem('user_data', JSON.stringify(this.currentUser));
        localStorage.setItem('username', username);
        localStorage.setItem('email', this.email);

        return of({
          isAdmin: false,
          data: { token: 'fake-token', userData: this.currentUser },
        });
      } else {
        return of({ error: 'Invalid username or password' });
      }
    }
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
