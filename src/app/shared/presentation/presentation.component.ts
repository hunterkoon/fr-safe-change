import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-presentation',
  imports: [],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.scss',
})
export class PresentationComponent {
  @Input() imageSource : string = "";

  //   ngOnInit(): void {
  //     this.imageSource = 'url(\''  + this.imageSource + '\')'
  //     console.log('URL da imagem recebida pelo componente:', this.imageSource);
  // }
}
