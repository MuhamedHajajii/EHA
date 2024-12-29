export interface IGuideline {
  articles: IArticle[];
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
