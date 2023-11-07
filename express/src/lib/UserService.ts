import { pool } from '../config/dbConfig';
import { User, UserHistory } from '../models/Interfaces';

class UserService {
  public async getAllUsers(): Promise<User[]> {
    try {
      const { rows } = await pool.query('SELECT * FROM users');
      return rows;
    } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Could not get users: ${error.message}`);
        } else {
          // If it's not an Error, handle accordingly
          throw error;
        }
    }
  }

  public async getAllUsersForMerchant(merchantId: number): Promise<User[]> {
    try {
      const { rows } = await pool.query('SELECT * FROM users A INNER JOIN (SELECT DISTINCT(user_id) AS user_id FROM payment_methods WHERE merchant_id = $1) B ON A.id=B.user_id', [merchantId]);
      return rows;
    } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Could not get users: ${error.message}`);
        } else {
          // If it's not an Error, handle accordingly
          throw error;
        }
    }
  }


  public async getUserById(id: number): Promise<User> {
    try {
      const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      return rows[0];
    } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Could not find user with id ${id}: ${error.message}`);
        } else {
          // If it's not an Error, handle accordingly
          throw error;
        }
    }
  }

  async getUserHistory(userId: number): Promise<UserHistory[]> {
    try {
      const queryText = 'SELECT * FROM user_history WHERE user_id = $1 ORDER BY created_at DESC';
      const { rows } = await pool.query<UserHistory>(queryText, [userId]);
      return rows;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Could not get history for user with ID ${userId}: ${error.message}`);
      } else {
        // If it's not an Error, handle accordingly
        throw error;
      }
    }
  }

  public async deleteUser(id: number): Promise<void> {
    try {
      await pool.query('DELETE FROM users WHERE id = $1', [id]);
    } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Could not delete user with id ${id}: ${error.message}`);
        } else {
          // If it's not an Error, handle accordingly
          throw error;
        }
    }
  }

  async createUser(user: User): Promise<void> {
    // Start a transaction
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // Insert user into the users table
      const res = await client.query(
        'INSERT INTO users(first_name, last_name, address, city, state, zip_code) VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
        [user.first_name, user.last_name, user.address, user.city, user.state, user.zip_code]
      );

      const userId = res.rows[0].id;

      // Insert into user_history table
      await client.query(
        'INSERT INTO user_history(first_name, last_name, address, city, state, zip_code, user_id) VALUES($1, $2, $3, $4, $5, $6, $7)',
        [user.first_name, user.last_name, user.address, user.city, user.state, user.zip_code, userId]
      );

      // Commit the transaction
      await client.query('COMMIT');
    } catch (error) {
      // If an error occurs, rollback the transaction
      await client.query('ROLLBACK');
      throw error;
    } finally {
      // Release the client back to the pool
      client.release();
    }
  }

  async updateUser(userId: number, updatedUser: User): Promise<void> {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // Get the current user data
      const { rows } = await client.query('SELECT * FROM users WHERE id = $1', [userId]);
      const currentUser: User = rows[0] as User;

      // Check if the updated data is different from the current data
      const hasChanged = (Object.keys(updatedUser) as Array<keyof User>).some(
        (key) => updatedUser[key] !== currentUser[key]
      );

      if (hasChanged) {
        // Update the users table
        const updateUserQuery = `
          UPDATE users
          SET first_name = $1, last_name = $2, address = $3, city = $4, state = $5, zip_code = $6, updated_at = NOW()
          WHERE id = $7`;
        await client.query(updateUserQuery, [
          updatedUser.first_name,
          updatedUser.last_name,
          updatedUser.address,
          updatedUser.city,
          updatedUser.state,
          updatedUser.zip_code,
          userId
        ]);

        // Insert into user_history table
        const insertHistoryQuery = `
          INSERT INTO user_history(first_name, last_name, address, city, state, zip_code, user_id)
          VALUES($1, $2, $3, $4, $5, $6, $7)`;
        await client.query(insertHistoryQuery, [
          updatedUser.first_name,
          updatedUser.last_name,
          updatedUser.address,
          updatedUser.city,
          updatedUser.state,
          updatedUser.zip_code,
          userId
        ]);
      }

      // Commit the transaction
      await client.query('COMMIT');
    } catch (error) {
      // If an error occurs, rollback the transaction
      await client.query('ROLLBACK');
      throw error;
    } finally {
      // Release the client back to the pool
      client.release();
    }
  }
}

export default new UserService();
