import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentationComponent } from '../../../shared/presentation/presentation.component';
import { LOGIN_IMG } from '../../../shared/constants/constants';
import { InputCommonComponent } from '../../../shared/inputs/input-common/input-common.component';
import { FormControl, FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, PresentationComponent, InputCommonComponent, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true
})
export class LoginComponent {
  imageSourcePage: string = LOGIN_IMG;
  submitted: boolean = false;

  loginForm = new FormGroup({
    emailClient: new FormControl('', [Validators.required, Validators.email])
  });

  onSubmit() {
    this.submitted = true;
    console.log('Email:', this.loginForm.value.emailClient);
  }
}
