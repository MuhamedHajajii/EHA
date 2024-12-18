export interface IAboutUs {
  about: About;
}

export interface About {
  id: number;
  about_title: string;
  about_text: string;
  about_image: string;
  second_title: string;
  second_text: string;
  second_image: string;
  privacy_policy: any;
  created_at: string;
  updated_at: string;
}
