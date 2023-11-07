import { Router, Request, Response } from 'express';
import { pool } from '../config/dbConfig';
import { PaymentMethod } from '../models/Interfaces';

const router = Router();

// Create a Payment Method
router.post('/payment-methods', async (req: Request, res: Response) => {
  try {
    const { name_on_card, card_number, expiration_date, cvv, merchant_id, user_id } = req.body as PaymentMethod;
    const result = await pool.query(
      'INSERT INTO payment_methods(name_on_card, card_number, expiration_date, cvv, merchant_id, user_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
      [name_on_card, card_number, expiration_date, cvv, merchant_id, user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All Payment Methods
router.get('/payment-methods', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM payment_methods');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Payment Method by ID
router.get('/payment-methods/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM payment_methods WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Payment method not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update Payment Method
router.put('/payment-methods/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name_on_card, card_number, expiration_date, cvv } = req.body as Partial<PaymentMethod>;
    const result = await pool.query(
      'UPDATE payment_methods SET name_on_card = $1, card_number = $2, expiration_date = $3, cvv = $4 WHERE id = $5 RETURNING *',
      [name_on_card, card_number, expiration_date, cvv, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('Payment method not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete Payment Method
router.delete('/payment-methods/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM payment_methods WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Payment Methods by User ID
router.get('/users/:userId/payment-methods', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await pool.query('SELECT * FROM payment_methods WHERE user_id = $1', [userId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Payment Methods by Merchant ID
router.get('/merchants/:merchantId/payment-methods', async (req: Request, res: Response) => {
  try {
    const { merchantId } = req.params;
    const result = await pool.query('SELECT * FROM payment_methods WHERE merchant_id = $1', [merchantId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Payment Methods by Merchant ID and User ID
router.get('/merchants/:merchantId/users/:userId/payment-methods', async (req: Request, res: Response) => {
  try {
    const { merchantId, userId } = req.params;
    const result = await pool.query('SELECT * FROM payment_methods WHERE merchant_id = $1 AND user_id = $2', [merchantId, userId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json(err);
  }
});


export default router;
