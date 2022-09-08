const axios = require('axios');
var _ = require('lodash');
// const config = require('config');
var helper = require('../helpers/index');
const {
    body,
    validationResult
} = require('express-validator');
const instance = axios.create({
    withCredentials: true
});

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const people_get = async (req, res, next) => {
    let selectedUser = []
    const usersList = await axios.get(process.env.API_ENDPOINT + 'fetch_users', {});
    if (req.params.user_id) {
        selectedUser = _.filter(usersList.data.data, ['_id', req.params.user_id]);
    }
    res.render("users", {
        usersList: usersList.data.data || [],
        selectedUser: selectedUser[0] || [],
        user: req.cookies ? req.cookies.name : '',
        title: "Users"
    });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const people_post = async (req, res, next) => {
    try {
        const resp = await axios.post(process.env.API_ENDPOINT + 'people_update', {
            params: {
                user_id: req.body.id,
                name: req.body.name,
                email: req.body.email,
                status: req.body.status || 'D',
            }
        });
    } catch (err) {
        console.error(err.data);
    }
    req.flash('success', `${req.body.name.toUpperCase()} is updated Successfully!`);
    res.status(200).redirect('/admin/people');
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const people_delete_get = async (req, res, next) => {
    try {
        const resp = await axios.delete(process.env.API_ENDPOINT + 'people_delete', {
            params: {
                id: req.params.id,
            }
        });
    } catch (err) {
        console.error(err.data);
    }
    req.flash('success', `${req.params.id} is deleted Successfully!`);
    res.status(200).redirect('/admin/people');
}
/**
 * 
 */
module.exports = {
    people_get,
    people_post,
    people_delete_get
};