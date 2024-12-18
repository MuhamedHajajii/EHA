export interface IProtocolsCategories {
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
  protocols: Protocol[];
}

export interface Protocol {
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
