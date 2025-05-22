import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { LoginComponent } from './layout/pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children:[
      {path: '', component: LoginComponent},
      {path: 'register', component: RegisterComponent}
    ]
  },
];
