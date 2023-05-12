var express = require('express');
var router = express.Router();
var database = require('../database/connection')

/* GET home page. */


router.post('/accmng', (req, res, next) => {
  const accmng = req.body.accmng

  if (accmng == 'fetch') {
    const query = 'SELECT * FROM accounts ORDER BY id ASC'
    database.query(query, (err, data) => {
      res.json({
        data: data
      })
    })
  }

  if (accmng == 'Add') {
    const category = req.body.account_category
    const fname = req.body.fname
    const lname = req.body.lname
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const phone_number = req.body.phone_number
        

    const query = `
    INSERT INTO accounts (category, fname, lname, username, email, password, phone_number)
    VALUES ('${category}', '${fname}', '${lname}', '${username}', '${email}', '${password}', '${phone_number}')
    `
    database.query(query, (err, data) => {
      res.json({
        message: 'Account Added'
      })
      console.log('Account successfully added')
    })
  }

  if (accmng == 'fetch_single') {
    const id = req.body.id
    const query = `SELECT * FROM accounts WHERE id = "${id}"`

    database.query(query, (err, data) => {
      if (err) console.log(err)
      else res.json(data[0])
    })
  }

  if (accmng == 'Edit') {
    const id = req.body.id
    const category = req.body.account_category
    const fname = req.body.fname
    const lname = req.body.lname
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const phone_number = req.body.phone_number
    
    const query = `UPDATE accounts SET category = "${category}", fname = "${fname}", lname = "${lname}", username = "${username}", email = "${email}", password = "${password}", phone_number = "${phone_number}" WHERE id = "${id}"`
    database.query(query, (err, data) => {
      res.json({
        message: 'Account was successfully updated'
      })
    })
  }

  if (accmng == 'delete') {
    const id = req.body.id
    const query = `DELETE FROM accounts WHERE id = "${id}"`

    database.query(query, (err, data) => {
      res.json({
        message: 'Account was successfully deleted'
      })
    })
  }
})

module.exports = router;
