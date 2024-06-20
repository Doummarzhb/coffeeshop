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
  userRole: any;
  constructor(private auth_data_Service: AuthDataService , private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.auth_data_Service.getPurchases().subscribe(purchases => {
      this.purchases = purchases;
      console.log('Purchases:', this.purchases);
    });

  }
  
  buyItem(item: any): void {
    this.auth_data_Service.buyNow(item).subscribe({
      next: (response: any) => {
        if (response.success) {
          console.log('Purchase successful', response.purchase);
          this.purchases.push(response.purchase);
        } else {
          console.error('Purchase failed');
        }
      },
      error: (error: any) => {
        console.error('Purchase error:', error);
      }
    });
  }


  deletePurchase(purchaseId: number): void {
    this.auth_data_Service.deletePurchase(purchaseId);


}
}
