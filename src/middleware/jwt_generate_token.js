const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET;


const generateToken = (user) => {
    const payload = {
        email: user.email,
        userType: user.userType
    };
    
    console.log("Payload before signing:", payload);

    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });

    console.log("Generated Token:", token);

    return token;
};

module.exports = {generateToken};
