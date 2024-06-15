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
    this.loadReservations();
    // this.loadItems();
    // this.loadReservationsFromLocalStorage();
  }


  loadItems() {
    this.auth_data_service.getMenuItems().subscribe(
      (items: any[]) => {
        this.items = items;
      },
      (error) => {
        console.error('Error loading items:', error);
      }
    );
  }


  onItemSelect(item: any) {
    this.selectedItem = item;
  }



  loadReservations() {
    this.auth_data_service.getReservations().subscribe(
      (reservations: any[]) => {
        this.reservations = reservations;
        // this.saveReservationsToLocalStorage();
      },
      (error:any ) => {
        console.error('Error', error);
      }
    );
  }
  getSelectedItemName(itemId: string): string {
    const selectedItem = this.items.find(item => item.id === itemId);
    return selectedItem ? selectedItem.name : '';
  }
  // saveReservationsToLocalStorage() {
  //   localStorage.setItem('reservations', JSON.stringify(this.reservations));
  // }
  loadReservationsFromLocalStorage() {
    const storedReservations = localStorage.getItem('reservations');
    if (storedReservations) {
      this.reservations = JSON.parse(storedReservations);
    }
  }
  deleteReservation(reservationId: number): void {
    this.auth_data_service.deleteReservation(reservationId).subscribe(() => {
      this.reservations = this.reservations.filter(r => r.id !== reservationId);
      this.saveReservations();
    });
}
saveReservations(): void {
  localStorage.setItem('reservations', JSON.stringify(this.reservations));
}


}

  // standalone: true,
  // imports: [CommonModule,FormsModule],
