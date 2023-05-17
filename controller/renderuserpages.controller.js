
const renderHomePage = (req, res)=>{
    res.render('index');
}

const renderContactUs = (req, res)=>{
    res.render('contactus');
}
/*
const renderMngProds = (req, res)=>{
    res.render('user_mngproducts');
}*/
/*
const renderRecLogs = (req, res)=>{
    res.render('user_recentlogs');    
}*/
/*
const renderSales = (req, res)=>{
    res.render('user_sales');
}
*/

const renderViewProds = (req, res)=>{
    res.render('user_viewproducts');
}

module.exports = { renderHomePage,
                   renderContactUs,
                   
                   
                   
                   renderViewProds
                };