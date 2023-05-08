var express = require('express');
var router = express.Router();
var database = require('../database/connection')

/* GET home page. */

router.post('/prodmng', (req, res, next) => {
  const prodmng = req.body.prodmng

  if (prodmng == 'fetch') {
    const query = 'SELECT * FROM products ORDER BY id ASC'
    database.query(query, (err, data) => {
      res.json({
        data: data
      })
    })
  }

  if (prodmng == 'Add') {
    const image = req.body.product_img
    const name = req.body.product_name
    const category = req.body.product_category
    const price = req.body.product_price
    const quantity = req.body.product_quantity
    const description = req.body.product_description

    const status = 'In Stock' // temporary

    const query = `
    INSERT INTO products (image, name, category, price, quantity, description, status)
    VALUES ('${image}', '${name}', '${category}', '${price}', '${quantity}', '${description}', '${status}')
    `
    database.query(query, (err, data) => {
      res.json({
        message: 'Product Added'
      })
      console.log('Product successfully added')
    })
  }

  if (prodmng == 'fetch_single') {
    const id = req.body.id
    const query = `SELECT * FROM products WHERE id = "${id}"`

    database.query(query, (err, data) => {
      if (err) console.log(err)
      else res.json(data[0])
    })
  }

  if (prodmng == 'Edit') {
    const id = req.body.id
    //const image = req.body.product_img
    const name = req.body.product_name
    const category = req.body.product_category
    const price = req.body.product_price
    const quantity = req.body.product_quantity
    const description = req.body.product_description
    
    const query = `UPDATE products SET name = "${name}", category = "${category}", price = "${price}", quantity = "${quantity}", description = "${description}" WHERE id = "${id}"`
    database.query(query, (err, data) => {
      res.json({
        message: 'Product was successfully updated'
      })
    })
  }

  if (prodmng == 'delete') {
    const id = req.body.id
    const query = `DELETE FROM products WHERE id = "${id}"`

    database.query(query, (err, data) => {
      res.json({
        message: 'Product was successfully deleted'
      })
    })
  }
})

module.exports = router;
