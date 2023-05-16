const express = require('express');
const { renderMngAccsMainPage, 
    renderMngAdminAccsPage, 
    renderMngEmpAccsPage,
    renderSupAdRecLogsPage} = require('../controller/rendersupadpages.controller');


const router = express.Router();

router.get('/manage_accounts_main', renderMngAccsMainPage);
router.get('/manage_admin_accounts', renderMngAdminAccsPage);
router.get('/manage_emp_accounts', renderMngEmpAccsPage);
router.get('/supad_recentlogs', renderSupAdRecLogsPage);


module.exports = router;