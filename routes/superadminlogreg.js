const express = require('express');
const superadmin = require('../controller/superadminlogreg.controller');

const router = express.Router();

//router.get('/', superadmin.index);
router.get('/supad_register', superadmin.signup);
router.post('/supad_register', superadmin.signup);
router.get('/supad_login', superadmin.login);
router.post('/supad_login', superadmin.login);
router.get('/superadmin_dashboard', superadmin.dashboard);
router.get('/superadmin_logout', superadmin.logout);
router.get('/superadmin_profile',superadmin.profile);

module.exports = router;