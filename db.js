require('dotenv').config(); 
const DB_HOST = process.env.HOST || 'localhost';
const DB_USER = process.env.USER || 'postgres';
const DB_PASS = process.env.PASS;
const DB = process.env.DB || 'finance_tracker';

const { Pool } = require('pg');

const pool = 
  new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    maxLifetimeSeconds:60
  });

module.exports = pool;
