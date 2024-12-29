export interface ISendPatient {
  patient_name: string;
  patient_code: any;
  patient_case: string;
  protocol_id: number;
  user_id: number;
}

export interface IAddPatientChoiceResponse {
  choice: Choice;
  nextquestion: Nextquestion;
}

export interface Choice {
  id: number;
  question_id: number;
  text: string;
  next_question_id: number;
  protocol_scope_id: number;
  created_at: string;
  updated_at: string;
}

export interface Nextquestion {
  id: number;
  title: string;
  description: string;
  text: string;
  type: any;
  is_end: any;
  protocol_scope_id: number;
  danger_status: number;
  danger_timer: number;
  created_at: string;
  updated_at: string;
  choices: Choice2[];
}

export interface Choice2 {
  id: number;
  question_id: number;
  text: string;
  next_question_id: number;
  protocol_scope_id: number;
  created_at: string;
  updated_at: string;
}
