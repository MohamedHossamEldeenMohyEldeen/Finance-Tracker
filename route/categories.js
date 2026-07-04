const express = require('express');
const pool = require('../db');
const jwtMiddleware = require('../middleware/JWT');
const router = express.Router();

router.get('/', jwtMiddleware, async (req, res) => 
  {
    const uId = req.user.userId;
    
    try
      {
        const query = await pool.query('SELECT a.uid, a.aid, c.cid, cname, ctype, tvalue FROM categories c JOIN transactions t ON c.cid = t.tid JOIN accounts a ON t.aid = a.aid WHERE a.uid = $1;', [uId]);

        res.send(query.rows);
      } catch(err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong while fetching data from categories' });
      }
  });

router.post('/', jwtMiddleware, async (req, res) => 
  {
    const input = 
      {
        cName: req.body.cname,
        cType: req.body.ctype
      }

      try
        {
          await pool.query('INSERT INTO categories (cname, ctype) VALUES($1, $2);', [input.cName, input.cType]);
          res.status(201).json({ 'msg': `new categories add categories name ${input.cName} categories type ${input.cType}` });
        } catch(err) {
          console.error(err);
          res.status(500).json({ error: 'Something went wrong while inserting data into categories' });
        }
  });

module.exports = router;
