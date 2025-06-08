export class CepDto {
  'cep': string;
  'state': string;
  'city': string;
  'neighborhood': string;
  'street': string;
  'service': string;

  constructor(data: Partial<CepDto> = {}) {
    Object.assign(this, data);
  }
}
