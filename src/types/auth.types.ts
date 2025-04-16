export type LoginRequestParams = {
  email: string;
  password: string;
};

export type UserData = {
  name: string;
  email: string;
  Correspondence_email: string;
  country_code: string;
  phone_number: string;
  password: string;
  captcha: string;
};

export type CompanyDetails = {
  company_name: string;
  preferential_bidder: boolean;
  preference_category?: string;
  registration_number: string;
  registred_address: string;
  name_of_partners?: string;
  bidder_type: 'INDIAN' | 'FOREIGN';
  city: string;
  state: string;
  postal_code: string;
  pan_number: string;
  establishment_year?: string;
  nature_of_business: string;
  legal_status: string;
  company_category: string;
};

export type CompanyContactDetails = {
  contact_name: string;
  dob: string;
  designation?: string;
  isd_code: string;
  std_code?: string;
  phone_number: string;
};

export type RegisterRequestParams = {
  userData: UserData;
  company_details: CompanyDetails;
  company_contact_details: CompanyContactDetails;
};

export type ForgotPasswordParams = {
  email: string;
};

export type ResetPasswordParams = {
  email: string;
  otp_code: string;
  password: string;
};
export interface MailOption {
  email: string;
  subject: string;
  message: string;
}
