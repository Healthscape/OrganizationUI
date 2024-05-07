import {MedicationAdministrationDto} from "./medicationAdministrationDto";
import {DocumentReferenceDto} from "./document.reference.dto";
import {ConditionDto} from "./condition.dto";
import {AllergyDto} from "./allergy.dto";

export class PatientRecordUpdateDto {
    encounterId: string = '';
    patientId: string = '';
    clinicalImpressionDescription: string = '';
    clinicalImpressionSummary: string = '';
    documents: Array<DocumentReferenceDto> = [];
    medications: Array<MedicationAdministrationDto> = [];
    conditions: Array<ConditionDto> = [];
    allergies: Array<AllergyDto> = [];
    date: Date = new Date();
}