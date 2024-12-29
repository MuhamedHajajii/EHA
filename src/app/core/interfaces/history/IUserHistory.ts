export interface IUserHistory {
  Historys: History[];
  scope: any[];
}

export interface History {
  protocol_id: number;
  sub_category_name: string;
  title: string;
}
