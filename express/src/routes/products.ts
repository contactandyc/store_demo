import { Router, Response } from 'express';
import { Product } from '../models/Interfaces';
import { pool } from '../config/dbConfig';

const router = Router();

interface RequestWithMerchantId extends Express.Request {
  query: {
    merchant_id: string;
  };
}

router.get('/products', async (req: RequestWithMerchantId, res: Response) => {
  const { merchant_id } = req.query;

  if (!merchant_id) {
    return res.status(400).json({ error: 'Merchant ID is required' });
  }

  try {
    const query = `
      SELECT id, image, image_id, name, description, price
      FROM products
      WHERE merchant_id = $1
      ORDER BY price
    `;
    const { rows } = await pool.query(query, [merchant_id]);
    res.json(rows);
  } catch (error) {
    // console.error('Error executing query', error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
