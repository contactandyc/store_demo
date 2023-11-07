// No longer used!

// pages/api/merchants.ts
import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../utils/db';

// Replace these types with the actual structure of your data
type QueryResultRow = {
  id: number;
  name: string;
  products: string[];
};

type ApiRequest = NextApiRequest;

interface ApiResponse extends NextApiResponse {
  (status: number): ApiResponse;
  json: (body: QueryResultRow[]) => void;
}

const getMerchantsWithTopProducts = async (): Promise<QueryResultRow[]> => {
  const client = await pool.connect();
  try {
    const sql = `
      WITH RankedProducts AS (
        SELECT
          m.id AS merchant_id,
          m.name AS merchant_name,
          p.name AS product_name,
          p.price,
          ROW_NUMBER() OVER (PARTITION BY m.id ORDER BY p.price ASC) AS product_rank
        FROM
          merchants m
        INNER JOIN products p ON m.id = p.merchant_id
      )
      SELECT
        merchant_id as id,
        merchant_name as name,
        ARRAY_AGG(product_name) AS products
      FROM
        RankedProducts
      WHERE
        product_rank <= 5
      GROUP BY
        merchant_id, merchant_name
      ORDER BY
        merchant_name;
    `;

    const { rows } = await client.query(sql);
    return rows;
  } finally {
    client.release();
  }
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method === 'GET') {
    try {
      const merchants = await getMerchantsWithTopProducts();
      console.log(merchants);
      res.status(200).json(merchants);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
