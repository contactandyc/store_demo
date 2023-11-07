import { Pool } from 'pg';

export const pool = new Pool({
  database: 'store_demo',
  // You can include other connection options here
});
