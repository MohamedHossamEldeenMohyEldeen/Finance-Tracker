require('dotenv').config();

//setting the server up 
const express = require('express');
const pool = require('./db')
const PORT = process.env.PORT || 3000;
const app = express()

app.get('/health', async (req, res) => 
  {
    const query = await pool.query('SELECT * FROM accounts');
    res.json(query.rows);
  });

app.listen(PORT, () =>
  {
    console.log(`Server is running on port ${PORT}`);
  });
