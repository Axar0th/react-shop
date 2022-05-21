var express = require('express')
var cors = require('cors')

// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'react_projectdb'
});

var app = express()

app.use(cors())
app.use(express.json())

/*
    ========
    Products
    ========
*/

//SELECT FROM DATABASE
app.get('/products', function (req, res, next) {

    // simple query
    connection.query(
        'SELECT * FROM `products`',
        function (err, results, fields) {
            res.json(results);
        }
    );
})

//GET USER BY ID
app.get('/products/:id', function (req, res, next) {
    const id = req.params.id
    // with placeholder
    connection.query(
        'SELECT * FROM `products` WHERE `product_id` = ? ',
        [id],
        function (err, results) {
            res.json(results);
            console.log(results);
        }
    );
})

//INSERT
app.post('/products/create', function (req, res, next) {
    // with placeholder
    connection.query(
        'INSERT INTO `products`(`product_name`, `quantity`, `price`, `product_image`) VALUES (?,?,?,?)',
        [req.body.product_name, req.body.quantity, req.body.price, req.body.product_image],
        function (err, results) {
            res.json(results);
        }
    );
})

//UPDATE
app.put('/products/update', function (req, res, next) {
    // with placeholder
    connection.query(
        'UPDATE `products` SET `product_name`=?,`quantity`=?,`price`=?,`product_image`= ? WHERE product_id = ?',
        [req.body.product_name, req.body.quantity, req.body.price, req.body.product_image, req.body.product_id],
        function (err, results) {
            res.json(results);
        }
    );
})

//DELETE
app.delete('/products/delete', function (req, res, next) {
    // with placeholder
    connection.query(
        'DELETE FROM `products` WHERE product_id = ?',
        [req.body.id],
        function (err, results) {
            res.json(results);
        }
    );
})




/*
    ========
    Sold
    ========
*/



//SELECT FROM DATABASE
app.get('/sold', function (req, res, next) {

    // simple query
    connection.query(
        'SELECT * FROM `sold` INNER JOIN `products` ON sold.product_id = products.product_id ',
        function (err, results, fields) {
            res.json(results);
        }
    );
})


//INSERT
app.post('/sold/create', function (req, res, next) {
    // with placeholder
    connection.query(
        'INSERT INTO `sold`(`product_id`, `sold_quantity`, `sold_price`, `sold_date`) VALUES (?,?,?,?)',
        [req.body.product_id, req.body.sold_quantity, req.body.sold_price, req.body.sold_date],
        function (err, results) {
            res.json(results);
        }
    );
})





//Port listenning
app.listen(5000, function () {
    console.log('CORS-enabled web server listening on port 5000')
})