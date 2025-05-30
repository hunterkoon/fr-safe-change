import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { REGISTER_IMG } from '../../../shared/utils/constants';
import { PresentationComponent } from '../../../shared/presentation/presentation.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputCommonComponent } from '../../../shared/inputs/input-common/input-common.component';
import { cpfValidator } from '../../../shared/utils/documentValidator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    PresentationComponent,
    ReactiveFormsModule,
    InputCommonComponent,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor() {
    this.registerForm.valueChanges.subscribe((value) => {
    });
  }

  imageSourcePage: string = REGISTER_IMG;
  submitted: boolean = false;

  registerForm = new FormGroup({
    emailClient: new FormControl('', [ Validators.email]),
    completeName: new FormControl('', []),
    document: new FormControl('', [(control) => cpfValidator(control)]),
    celphone: new FormControl('', []),
    cep: new FormControl('', []),
    city: new FormControl('', []),
    neighborhood: new FormControl('', []),
    street: new FormControl('', []),
    streetNumber: new FormControl('', []),
    terms: new FormControl('', []),
    acceptOptin: new FormControl('', []),
  });

  get isCpfInvalid(): boolean {
    const doc = this.registerForm.get('document');
    const value = doc?.value ?? '';
    return !!doc?.errors?.['cpfInvalido'] && value.length >= 14;
  }
  onSubmit() {
    this.submitted = true;
    console.log('Email:', this.registerForm.value.emailClient);
  }
}
