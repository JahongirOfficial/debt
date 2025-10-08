import express from 'express';
const router = express.Router();

// Placeholder auth routes
router.post('/login', (req, res) => {
  res.json({ message: 'Auth login endpoint' });
});

router.post('/register', (req, res) => {
  res.json({ message: 'Auth register endpoint' });
});

export default router;