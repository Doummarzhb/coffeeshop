import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { SignComponent } from './pages/sign/sign.component';
// import { NavComponent } from './nav/nav.component';
// import { ReservationComponent } from './reservation/reservation.component';
// import { ManageReservationsComponent } from './manage-reservations/manage-reservations.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/component.module').then(m => m.ComponentModule)
  },

  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
