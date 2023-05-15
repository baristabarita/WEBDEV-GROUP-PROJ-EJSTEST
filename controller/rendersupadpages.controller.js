const connection = require('../database/connection');


const renderMngAccsMainPage = (req,res)=>{
    let sql = "SELECT * from accounts"
    let query = connection.query(sql, (err,rows)=>{
        if(err) throw err;
        res.render('mng_users_main', {
            title: 'Manage Accounts Main Page',
            account : rows
        });
    });
}

const renderMngAdminAccsPage = (req,res)=>{
    let sql = "SELECT * from accounts"
    let query = connection.query(sql, (err,rows)=>{
        if(err) throw err;
        res.render('mng_admin_users', {
            title: 'Manage Admin Accounts',
            account : rows
        });
    });
}

const renderMngEmpAccsPage = (req,res)=>{
    let sql = "SELECT * from accounts"
    let query = connection.query(sql, (err,rows)=>{
        if(err) throw err;
        res.render('mng_empl_users', {
            title: 'Manage Employees Accounts',
            account : rows
        });
    });
}

const renderSupAdRecLogsPage = (req, res)=>{
    res.render('supad_reclogs', {
        title: 'Super Admin Recent Logs'
    });
}

module.exports = { renderMngAccsMainPage, 
                   renderMngAdminAccsPage, 
                   renderMngEmpAccsPage,
                   renderSupAdRecLogsPage
                };