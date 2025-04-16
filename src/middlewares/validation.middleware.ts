import { z } from 'zod';

const BidderTypeEnum = z.enum(['INDIAN', 'FOREIGN'], {
  errorMap: () => ({ message: 'Bidder type must be either INDIAN or FOREIGN' }),
});

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email format')
    .transform((val) => val.toLowerCase()),
  Correspondence_email: z
    .string({ required_error: 'Correspondence email is required' })
    .email('Invalid correspondence email'),
  country_code: z
    .string()
    .min(1, 'Country code is required')
    .startsWith('+', 'Country code must start with "+"'),
  phone_number: z
    .string({ required_error: 'Phone number is required' })
    .min(10, 'Phone number must be at least 10 digits'),
  password: z
    .string({ required_error: 'Password is required field' })
    .min(6, 'Password must be minimum 6 characters'),
});

const companyDetailsSchema = z.object({
  company_name: z.string().min(1, 'Company name is required'),
  preferential_bidder: z.boolean(),
  preference_category: z.string().optional(),
  registration_number: z.string().min(1, 'Registration number is required'),
  registred_address: z.string().min(1, 'Registered address is required'),
  name_of_partners: z.string().optional(),
  bidder_type: BidderTypeEnum,
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postal_code: z.string().min(1, 'Postal code is required'),
  pan_number: z
    .string({ required_error: 'PAN number is required field' })
    .length(10, 'PAN number must be exactly 10 characters'),
  establishment_year: z.string().optional(),
  nature_of_business: z.string().min(1, 'Nature of business is required'),
  legal_status: z.string().min(1, 'Legal status is required'),
  company_category: z.string().min(1, 'Company category is required'),
});

const companyContactSchema = z.object({
  contact_name: z.string().min(1, 'Contact name is required'),
  dob: z.coerce
    .date({ invalid_type_error: 'Date of birth is required' })
    .refine((date) => date <= new Date(), {
      message: 'Date of birth cannot be in the future',
    }),
  designation: z.string().optional(),
  isd_code: z.string().min(1, 'ISD code is required'),
  std_code: z.string().optional(),
  phone_number: z
    .string({ required_error: 'Phone number is required field' })
    .min(10, 'Phone number must be at least 10 digits'),
});

export const registerSchema = z.object({
  userData: userSchema,
  company_details: companyDetailsSchema,
  company_contact_details: companyContactSchema,
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email format')
    .transform((val) => val.toLowerCase()),
  password: z
    .string({ required_error: 'Password is required field' })
    .min(6, 'Password must be minimum 6 characters'),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email format')
    .transform((val) => val.toLowerCase()),
});

export const resetPasswordSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email format')
    .transform((val) => val.toLowerCase()),
  otp_code: z
    .string({ required_error: 'OTP is required' })
    .regex(
      /^[A-Za-z0-9]{6}$/,
      'OTP must be exactly 6 characters (letters and numbers only)',
    ),
  password: z
    .string({ required_error: 'Password is required field' })
    .min(6, 'Password must be minimum 6 characters'),
});
