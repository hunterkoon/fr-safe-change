import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged, takeWhile } from 'rxjs/operators';
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
import { HttpService } from '../../../core/http/http.service';
import { HttpClientModule } from '@angular/common/http';
import { CepDto } from '../../../domain/cep';

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
export class RegisterComponent implements OnInit {
  completeNameNormalized: string[] = [];
  messageError: string[] = ['Preencha o formulário'];
  imageSourcePage: string = REGISTER_IMG;
  submitted: boolean = false;
  hasErrorInForm: boolean = false;
  submeted: boolean = false;
  registerForm!: FormGroup;

  constructor(private httpsService: HttpService) {
    // this.registerForm.valueChanges.subscribe(() => {
    //   this.validationFieldsForm();
    // });
  }

  private validationFieldsForm() {
    this.hasErrorInForm = false;
    this.messageError = [];
    this.emailClient();
    this.completeName();
    this.document();
    this.cellPhone();
    this.giveListError(this.messageError);
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      emailClient: new FormControl('', [Validators.email]),
      completeName: new FormControl('', []),
      document: new FormControl('', [(control) => cpfValidator(control)]),
      celphone: new FormControl('', []),
      cep: new FormControl('', []),
      city: new FormControl('', []),
      neighborhood: new FormControl('', []),
      street: new FormControl('', []),
      streetNumber: new FormControl('', []),
    });

    this.registerForm.valueChanges.subscribe(() => {
      this.validationFieldsForm();
    });

    this.registerForm
      .get('cep')
      ?.valueChanges.pipe(distinctUntilChanged())
      .subscribe((data) => {
        this.cep(data);
      });
  }

  private getCep(cep: string): void {
    console.log('meu cep ' + cep);
    this.httpsService
      .get<CepDto>(
        `https://brasilapi.com.br/api/cep/v1/${
          this.registerForm.get('cep')?.value
        }`
      )
      .subscribe((data) => {
          this.registerForm.get('street')?.setValue(data.street);
          this.registerForm.get('neighborhood')?.setValue(data.neighborhood);
          this.registerForm.get('city')?.setValue(data.city);
      });
  }

  private giveListError(listOfMessages: string[]): void {
    listOfMessages.length > 0 ? (this.hasErrorInForm = true) : null;
  }

  private cep(cep: string) {
    if (cep?.length == 9) {
      this.getCep(cep);
    }
  }

  private cellPhone() {
    const cellCtrl = this.registerForm.get('celphone');
    this.nullOrUndefined(cellCtrl?.value, 'Preencha o Campo Celular');
    if (!!cellCtrl?.value && cellCtrl?.value?.length < 14) {
      this.nullOrUndefined(
        null,
        'Preencha o Campo celular com todos os digitos!'
      );
    }
  }

  private document() {
    const cpfCtrl = this.registerForm.get('document');
    this.nullOrUndefined(cpfCtrl?.value, 'Preencha o Campo CPF');
    if (cpfCtrl?.value && cpfCtrl?.invalid && cpfCtrl.value?.length > 0) {
      if (cpfCtrl.errors?.['cpfInvalido']) {
        this.messageError.push('CPF inválido!');
      }
    }
  }

  private emailClient() {
    const emailCtrl = this.registerForm.get('emailClient');
    this.nullOrUndefined(emailCtrl?.value, `Preencha o campo E-mail`);
    if (emailCtrl?.invalid) {
      if (emailCtrl.value && emailCtrl.errors?.['email']) {
        this.messageError.push('E-mail inválido!');
      }
    }
  }

  private completeName() {
    this.completeNameNormalized = [];
    const nameCtrl = this.registerForm.get('completeName');
    this.nullOrUndefined(nameCtrl?.value, 'Preencha o Campo Nome Completo');
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

  private nullOrUndefined(value: string | null | undefined, message: string) {
    if (!value) {
      this.messageError.push(message);
    }
  }
  get isCpfInvalid(): boolean {
    const doc = this.registerForm.get('document');
    const value = doc?.value ?? '';
    return !!doc?.errors?.['cpfInvalido'] && value.length >= 14;
  }

  get hasInputEmptyInForm(): boolean {
    for (const [key, value] of Object.entries(this.registerForm.value)) {
      if (!value) {
        return !false;
      }
    }
    return !true;
  }

  get hasErrorOrInvalidForm(): boolean {
    if (!this.hasInputEmptyInForm && !this.hasErrorInForm) {
      return false;
    }
    return true;
  }

  private showContentForm(): void {
    console.log(this.registerForm.getRawValue());
  }

  onSubmit() {
    this.submeted = true;
    this.validationFieldsForm();
    this.showContentForm();
  }
}
