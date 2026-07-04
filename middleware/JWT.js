const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => 
  {
    //Getting the current token.
    const authHeader = req.headers.authorization;
    
    if(!authHeader)
      {
        return res.status(401).json({ 'msg': 'authrization token not found' });
      };
      
    const token = authHeader.split(' ')[1];

    //Comparing the token to the secret key.
    try 
      {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
      }
    catch(err)
      {
        return res.status(403).json({ msg: 'Invalid token' });
      };
  };

module.exports = jwtMiddleware;
