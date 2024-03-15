export class EncounterDto{
  actualPeriod: {start: Date, end: Date} = {start: new Date(), end: new Date()};
  serviceProvider: string = "John Doe";
  specialty: string = "Neurologist";
  ago: string = "";
}
