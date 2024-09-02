export type AllergyCategory  = "food" | "medication" | "environment" | "biologic";
export const AllergyCategories: AllergyCategory[] = ["food", "medication", "environment", "biologic"];

export type AllergyCriticality = "low" | "high" | "unable-to-assess";
export const AllergyCriticalities: AllergyCriticality[] = ["low", "high", "unable-to-assess"];

export const criticalities = new Map().set("low", "Low").set('high', "High");
export const categories = new Map().set("food", "Food").set('medication', "Medication").set("environment","Environment").set("biologic","Biologic");
export const statuses = new Map().set("ACTIVE", "Active").set('INACTIVE', "Inactive");

export class AllergyDto {
    id: string|null = null;
    category: string | null = null;
    criticality: string | null = null;
    encounterId: string = '';
    patient: string = '';
    practitioner: string = '';
    date: Date = new Date();
    status: string = '';
    end: Date = new Date();
    start: Date = new Date();
    code: string = '';
    updated: boolean = false;

    constructor(code: string, category: AllergyCategory, criticality: string){
        this.code = code;
        this.criticality = criticality;
        this.category = category;
    }
}
