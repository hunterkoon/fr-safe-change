import {
  trigger,
  transition,
  style,
  animate,
  query,
  group,
} from '@angular/animations';
import { ChangeDetectorRef, Component, AfterViewInit } from '@angular/core';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        query(
          ':enter, :leave',
          [style({ position: 'absolute', width: '100%', opacity: 0 })],
          { optional: true }
        ),
        group([
          query(
            ':leave',
            [
              animate(
                '200ms ease',
                style({ opacity: 0, transform: 'translateX(-100%)' })
              ),
            ],
            { optional: true }
          ),
          query(
            ':enter',
            [
              style({ transform: 'translateX(100%)', opacity: 0 }),
              animate(
                '200ms ease',
                style({ transform: 'translateX(0)', opacity: 1 })
              ),
            ],
            { optional: true }
          ),
        ]),
      ]),
    ]),
  ],
})

export class MainComponent implements AfterViewInit {
   constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  prepareRoute(outlet: RouterOutlet): string | null {
    return outlet?.activatedRouteData?.['animation'] || null;
  }
}
