const connection = require('../database/connection');

const getAccounts = (req,res)=>{
    let sql = "SELECT * from accounts"
    let query = connection.query(sql, (err,rows)=>{
        if(err) throw err;
        res.render('supad_dash_index', {
            title: 'Super-Admin Dashboard ',
            account : rows
        });
    });
} 

const insertNewAccounts = (req, res)=>{
    let data = {fname: req.body.fname, lname: req.body.lname, username: req.body.username, email: req.body.email, category: req.body.category, password: req.body.password, phone_number: req.body.phone_number};
    let sql = "INSERT INTO accounts SET ?";
    let query = connection.query(sql, data, (err, results)=>{
        if (err) throw (err);
        res.redirect('/');
    });
}

const getEditAccount = (req, res)=>{
    const accountId = req.params.accountId;
    let sql = `SELECT * FROM accounts WHERE id = ${accountId}`;
    let query = connection.query(sql, (err,result) => {
        if(err) throw err;
        res.render('edit_user', {
            title: 'Edit Account',
            account: result[0]
        });
    });
}

const updateAccount = (req, res) => {
    const accountId = req.body.id;
    let sql = "UPDATE accounts SET fname='"+req.body.fname+"', lname='"+req.body.lname+"', username='"+req.body.username+"', email='"+req.body.email+"', category='"+req.body.category+"', password='"+req.body.password+"', phone_number='"+req.body.phone_number+"' where id ="+accountId;
    let query = connection.query(sql, (err, results)=>{
        if(err) throw err;
        res.redirect('/');
    });
}

const deleteAccount = (req, res) => {
    const accountId = req.params.accountId;
    let sql = `DELETE from accounts WHERE id = ${accountId}`;
    let query = connection.query(sql, (err,result) => {
        if(err) throw err;
        //res.redirect('/');
    });
}
module.exports =  { getAccounts, insertNewAccounts, getEditAccount, updateAccount, deleteAccount };