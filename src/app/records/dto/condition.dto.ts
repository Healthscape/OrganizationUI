export class ConditionDto {
    code: string = '';
    type: string = 'VIRUS';
    encounterId: string = '';
    patient: string = '';
    practitioner: string = '';
    date: Date = new Date();
    status: string = '';
    end: Date = new Date();
    start: Date = new Date();

    constructor(code: string) {
        this.code = code;
    }
}


