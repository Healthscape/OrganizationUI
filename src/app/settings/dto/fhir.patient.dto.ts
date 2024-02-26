export class FhirPatientDto {
  identifier?: string;
  name?: string;
  surname?: string;
  birthDate?: Date;
  gender?: string;
  address?: string;
  maritalStatus?: string;
  photo?: string;
  phone?: string;
  email?: string;

  constructor() {
  }
}
