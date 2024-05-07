import {FhirUserDto} from "../../settings/dto/fhirUserDto";
import {MedicationAdministrationDto} from "./medicationAdministrationDto";
import {EncounterDto} from "./encounter.dto";
import {DocumentReferenceDto} from "./document.reference.dto";
import {ConditionDto} from "./condition.dto";
import {AllergyDto} from "./allergy.dto";
import {ClinicalImpressionDto} from "./clinicalImpression.dto";

export class PatientRecordDto {
    userDto: FhirUserDto = new FhirUserDto();
    medications: Array<MedicationAdministrationDto> = [];
    encounters: Array<EncounterDto> = [];
    documentReferences: Array<DocumentReferenceDto> = [];
    conditions: Array<ConditionDto> = [];
    allergies: Array<AllergyDto> = [];
    clinicalImpressions: Array<ClinicalImpressionDto> = [];
}