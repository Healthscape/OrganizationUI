export enum DecisionEnum {
  UNDEFINED = "UNDEFINED",
  UNLIMITED = "UNLIMITED",
  NO_ACCESS = "NO_ACCESS",
  ONE_TIME = "ONE_TIME",
  CUSTOM = "CUSTOM"
}

export const DecisionEnumLabelMapping: Record<DecisionEnum | string, string> = {
  [DecisionEnum.UNDEFINED]: "Undefined",
  [DecisionEnum.UNLIMITED]: "Unlimited",
  [DecisionEnum.NO_ACCESS]: "No Access",
  [DecisionEnum.ONE_TIME]: "One Time",
  [DecisionEnum.CUSTOM]: "Custom"
};
