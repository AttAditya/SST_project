const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const verified = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        
        req.body.userId = verified.userId;
    } catch (error) {}

    next();
}