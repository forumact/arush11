const jwt = require("jsonwebtoken");
// const config = require('config');
// var User = require('../models/RA11_User');
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt || req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        req.flash('error', 'Login is required for authentication');
        return res.status(403).redirect("/login");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        // req.user = decoded;
    } catch (err) {
        req.flash('error', 'Invalid Token or Expired');
        return res.status(403).redirect("/login");
    }
    return next();
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const verifyAdmin = (req, res, next) => {
    const token = req.cookies.jwt || req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        req.flash('error', 'Login is required for authentication');
        return res.status(403).redirect("/login");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        // req.user = decoded;
        if (decoded.role !== 'admin') {
            req.flash('error', 'Admin access is required for authentication');
            return res.status(403).redirect("/login");
        }
    } catch (err) {
        req.flash('error', 'Invalid Token or Expired');
        return res.status(403).redirect("/login");
    }
    return next();
};
module.exports.authadmin = verifyAdmin;
module.exports.auth = verifyToken;