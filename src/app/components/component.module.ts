import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { ComponentsRoutingModule } from './components-routing.module';

import { MatButtonModule } from '@angular/material/button';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
// import { SignComponent } from '../pages/sign/sign.component';
// import { ContactComponent } from './contact/contact.component';
import { MatMenuModule } from '@angular/material/menu';


import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { FormGroup } from '@mui/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageReservationsComponent } from '../manage-reservations/manage-reservations.component';
import { MatDialog } from '@angular/material/dialog';



// import { AdminMenuComponent } from './admin-menu/admin-menu.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ComponentsRoutingModule,
    MatButtonModule,
    MatCardModule,
    ToastModule,
    ButtonModule,
    HomeComponent,  // Import standalone
    AboutComponent,
    MenuComponent,
    FooterComponent,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatMenuModule,
    FormsModule,
    // ButtonModule,
    // ToastModule









    // SignComponent
  ],
  exports: [
    HomeComponent,
    AboutComponent,
    MenuComponent,
    FooterComponent,



    // SignComponent

  ],
  declarations: [
    ManageReservationsComponent,

    // ManageReservationsComponent

  ],

})
export class ComponentModule { }
