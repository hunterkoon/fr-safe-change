import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './layout/pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children:[
      {path: '', component: LoginComponent}
    ]
  },
];
