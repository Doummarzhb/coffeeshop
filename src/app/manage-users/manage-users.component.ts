import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthDataService,User } from '../services/auth-data.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users$: Observable<User[]> | undefined;
  currentUser: User | null = null;
  userRole: string = '';

  constructor(private auth_data_service: AuthDataService) {}

  ngOnInit(): void {
    const role = this.auth_data_service.getRole();
    this.userRole = role ? role : '';
    if (this.userRole === 'admin') {
      this.loadUsers();
    }
    const userData = localStorage.getItem('user_data');
    this.currentUser = userData ? JSON.parse(userData) : null;
  }

  loadUsers(): void {
    this.users$ = this.auth_data_service.getUsers();
  }

  deleteUser(userId: string): void {
    this.auth_data_service.deleteUser(userId).subscribe(() => {
      this.loadUsers(); // تحميل البيانات مرة أخرى بعد الحذف
    });
  }
}
