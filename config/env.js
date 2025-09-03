import { config } from 'dotenv';
// switching between production and development without overriding one another
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const { PORT, NODE_ENV } = process.env;
