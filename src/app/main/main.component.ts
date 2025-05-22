import { Component } from '@angular/core';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [HeaderComponent,FooterComponent,RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
