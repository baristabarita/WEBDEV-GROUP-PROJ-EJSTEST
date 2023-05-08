const express = require('express');
const user = require('../controller/userlogreg.controller');

const router = express.Router();

//router.get('/', superadmin.index);
router.get('/register', user.signup);
router.post('/register', user.signup);
router.get('/login', user.login);
router.post('/login', user.login);
router.get('/user_dashboard', user.dashboard);
router.get('/logout', user.logout);
router.get('/users_profile',user.profile);

module.exports = router;