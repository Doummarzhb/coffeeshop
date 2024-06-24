import { Component, OnInit } from '@angular/core';
import { AuthDataService } from '../services/auth-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-reservations',
  templateUrl: './manage-reservations.component.html',
  styleUrl: './manage-reservations.component.css'
})
export class ManageReservationsComponent  implements OnInit{
  reservations: any[] = [];
  items: any[] = [];
  selectedItem: any;


  constructor(private auth_data_service: AuthDataService) { }

  ngOnInit() {
    this.loadItems();
    this.loadReservationsFromLocalStorage();
  }

  loadItems() {
    this.auth_data_service.getMenuItems().subscribe(
      (items: any[]) => {
        this.items = items;
        localStorage.setItem('menuItems', JSON.stringify(this.items));
      },
      (error) => {
        console.error('Error loading items:', error);
      }
    );
  }

  loadReservations() {
    this.auth_data_service.getReservations().subscribe(
      (reservations: any[]) => {
        this.reservations = reservations;
        localStorage.setItem('reservations', JSON.stringify(this.reservations));
      },
      (error: any) => {
        console.error('Error', error);
      }
    );
  }

  loadReservationsFromLocalStorage() {
    const storedReservations = localStorage.getItem('reservations');
    if (storedReservations) {
      this.reservations = JSON.parse(storedReservations);
    }
    const storedItems = localStorage.getItem('menuItems');
    if (storedItems) {
      this.items = JSON.parse(storedItems);
    }
  }

  getSelectedItemName(itemId: string): string {
    const selectedItem = this.items.find(item => item.id === itemId);
    console.log('Selected item:',selectedItem);
    return selectedItem ? selectedItem.name : 'Unkown Item';
  }

  // deleteReservation(reservationId: number): void {
  //   this.auth_data_service.deleteReservation(reservationId).subscribe(() => {
  //     this.reservations = this.reservations.filter(r => r.id !== reservationId);
  //     this.saveReservations();
  //   });
  // }

  deleteReservation(index: number): void {
    console.log(`Attempting to delete reservation at index: ${index}`);
    this.reservations.splice(index, 1);
    this.saveReservations();
  }
  
  saveReservations(): void {
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }


}


