const express = require('express');
const { getAccounts, insertNewAccounts, getEditAccount, updateAccount, deleteAccount } = require('../controller/accmng.controller');

const router = express.Router();

//router.get('/', getAccounts);
router.post('/save', insertNewAccounts);
router.get('/edit/:accountId', getEditAccount);
router.post('/update', updateAccount);
router.get('/delete/:accountId', deleteAccount);

module.exports = router;