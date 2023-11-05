import express from "express";
const router = express.Router();

// a test route to make sure the server is working...
router.get('/', (req, res) => {
  console.log('working!');
  res.json({message: 'WORKING!!!'});
});

router.get('/failed', (req, res) => {
  console.log('request failed!');
  res.json({message: 'failed!!!'});
});

router.get('/logged-out', (req, res) => {
  console.log('loggedout!');
  res.json({message: 'loggedout!!!'});
});

router.get('/protected', isAuthenticated, (req, res) => {
  console.log('protected is working!');
  res.json({message: 'protected is working!!!'});
});

export default router;
