require('dotenv').config();

//setting the server up 
const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express()

//Importing the Routes.
const register = require('./route/register');
const login = require('./route/login');
const categories = require('./route/categories');
const transactions = require('./route/transactions');
const accounts = require('./route/accounts');

//Middleware
app.use(express.json());

//Routes
app.use('/auth', register);

app.use('/auth', login);

app.use('/accounts', accounts);

app.use('/categories', categories);

app.use('/transactions', transactions);

app.listen(PORT, () =>
  {
    console.log(`Server is running on port ${PORT}`);
  });
