import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  database: 'store_demo',
  port: 5432,
});

export default pool;
