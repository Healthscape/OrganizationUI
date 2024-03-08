export class FhirPatientDto {
  identifier?: string;
  name?: string;
  surname?: string;
  birthDate?: Date;
  gender?: string;
  address?: string;
  maritalStatus?: string;
  image?: string;
  imagePath?: string;
  phone?: string;
  email?: string;

  constructor() {
  }
}
