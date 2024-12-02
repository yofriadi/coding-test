import { Client } from 'pg';
import { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB } from '@config';

export const client = new Client({
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  database: POSTGRES_DB,
});

client.connect();

export default client;
