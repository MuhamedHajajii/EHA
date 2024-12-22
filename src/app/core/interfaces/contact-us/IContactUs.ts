export interface IContactUs {
  success: string;
  contactForm: ContactForm;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  updated_at: string;
  created_at: string;
  id: number;
}
