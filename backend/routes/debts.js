import express from 'express';
const router = express.Router();

// Placeholder debt routes
router.get('/', (req, res) => {
  res.json({ message: 'Debts endpoint' });
});

export default router;