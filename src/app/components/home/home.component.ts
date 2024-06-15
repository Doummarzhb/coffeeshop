import { Component } from '@angular/core';
import { NavComponent } from '../../nav/nav.component';
import { AboutComponent } from '../about/about.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
// import { SignComponent } from '../../pages/sign/sign.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavComponent,AboutComponent,FooterComponent,MenuComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
