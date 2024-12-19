export interface ISpecificProtocol {
  protocol: Protocol;
}

export interface Protocol {
  id: number;
  title: string;
  description: string;
  sub_category_id: number;
  active_status: number;
  created_at: string;
  updated_at: string;
  questions: IQuestion[];
}

export interface IQuestion {
  id: number;
  title: string;
  description?: string;
  text: string;
  type: any;
  is_end: any;
  protocol_scope_id: number;
  created_at: string;
  updated_at: string;
  choices: IChoice[];
}

export interface IChoice {
  id: number;
  question_id: number;
  text: string;
  next_question_id: number;
  protocol_scope_id: number;
  created_at: string;
  updated_at: string;
}
