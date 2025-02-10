const jwt = require('jsonwebtoken'); 
const JWT_SECRET_KEY = process.env.JWT_SECRET;


const verifyUserToken = (req, res, next) => {
  
    const token = req.cookies.auth_token1;

    if (!token) {
        return res.render('unauthorized.ejs');
        // return res.status(403).json({message:"ONLY USER"});
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        req.user = decoded;
        next(); 
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};


module.exports = {verifyUserToken};
