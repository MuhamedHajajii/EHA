export interface IProtocolsSubCategories {
  subcategory: Subcategory;
}

export interface Subcategory {
  id: number;
  title: string;
  description: string;
  category_id: number;
  main_image: string;
  active_status: number;
  created_at: string;
  updated_at: string;
  protocols: IProtocol[];
}

export interface IProtocol {
  id: number;
  title: string;
  description: string;
  sub_category_id: number;
  active_status: number;
  created_at: string;
  updated_at: string;
  bookmark: any[];
  is_end: boolean;
}
