export interface INewsletterData {
  newsletter: Newsletter[];
}

export interface Newsletter {
  id: number;
  newsletter_title: string;
  newsletter_text: string;
  newsletter_date: string;
  newsletter_time: string;
  newsletter_status: number;
  created_at: string;
  updated_at: string;
}
