import { Component, OnInit } from '@angular/core';
import { AuthDataService } from '../services/auth-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-manage-reservations',
  templateUrl: './manage-reservations.component.html',
  styleUrl: './manage-reservations.component.css'
})
export class ManageReservationsComponent  implements OnInit{
  reservations: any[] = [];
  items: any[] = [];
  selectedItem: any;


  constructor(private auth_data_service: AuthDataService,private messageService: MessageService) { }

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
    return selectedItem ? selectedItem.name : 'Unknown Item';
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
<<<<<<< HEAD
  deleteReservation(reservationId: number): void {
    this.auth_data_service.deleteReservation(reservationId).subscribe(() => {
      this.reservations = this.reservations.filter(r => r.id !== reservationId);
      // this.showMessage()
      this.saveReservations();

    });
}
saveReservations(): void {
  localStorage.setItem('reservations', JSON.stringify(this.reservations));
}
showMessage(severity: string, summary: string, detail?: string): void {
  this.messageService.add({ severity: severity, summary: summary, detail: detail });
}
=======

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
>>>>>>> 749068f83e3980b3fe59aa71daa1af3f1b2de462


}

  // standalone: true,
  // imports: [CommonModule,FormsModule],
