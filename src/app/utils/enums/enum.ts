export class Enum {
  code?: string;
  viewValue?: string;

  constructor(value: string, viewValue: string) {
    this.code = value;
    this.viewValue = viewValue;
  }
}
