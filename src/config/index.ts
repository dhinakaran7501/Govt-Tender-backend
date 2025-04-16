import dotenv from 'dotenv';

const config = dotenv.config();

if (config.error) {
  throw '.env file is not found.';
}

export default {
  port: process.env.PORT || 8001,
  jwt_secret_key: process.env.JWT_SECRET,
  jwt_salt_key: process.env.JWT_SALT,
  jwt_expiration: process.env.JWT_EXPIRY,
  nodemailer_email_id: process.env.EMAIL_ID,
  nodemailer_password: process.env.EMAIL_PASSWORD,
};
