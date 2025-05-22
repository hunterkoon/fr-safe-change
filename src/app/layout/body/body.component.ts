import { Component } from '@angular/core';
import { PresentationComponent } from '../../shared/presentation/presentation.component';

@Component({
  selector: 'app-body',
  imports: [PresentationComponent],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent {
}
