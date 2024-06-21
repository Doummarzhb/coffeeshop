import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { ComponentModule } from './components/component.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SignComponent } from './pages/sign/sign.component';
import { ContactComponent } from './components/contact/contact.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NavComponent } from './nav/nav.component';
import { MatCardActions, MatCardContent, MatCardModule } from '@angular/material/card';

import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReservationComponent } from './reservation/reservation.component';
import { ManageReservationsComponent } from './manage-reservations/manage-reservations.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CartadminComponent } from './pages/cartadmin/cartadmin.component';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { LoginComponent } from './pages/login/login.component';
import { TotalItemuserComponent } from './pages/total-itemuser/total-itemuser.component';
// import { ToastModule } from 'primeng/toast';
// import { SplitButtonModule } from 'primeng/splitbutton';
// import { UserService } from './manage-users/services/user.service';
// import { ConfirmDialogModule } from 'primeng/confirmdialog';
@NgModule({
  declarations: [
    AppComponent,
    // AdminMenuComponent,
    ContactComponent,
    ReservationComponent,
    // ManageReservationsComponent
    SignComponent,
    FeedbackComponent,
    CartadminComponent,
    LoginComponent,
    TotalItemuserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    ComponentModule,
    AppRoutingModule,
    MatIconModule, MatInputModule, MatFormFieldModule,
    NavComponent,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    NgxSpinnerModule,
    MatDialogModule,
    MessagesModule,
    ButtonModule,
    ToastModule,





  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [MessageService,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,

    },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
