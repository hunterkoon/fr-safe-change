import { Component } from '@angular/core';
import { RegisterComponent } from '../../features/buttons/register/register.component';

@Component({
  selector: 'app-header',
  imports: [RegisterComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
