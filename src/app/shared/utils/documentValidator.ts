import { AbstractControl, ValidationErrors } from '@angular/forms';

export function cpfValidator(control: AbstractControl): ValidationErrors | null {
  const cpf = control.value?.replace(/\D/g, '');

  if (!cpf || cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return { cpfInvalido: true };
  }

  const calcCheckDigit = (cpf: string, factor: number): number => {
    let total = 0;
    for (let i = 0; i < factor - 1; i++) {
      total += Number(cpf.charAt(i)) * (factor - i);
    }
    const remainder = (total * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };

  const digit1 = calcCheckDigit(cpf, 10);
  const digit2 = calcCheckDigit(cpf, 11);

  if (digit1 !== +cpf.charAt(9) || digit2 !== +cpf.charAt(10)) {
    return { cpfInvalido: true };
  }

  return { cpfInvalido: false };;
}