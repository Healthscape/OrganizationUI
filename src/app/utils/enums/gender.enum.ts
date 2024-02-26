import {Enum} from "./enum";

export class GenderEnum{
  genders: Enum[] = [new Enum('UNKNOWN', 'Unknown'),new Enum('MALE', 'Male'),new Enum('FEMALE', 'Female'),new Enum('OTHER', 'Other')]

  getViewValue(code: string | undefined){
    if(!code){
      return this.genders[0].viewValue;
    }
    let index = this.genders.findIndex(x => x.code == code)
    return this.genders[index].viewValue;
  }

}
