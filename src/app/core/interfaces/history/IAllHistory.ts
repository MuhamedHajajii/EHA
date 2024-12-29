export interface IAllHistory {
  bookmarks?: IBookmark[];
  Historys: any;
  scope?: any[];
  articles?: IArticle[];
}

export interface IBookmark {
  id: number;
  user_id: number;
  protocol_id: number;
  guide_line_bookmark_status: number;
  bookmark_type: string;
  created_at: string;
  updated_at: string;
  protocolscopes: Protocolscopes;
}

export interface Protocolscopes {
  id: number;
  title: string;
  description: string;
  sub_category_id: number;
  active_status: number;
  created_at: string;
  updated_at: string;
}

export interface IArticle {
  id: number;
  article_title: string;
  article_text: string;
  article_image: string;
  article_date: string;
  article_time: string;
  article_status: number;
  created_at: string;
  updated_at: string;
  bookmark: any[];
  is_end: boolean;
}
