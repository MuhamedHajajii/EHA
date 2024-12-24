export interface ILogeInUser {
  access_token: string;
  token_type: string;
  expires_in: number;
  message: string;
  user: IUser;
  error?: string;
}

export interface IUser {
  id: number;
  manager_id: any;
  name: string;
  email: string;
  role: string;
  phone: string;
  email_verified_at: string;
  device_token: string;
  provider: string;
  provider_id: string;
  email_verified_code: string;
  job_title: any;
  work_place: any;
  user_full_work_address: string;
  privacy_status: number;
  active_status: number;
  user_active_status: number;
  reset_code: string;
  address: string;
  user_delete_status: number;
  subject_id: any;
  subject_title: any;
  created_at: string;
  updated_at: string;
}
