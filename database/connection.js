const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: null,
    password: '',
    database: 'proventory'
});

connection.connect(function(error){
    if(error) console.log(error);
    else console.log('Database Successfully Connected!');
});
module.exports = connection;