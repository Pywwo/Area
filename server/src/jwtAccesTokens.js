const jwt = require('jsonwebtoken');

const privateKey = 'dev-key';
// const privateKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token){
        return res.status(403).json({
            auth: false, message: 'No token provided.'
        });
    }
    jwt.verify(token, privateKey, (err, decoded) => {
        if (err) {
            return res.status(500).json({
                auth: false, message: 'Failed to authenticate. Error -> ' + err
            });
        }
        req.userId = decoded.id;
        next();
    });
};

module.exports = {verifyToken, privateKey, jwt};
