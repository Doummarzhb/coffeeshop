import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { SignComponent } from '../pages/sign/sign.component';
import { ReservationComponent } from '../reservation/reservation.component';
import { ManageReservationsComponent } from '../manage-reservations/manage-reservations.component';
import { FeedbackComponent } from '../pages/feedback/feedback.component';
import { CartadminComponent } from '../pages/cartadmin/cartadmin.component';
import { LoginComponent } from '../pages/login/login.component';
import { TotalItemuserComponent } from '../pages/total-itemuser/total-itemuser.component';




// import { SignComponent } from '../pages/sign/sign.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'footer', component: FooterComponent},
  { path: 'menu', component: MenuComponent},
  {path:'sign',component:SignComponent},
  {path:'login',component:LoginComponent},
  {path:'total-itemuser',component:TotalItemuserComponent},



  { path: 'reservation', component: ReservationComponent },
  { path: 'manage-reservations', component: ManageReservationsComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'cartadmin', component: CartadminComponent },






  { path: 'contact', component: ContactComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', redirectTo: '/home' },




  // { path: 'sign', component: SignComponent },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule {}
