export interface IProtocolsCategories {
  category: Category;
}

export interface Category {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  subcategories: Subcategory[];
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
}
