import { pool } from '../config/dbConfig';
import { Product, PaymentMethod } from '../models/Interfaces'

function generateUniqueNumbers(N: number, M: number): number[] {
  if (M > N) {
    throw new Error("M cannot be greater than N when requiring unique numbers.");
  }

  const uniqueNumbers = new Set<number>();

  while (uniqueNumbers.size < M) {
    const randomNumber = Math.floor(Math.random() * N);
    uniqueNumbers.add(randomNumber);
  }

  return Array.from(uniqueNumbers);
}

export async function createRandomOrdersForMerchant(merchantId: number, numOrders: number): Promise<void> {
  try {
    // Select a random user
    const usersRes = await pool.query('SELECT id FROM users ORDER BY random() LIMIT 1');
    if (usersRes.rows.length === 0) {
      throw new Error('No users found.');
    }
    const user = usersRes.rows[0];

    // Select a random payment method for the user
    const paymentMethodsRes = await pool.query<PaymentMethod>(
      'SELECT id FROM payment_methods WHERE merchant_id = $1 ORDER BY random() LIMIT $2',
      [merchantId, numOrders],
    );

    // Select products for the merchant
    const productsRes = await pool.query<Product>(
      'SELECT id, price FROM products WHERE merchant_id = $1',
      [merchantId],
    );

    if (productsRes.rows.length === 0) {
      throw new Error('No products found for this merchant.');
    }

    for(let orderNum:number=0; orderNum<numOrders; orderNum++ ) {
      const paymentMethod = paymentMethodsRes.rows[orderNum];

      const maxItems = productsRes.rows.length > 10 ? 10 : productsRes.rows.length

      // Create a random order
      const numItems = Math.floor(Math.random() * maxItems) + 1;
      const orderItems = [];
      let totalAmount = 0;
      const productIndices = generateUniqueNumbers(productsRes.rows.length, numItems)
      for (let i = 0; i < numItems; i++) {
        const product = productsRes.rows[productIndices[i]];
        const quantity = Math.floor(Math.random() * 5) + 1; // Quantity between 1 and 5
        const priceAtOrder = product.price; // Assuming the price doesn't change
        orderItems.push({ productId: product.id, quantity, priceAtOrder });
        totalAmount += priceAtOrder * quantity;
      }

      // Insert the order into the orders table
      const orderRes = await pool.query(
        'INSERT INTO orders(user_id, payment_method_id, total_amount, status) VALUES($1, $2, $3, $4) RETURNING id',
        [user.id, paymentMethod.id, totalAmount, 'pending'],
      );
      const orderId = orderRes.rows[0].id;

      // Insert the order items into the order_items table
      for (const item of orderItems) {
        await pool.query(
          'INSERT INTO order_items(order_id, product_id, quantity, price_at_time_of_order) VALUES($1, $2, $3, $4)',
          [orderId, item.productId, item.quantity, item.priceAtOrder],
        );
      }

      console.log(`Order created with ID: ${orderId}`);
    }
  } catch (err) {
    console.error('Error creating random order:', err);
  }
}
