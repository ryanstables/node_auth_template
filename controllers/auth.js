import crypto from 'crypto';
import User from '../models/User.js';
import { ALGORITHM, ITERATIONS, KEYLEN } from '../config/constants.js';

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    //validate the email and password here...
    if(!username) throw new Error('No username');

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ error: 'Username already exists.' });

    const salt = crypto.randomBytes(16).toString('hex');
    crypto.pbkdf2(password, salt, ITERATIONS, KEYLEN, ALGORITHM, async (err, derivedKey) => {      
      if (err) throw err;
      const hash = derivedKey.toString('hex');
      const newUser = new User({
        username,
        password: { salt, hash }
      });
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    });

  } catch (err) {
    res.status(400).json({ error: 'Registration failed.' });
  }
};
