import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
 import { AppRoutingModule } from './app.routes';
import { ComponentModule } from './components/component.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Ensure this is a valid import
// import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { SignComponent } from './pages/sign/sign.component';
import { ContactComponent } from './components/contact/contact.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NavComponent } from './nav/nav.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
// import { UserService } from './manage-users/services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    // AdminMenuComponent,
    ContactComponent,
    ManageUsersComponent




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
    SignComponent,
    MatIconModule,MatInputModule,MatFormFieldModule,
    NavComponent
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,

    },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
