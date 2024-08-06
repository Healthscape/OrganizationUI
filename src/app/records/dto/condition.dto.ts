export class ConditionDto {
    id: string|null = null;
    code: string = '';
    encounterId: string = '';
    patient: string = '';
    practitioner: string = '';
    date: Date = new Date();
    status: string = '';
    end: Date = new Date();
    start: Date = new Date();
    updated: boolean = false;

    constructor(code: string) {
        this.code = code;
    }
}


