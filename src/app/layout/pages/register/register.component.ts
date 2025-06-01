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
import { MessageComponent } from '../../../shared/message/message/message.component';

@Component({
  selector: 'app-register',
  imports: [
    PresentationComponent,
    ReactiveFormsModule,
    InputCommonComponent,
    CommonModule,
    MessageComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  completeNameNormalized: string[] = [];
  messageError: string[] = ['Preencha o formulário'];
  imageSourcePage: string = REGISTER_IMG;
  submitted: boolean = false;
  hasErrorInForm: boolean = false;

  constructor() {
    this.registerForm.valueChanges.subscribe(() => {
      this.hasErrorInForm = false;
      this.messageError = [];
      this.completeNameNormalized = [];

      this.emailClient();
      this.completeName();
      this.document();
      this.cellPhone();
    });
  }

  registerForm = new FormGroup({
    emailClient: new FormControl('', [Validators.email]),
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

  private cellPhone() {
    const cellCtrl = this.registerForm.get('celphone');
    if (cellCtrl?.invalid && (cellCtrl.dirty || cellCtrl.touched)) {
    }
  }

  private document() {
    const cpfCtrl = this.registerForm.get('document');
    if (cpfCtrl?.value && cpfCtrl?.invalid && cpfCtrl.value?.length > 0 ) {
      if (cpfCtrl.errors?.['cpfInvalido']) {
        this.messageError.push('CPF inválido!');
      }
    }
  }

  private emailClient() {
    const emailCtrl = this.registerForm.get('emailClient');
    if (emailCtrl?.invalid && (emailCtrl.dirty || emailCtrl.touched)) {
      if (
        emailCtrl.value &&
        emailCtrl.value?.length > 5 &&
        emailCtrl.errors?.['email']
      ) {
        this.messageError.push('E-mail inválido!');
      }
    }
  }

  private completeName() {
    const nameCtrl = this.registerForm.get('completeName');
    if (nameCtrl?.value) {
      let listOfnames: string[] = nameCtrl.value.trim().split(' ');
      for (let pos in listOfnames) {
        if (listOfnames[pos].trim() != '') {
          this.completeNameNormalized.push(listOfnames[pos]);
        }
      }
      if (this.completeNameNormalized.length < 2) {
        this.messageError.push(
          'Deve conter Nome e Sobrenome. ex: Maria da Silva'
        );
      }
    }
  }

  putMessage(error: string): void {
    this.messageError.push(error);
  }

  get isCpfInvalid(): boolean {
    const doc = this.registerForm.get('document');
    const value = doc?.value ?? '';
    return !!doc?.errors?.['cpfInvalido'] && value.length >= 14;
  }
  
  onSubmit() {
    console.log(this.hasErrorInForm)
      if(this.messageError.length > 0){
          this.hasErrorInForm = true;
      }
  }
}
