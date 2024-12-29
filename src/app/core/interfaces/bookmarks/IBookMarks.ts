export interface IBookMarks {
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

export interface IBookMarkAddBody {
  protocol_id: number;
  user_id: number;
  bookmark_type: string;
}
export interface IBookMarkDelete {
  user_id: number;
  bookmark_id: number;
}

export interface IUserId {
  user_id: number;
}
