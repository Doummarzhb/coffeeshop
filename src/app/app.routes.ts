import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
// import { SignComponent } from './pages/sign/sign.component';
// import { NavComponent } from './nav/nav.component';
// import { ReservationComponent } from './reservation/reservation.component';
// import { ManageReservationsComponent } from './manage-reservations/manage-reservations.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/component.module').then(m => m.ComponentModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
