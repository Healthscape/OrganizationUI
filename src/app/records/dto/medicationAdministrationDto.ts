export class MedicationAdministrationDto {
    status: string = 'In Progress';
    medication: string = 'Fenofibrate (48mg)';
    instructions: string = 'Take with food every morning';
    occurrence: { start: Date, end: Date } = {start: new Date(), end: new Date()};
    encounter: string = '';
}
