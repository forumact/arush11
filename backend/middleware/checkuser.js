const jwt = require("jsonwebtoken");
// const config = require('config');
// var User = require('../models/RA11_User');
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = function setCurrentUser(req, res, next) {
    const token = req.cookies.jwt ? req.cookies.jwt : null;
    if (token) {
        jwt.verify(token, process.env.JWT_KEY, async (error, decodedToken) => {
            if (error) {
                console.error(error.message);
                res.locals.user = null;
                next();
            } else {
                let user = await User.findById(decodedToken.user_id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};