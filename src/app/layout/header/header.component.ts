import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RegisterComponent } from '../../features/buttons/register/register.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RegisterComponent,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @ViewChild('menu') menuRef!: ElementRef;
  @ViewChild('hamburguer') hamburguerRef!: ElementRef;
  menuOpen = false;

  @HostListener('document:click', ['$event'])
  onDomClick(event: MouseEvent){
    if (this.menuRef && !this.menuRef.nativeElement.contains(event.target) && !this.hamburguerRef.nativeElement.contains(event.target)) {
      this.menuOpen = false; 
    }
  }
}
