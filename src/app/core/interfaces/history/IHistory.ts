export interface IHistory {
  Historys: History[];
  scope: Scope;
}

export interface History {
  id: number;
  sub_category_id: any;
  protocol_id: number;
  protocol_name: string;
  sub_category_name: string;
  question_id: number;
  title: string;
  description: string;
  choice_value: string;
  choice_id: number;
  user_id: number;
  patient_name: string;
  patient_code: string;
  patient_case: any;
  created_at: string;
  updated_at: string;
  question: Question;
}

export interface Question {
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
  choices: Choice[];
  charts: Chart[];
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

export interface Chart {
  id: number;
  title: string;
  protocol_scope_id: number;
  protocol_scope_name: string;
  sub_category_id: number;
  sub_category_name: string;
  question_id: number;
  question_title: string;
  choice_id: any;
  choice_title: any;
  created_at: string;
  updated_at: string;
}

export interface Scope {
  id: number;
  title: string;
  description: string;
  sub_category_id: number;
  active_status: number;
  created_at: string;
  updated_at: string;
}
