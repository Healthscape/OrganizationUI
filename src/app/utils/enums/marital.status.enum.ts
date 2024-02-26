import {Enum} from "./enum";

export class MaritalStatusEnum {
  maritalStatuses: Enum[] = [new Enum('NULL', 'Unknown'), new Enum('S', 'Single'), new Enum('M', 'Married'), new Enum('W', 'Widow'), new Enum('D', 'Divorced')]

  getViewValue(code: string | undefined) {
    if(!code){
      return this.maritalStatuses[0].viewValue;
    }
    let index = this.maritalStatuses.findIndex(x => x.code == code)
    if(index == -1){
      return '';
    }
    return this.maritalStatuses[index].viewValue;
  }
}
