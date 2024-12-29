export interface IPatientHistory {
  Historys: History[];
  scope: any[];
}

export interface History {
  sub_category_name: string;
  protocol_id: number;
  protocol_name: string;
  patient_name: string;
  patient_case: string;
}
