export interface IGuideLineHistory {
  bookmarks: Bookmark[];
}

export interface Bookmark {
  id: number;
  user_id: number;
  protocol_id: number;
  guide_line_bookmark_status: number;
  bookmark_type: string;
  created_at: string;
  updated_at: string;
  guide_line: GuideLine;
}

export interface GuideLine {
  id: number;
  article_title: string;
  article_text: string;
  article_image: string;
  article_date: string;
  article_time: string;
  article_status: number;
  created_at: string;
  updated_at: string;
}
