const express = require('express');
const pool = require('../db');
const jwtMiddleware = require('../middleware/JWT');
const router = express.Router();

router.get('/', jwtMiddleware, async (req, res) => 
  {
    const uId = req.user.userId;
    try
      {
        const query = await pool.query('SELECT u.uid, nick_name, tid, ttype, cname, tvalue FROM accounts a JOIN users u ON a.uid = u.uid JOIN transactions t ON t.aid = a.aid JOIN categories c ON t.cid = c.cid WHERE u.uid = $1 ORDER BY tid;', [uId]);

        res.send(query.rows);
      } catch(err) {
       console.error(err);
       res.status(500).json({ error: 'Something went wrong fetching accounts' });
      }
  });
router.post('/', jwtMiddleware, async (req, res) => 
  {
    const newtransaction = 
      {
        aId: req.body.aid,
        cId: req.body.cid,
        tType: req.body.ttype,
        tValue: req.body.tvalue
      }

    try
      {
        await pool.query('INSERT INTO transactions (aid, cid, ttype, tvalue, tdate) VALUES($1, $2, $3, $4, NOW())', [newtransaction.aId, newtransaction.cId, newtransaction.tType, newtransaction.tValue]);
        res.status(201).json({ 'msg': 'new transactions created' })
      } catch(err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong sending transactions' });
      }
  });

module.exports = router;
