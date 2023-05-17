const express = require('express');
const { renderHomePage,
    renderContactUs,
   
    
    
    renderViewProds
 } = require('../controller/renderuserpages.controller');
 const router = express.Router();

 router.get('/', renderHomePage);
 router.get('/contact_us', renderContactUs);
 //router.get('/user_manage_products', renderMngProds);
 //router.get('/user_recentlogs', renderRecLogs);
 //router.get('/user_sales', renderSales);
 router.get('/user_view_products', renderViewProds);

 module.exports = router;