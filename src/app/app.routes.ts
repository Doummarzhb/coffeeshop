import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignComponent } from './pages/sign/sign.component';
import { NavComponent } from './nav/nav.component';

const routes: Routes = [
  { path: 'sign', component: SignComponent },
  { path: 'nav', component: NavComponent },
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
