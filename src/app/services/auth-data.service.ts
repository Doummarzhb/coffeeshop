import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthDataService {
  addItem(newItem: { // private apiUrl = 'http://localhost:3000/items'; //hayda api khla2to
    name: string; //localhost:3000/items'; //hayda api khla2to
    price: number; description: string; image: string;
  }) {
    throw new Error('Method not implemented.');
  }
  private admins = [
    { username: 'admin', email: 'admin@example.com', password: 'admin123' },
  ];
  username = '';
  email = '';
  password = '';
  private apiUrl = 'http://localhost:3000/items';
  // private users = [
  //   { username: '', email: '', password: '' }
  // ];
  private users: any[] = [];
  private currentUser: any = null;
  // private user: any = null;
  public isAdmin: boolean = false;
  // private user: any = null;
  // private apiUrl = 'http://localhost:3000/items'; //hayda api khla2to
  private httpOptions = {
    headers: { 'Content-Type': 'application/json' },
  };
  router: any;

  constructor(private http: HttpClient) {}
  isLoggedIn = false;
  onclick(username: string, email: string, password: string): Observable<any> {
    const admin =
      username === 'admin' &&
      email === 'admin@example.com' &&
      password === 'admin123';
    const user = this.users.find(
      (user) =>
        user.username === username &&
        user.email === email &&
        user.password === password
    );
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
      if (user) {
        // this.user = { ...user, role: 'user' };
        this.currentUser = user;
        this.isAdmin = false;
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
            }),
            catchError((error) => {
              console.error('sign error:', error);
              return of({ error: 'sign failed' });
            })
          );
      }
    }
  }

  getRole(): string | null {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData).role : null;
  }

  addToCart(item: any) {
    if (this.getRole() === 'admin') {
      alert('Admins cannot add items to the cart.');
      return;
    }
    let cartItems = JSON.parse(localStorage.getItem('cart_items') || '[]');
    cartItems.push(item);
    localStorage.setItem('cart_items', JSON.stringify(cartItems));
    alert('Item added to cart successfully!');
  }

  // addItem(item: any): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}`, item, this.httpOptions).pipe(
  //     catchError(error => {
  //       console.error('Add item error:', error);
  //       return of({ error: 'Add item failed' });
  //     })
  //   );
  // }

  // addItem(item: any): Observable<any> {
  //   if (this.getRole() !== 'admin') {
  //     return of({ error: 'Permission denied: Only admins can add items' });
  //   }
  //   return this.http.post<any>(`${this.apiUrl}`, item, this.httpOptions).pipe(
  //     catchError(error => {
  //       console.error('Add item error:', error);
  //       return of({ error: 'Add item failed' });
  //     })
  //   );
  // }

  getMenuItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/items`).pipe(
      catchError((error) => {
        console.error('Get items error:', error);
        return of([]);
      })
    );
  } //hayde mnchn yhafz ben le tnn
  // loggedIn() {
  //   return !!localStorage.getItem('token')
  // }
  // logoutUser() {
  //   localStorage.removeItem('token')
  //   this.router.navigate(['/home'])
  // }
}
