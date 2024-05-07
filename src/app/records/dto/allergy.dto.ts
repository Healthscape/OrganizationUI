export class AllergyDto {
    type: string = 'FOOD';
    encounterId: string = '';
    patient: string = '';
    practitioner: string = '';
    date: Date = new Date();
    status: string = '';
    end: Date = new Date();
    start: Date = new Date();
    code: string = '';

    constructor(code: string){
        this.code = code;
    }
}
