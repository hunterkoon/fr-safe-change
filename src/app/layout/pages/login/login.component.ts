import { Component } from '@angular/core';
import { PresentationComponent } from '../../../shared/presentation/presentation.component';
import { LOGIN_IMG } from '../../../shared/constants/constants';

@Component({
  selector: 'app-login',
  imports: [PresentationComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  imageSourcePage : string  = LOGIN_IMG
}
