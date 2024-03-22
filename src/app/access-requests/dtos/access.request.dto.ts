export class AccessRequestDto {
    requestId: string = "fgadgdsgasd";
    lastUpdated: Date = new Date();
    reviewed: boolean = false;
    decision: string = "UNLIMITED";
    availableFrom: Date = new Date();
    availableUntil: Date = new Date("06-26-2024");
    patientId: string = "";
    practitionerId: string = "";
    patient: string = "";
    practitioner: string = "";
    patientImage: string = "";
    practitionerImage: string = "";
    specialty: string = "";
    itemsAccess: string[] = [];

    constructor() {
    }
}
