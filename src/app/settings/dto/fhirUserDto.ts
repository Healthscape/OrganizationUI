import {GenderEnum} from "../../utils/enums/gender.enum";

export class FhirUserDto {
  identifier?: string;
  name: string = 'Lea';
  surname: string = 'Kalmar';
  birthDate: Date =  new Date(1999,6,26);
  gender: string = 'FEMALE';
  address?: string;
  maritalStatus?: string;
  image?: string;
  imagePath?: string;
  phone?: string;
  email?: string = 'lea.kalmar@gmail.com';
  specialty?: string;

  constructor() {
  }

}
