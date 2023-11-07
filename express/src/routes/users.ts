import express from 'express';
import UserService from '../lib/UserService';

const router = express.Router();

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      // If it's not an Error, handle accordingly
      res.status(500).send('An unknown error occurred');
    }
  }
});

// Get all users from a merchant
router.get('/merchants/:merchantId/users', async (req, res) => {
  try {
    const users = await UserService.getAllUsersForMerchant(Number(req.params.merchantId));
    res.json(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      // If it's not an Error, handle accordingly
      res.status(500).send('An unknown error occurred');
    }
  }
});

// Get a user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await UserService.getUserById(Number(req.params.id));
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      // If it's not an Error, handle accordingly
      res.status(500).send('An unknown error occurred');
    }
  }
});

// GET /users/:userId/history - Get history for a user
router.get('/users/:userId/history', async (req, res) => {
  const userId = parseInt(req.params.userId, 10);

  if (isNaN(userId)) {
    return res.status(400).send('User ID must be a number');
  }

  try {
    const history = await UserService.getUserHistory(userId);
    res.status(200).json(history);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      // If it's not an Error, handle accordingly
      res.status(500).send('An unknown error occurred');
    }
  }
});

// Create a new user
router.post('/users', async (req, res) => {
  try {
    const newUser = await UserService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      // If it's not an Error, handle accordingly
      res.status(500).send('An unknown error occurred');
    }
  }
});

// Update a user
router.put('/users/:id', async (req, res) => {
  try {
    await UserService.updateUser(Number(req.params.id), req.body);
    res.status(200).send('User updated successfully');
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      // If it's not an Error, handle accordingly
      res.status(500).send('An unknown error occurred');
    }
  }
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
  try {
    await UserService.deleteUser(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      // If it's not an Error, handle accordingly
      res.status(500).send('An unknown error occurred');
    }
  }
});

export default router;
