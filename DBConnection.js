const mysql = require('mysql');

const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rentalcarsystem'
});


database.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ', err);
        return;
    }
    console.log('Connected to MySQL database');
});


module.exports = database;