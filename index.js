require('dotenv').config();

//setting the server up 
const PORT = process.env.PORT || 3000;
const express = require('express');
const pool = require('./db')
const app = express()

//Importing the Routes.
const register = require('./route/register');
const login = require('./route/login');

//Middleware
app.use(express.json());

//Routes
app.use('/auth', register);

app.use('/auth', login);

// When The Port is open
app.listen(PORT, () =>
  {
    console.log(`Server is running on port ${PORT}`);
  });
