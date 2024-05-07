export class ClinicalImpressionDto {
    encounterId: string = '';
    patient: string = '';
    practitioner: string = '';
    date: Date = new Date();
    status: string = '';
    description: string = '';
    summary: string = '';

}