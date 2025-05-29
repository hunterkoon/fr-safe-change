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
      console.log(' ' + value.document);
    });
  }

  imageSourcePage: string = REGISTER_IMG;
  submitted: boolean = false;

  registerForm = new FormGroup({
    emailClient: new FormControl('', [Validators.required, Validators.email]),
    completeName: new FormControl('', [Validators.required]),
    document: new FormControl('', [
      Validators.required,
      (control) => cpfValidator(control),
    ]),
    celphone: new FormControl('', [Validators.required]),
    cep: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    neighborhood: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    streetNumber: new FormControl('', [Validators.required]),
    terms: new FormControl('', [Validators.required]),
    acceptOptin: new FormControl('', [Validators.required]),
  });

get isCpfInvalid(): boolean {
  const doc = this.registerForm.get('document');
  const value = doc?.value ?? '';
  return !!doc?.errors?.['cpfInvalido'] && value.length >= 14;
}

get lenghtCpfIsMax():boolean{
  const doc = this.registerForm.get('document');
  const value = doc?.value ?? '';
  return value.length >= 14;
}

get lenghtCpfIsMin():boolean{
  const doc = this.registerForm.get('document');
  const value = doc?.value ?? '';
  return value.length > 0 && value.length <= 13;
}

  onSubmit() {
    this.submitted = true;
    console.log('Email:', this.registerForm.value.emailClient);
  }
}
