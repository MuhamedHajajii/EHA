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
  bookmark: IBookmark[];
  is_end: boolean;
}

export interface IBookmark {
  id: number;
  user_id: number;
  protocol_id: number;
  guide_line_bookmark_status: number;
  bookmark_type: string;
  created_at: string;
  updated_at: string;
}
