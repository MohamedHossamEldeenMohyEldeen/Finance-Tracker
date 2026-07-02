const express = require('express');
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/login', async (req, res) => 
  {
    const userData = 
      {
        email: req.body.email,
        pass: req.body.pass,
      };

    //Validation.
    if(typeof userData.email !== 'string')
      {
        return res.status(400).json({ msg : 'Email Data Type Is Not Valid' });
      };

    //Querying the db by email.
    const eQuery = await pool.query('SELECT * FROM users WHERE email = $1', [userData.email]);

    if(eQuery.rows.length === 0)
      {
        return res.status(401).json({ 'msg' : 'Invalid credentials' });
      };

    //Validating the pass and email.
    const passCheck = await bcrypt.compare(userData.pass, eQuery.rows[0].pass);

    if(passCheck === false)
      {
        return res.status(401).json({ 'msg' : 'Invalid credentials' });
      };

    //Making the JWT.
    const token = jwt.sign({ userId: eQuery.rows[0].uid }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });

  });

module.exports = router;
