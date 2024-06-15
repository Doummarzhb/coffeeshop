import { Component } from '@angular/core';
import { AuthDataService } from '../services/auth-data.service';
import { Message, MessageService } from 'primeng/api';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {


  reservation: any = {
    name: '',
    date: '',
    time: '',
    itemId: ''
  };
  items: any[] = [];
  selectedItem: any;
  messages: Message[] = [];
  constructor(private auth_data_service: AuthDataService,private messageService: MessageService) {

  }

  submitReservation( ) {
    this.auth_data_service.submitReservation(this.reservation).subscribe(
      (response) => {
        console.log('Done successul ', response);

        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Reservation successful!' });
        // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Reservation successful!' });
      },
      (error) => {
        console.error('no error ', error);
        // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Reservation failed!' });
      }
    );
  }

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {

    const storedItems = localStorage.getItem('menu_items');
    this.items = storedItems ? JSON.parse(storedItems) : [];
  }

  onItemSelect(item: any) {
    this.selectedItem = item;
    this.reservation.itemId = item.id;
  }
}
