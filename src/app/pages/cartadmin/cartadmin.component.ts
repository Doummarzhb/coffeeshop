import { Component, OnInit } from '@angular/core';
import { AuthDataService } from '../../services/auth-data.service';
import { PrimeNGConfig } from 'primeng/api';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-cartadmin',
  templateUrl: './cartadmin.component.html',
  styleUrl: './cartadmin.component.css'
})
export class CartadminComponent implements OnInit{

  purchases: any[] = [];
  currentUser: any;
  constructor(private auth_data_Service: AuthDataService , private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.auth_data_Service.getPurchases().subscribe(purchases => {
      this.purchases = purchases;
      console.log('Purchases:', this.purchases);
    });

  }


  deletePurchase(purchaseId: number): void {
    this.auth_data_Service.deletePurchase(purchaseId);


}
}
