// No longer used!

import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../utils/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Extract merchant_id from the query parameters
    const { merchant_id } = req.query;

    // Check if merchant_id is provided and is a number
    if (!merchant_id || Array.isArray(merchant_id) || isNaN(Number(merchant_id))) {
      return res.status(400).json({ error: 'Bad Request: Missing or invalid merchant_id' });
    }

    const query = `
      SELECT id, 'toothpaste' as image, name as title, description, price
      FROM products
      WHERE merchant_id = $1
      ORDER BY price`;

    // Pass the merchant_id to the query
    const { rows } = await pool.query(query, [merchant_id]);

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
