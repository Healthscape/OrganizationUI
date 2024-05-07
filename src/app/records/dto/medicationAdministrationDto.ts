export class MedicationAdministrationDto {
    id: string|null = null;
    status: string = '';
    patient: string = '';
    medication: string = '';
    dosage: string = '';
    encounterId: string = '';
    start: Date = new Date();
    end: Date = new Date();
    updated: boolean = false;

    constructor(medication: string, dosage: string) {
        this.medication = medication;
        this.dosage = dosage;
    }
}
