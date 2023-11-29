const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rentalcarsystem'
});


db.connect((err) => {
    if (err) {
        console.error(`Error with Connection: ${err.stack}`);
        return;
    }
    console.log('MySQL Connected Successfully!');
});


module.exports = { db, mysql };