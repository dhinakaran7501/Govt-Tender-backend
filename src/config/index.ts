import dotenv from 'dotenv';

const config = dotenv.config();

if (config.error) {
  throw '.env file is not found.';
}

export default {
  port: process.env.PORT || 8001,
};
