const pool = require('../db');
const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middleware/JWT');

router.get('/accounts', jwtMiddleware, async (req, res) => 
   {
     try
       {
         const uId = req.user.userId;

         const query = await pool.query('select distinct u.uid, aid, nick_name, atype, abalance from users u join accounts a on u.uid = a.uid where u.uid = $1 order by aid;', [uId]);

         res.json(query.rows);
       } catch(err) {
         console.error(err);
         res.status(500).json({ error: 'Something went wrong fetching accounts' });
       }
   });

router.post('/accounts', jwtMiddleware, async (req, res) => 
  {
    try
      {
        const uId = req.user.userId;

        //Getting user data
        const input =
          {
            atype: req.body.atype,
            balance: req.body.abalance
          }

        await pool.query('INSERT INTO accounts (uid, atype, abalance) VALUES($1, $2, $3)', [uId, input.atype, input.balance]);
        
        const showQuery = await pool.query('select distinct u.uid, aid, nick_name, atype, abalance from users u join accounts a on u.uid = a.uid where u.uid = $1 order by uid;', [uId])

        res.send(showQuery.rows);
      } catch(err) {
         console.error(err);
         res.status(500).json({ error: 'Something went wrong Posting accounts' });
      }
  });

module.exports = router;
