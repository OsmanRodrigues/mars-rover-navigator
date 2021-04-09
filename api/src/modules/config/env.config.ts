import dotenv from 'dotenv';

dotenv.config({
  path: '.env'
});

export const env = {
  api: {
    host: process.env.API_HOST,
    port: Number(process.env.API_PORT)
  }
};
