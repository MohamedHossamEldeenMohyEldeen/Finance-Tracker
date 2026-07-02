const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const pool = require('../db');

router.post('/register', async (req, res) =>
  {
    //Gets the new user details
    const newUser = 
      {
        email: req.body.email,
        pass: req.body.pass,
        nick_name: req.body.nick_name
      };

    //Validation
    if(typeof newUser.email !== 'string' || typeof newUser.nick_name !== 'string')
      {
        return res.status(400).json({ msg: 'Data Type Is Not Valid' });
      };
    const emailCheck = await pool.query('SELECT email FROM users WHERE email = $1', [newUser.email]);
    if (emailCheck.rows.length > 0)
      {
        return res.status(409).json({ msg: 'Email Already Exists' })
      };

    //hashing the pass
    const password = await bcrypt.hash(newUser.pass, 10);
    newUser.pass = password;

    //Inserting new user into db.
    await pool.query(
        'INSERT INTO users (email, pass, nick_name) VALUES ($1, $2, $3)',
        [newUser.email, newUser.pass, newUser.nick_name]);

    console.log(newUser);
    res.status(201).json({ msg: `New User Created By ${newUser.nick_name}` });
  });

module.exports = router;
