import { Component } from '@angular/core';
import { RegisterComponent } from '../../features/buttons/register/register.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RegisterComponent,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  menuOpen = false;
}
