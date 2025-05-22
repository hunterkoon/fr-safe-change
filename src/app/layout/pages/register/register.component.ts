import { Component } from '@angular/core';
import { REGISTER_IMG } from '../../../shared/constants/constants';
import { PresentationComponent } from '../../../shared/presentation/presentation.component';

@Component({
  selector: 'app-register',
  imports: [PresentationComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  imageSourcePage: string = REGISTER_IMG;
}
