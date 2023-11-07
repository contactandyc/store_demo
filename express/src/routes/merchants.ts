import { Router } from 'express';
import { pool } from '../config/dbConfig';
import { createRandomOrdersForMerchant } from '../lib/createRandomOrder';

const router = Router();

// Define routes here using router.get, router.post, etc.
// Get all merchants
router.get('/merchants', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM merchants');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/merchants-with-top-products', async (req, res) => {
  try {
    const sql = `
WITH RankedProducts AS (
    SELECT
        m.id AS merchant_id,
        m.name AS merchant_name,
        p.image_id AS image_id,
        p.name AS product_name,
        p.image AS product_image,
        p.price,
        ROW_NUMBER() OVER (PARTITION BY m.id ORDER BY p.price ASC) AS product_rank
    FROM
        merchants m
    INNER JOIN products p ON m.id = p.merchant_id
)
SELECT
    merchant_id AS id,
    merchant_name AS name,
    ARRAY_AGG(
        JSON_BUILD_OBJECT(
            'name', product_name,
            'image', product_image,
            'image_id', image_id
        )
    ) AS products
FROM
    RankedProducts
WHERE
    product_rank <= 100
GROUP BY
    merchant_id, merchant_name
ORDER BY
    merchant_name;
    `;

    const { rows } = await pool.query(sql);
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single merchant by id
router.get('/merchants/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM merchants WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Merchant not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new merchant
router.post('/merchants', async (req, res) => {
  try {
    const { name } = req.body;
    const result = await pool.query('INSERT INTO merchants(name) VALUES($1) RETURNING *', [name]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a merchant
router.put('/merchants/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const result = await pool.query('UPDATE merchants SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Merchant not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a merchant
router.delete('/merchants/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM merchants WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/merchants/:merchantId/orders/random', async (req, res) => {
  const merchantId = parseInt(req.params.merchantId);
  const numOrders = parseInt(req.query.numOrders as string);

  if (isNaN(merchantId) || isNaN(numOrders)) {
    return res.status(400).send('Invalid merchant ID or number of orders.');
  }

  try {
    await createRandomOrdersForMerchant(merchantId, numOrders);
    res.status(200).send(`Successfully created ${numOrders} random orders for merchant ${merchantId}.`);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
