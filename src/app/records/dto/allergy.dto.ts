export type AllergyCategory  = "FOOD" | "MEDICATION" | "ENVIRONMENT" | "BIOLOGIC";
export const AllergyCategories: AllergyCategory[] = ["FOOD", "MEDICATION", "ENVIRONMENT", "BIOLOGIC"];

export type AllergyCriticality = "LOW" | "HIGH" | "UNABLE_TO_ASSESS";
export const AllergyCriticalities: AllergyCriticality[] = ["LOW", "HIGH", "UNABLE_TO_ASSESS"];

export class AllergyDto {
    id: string|null = null;
    category: AllergyCategory | null = null;
    criticality: AllergyCriticality | null = null;
    encounterId: string = '';
    patient: string = '';
    practitioner: string = '';
    date: Date = new Date();
    status: string = '';
    end: Date = new Date();
    start: Date = new Date();
    code: string = '';
    updated: boolean = false;

    constructor(code: string, category: AllergyCategory, criticality: AllergyCriticality){
        this.code = code;
        this.criticality = criticality;
        this.category = category;
    }
}
