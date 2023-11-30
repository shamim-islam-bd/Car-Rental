var express = require('express');
var router = express.Router();
var database = require('../DBConnection.js');

/* POST route that renders the addnewcars.ejs file */
router.post('/addnewcars', function (req, res, next) {
    try {
        var car_name = req.body.car_name;
        var fuel_type = req.body.fuel_type;
        var capacity = req.body.capacity;
        var rental_price = req.body.rental_price;
        var car_img = req.body.car_img;
        var available = req.body.available;

        if (car_name && fuel_type && capacity && rental_price && car_img && available) {
            var query = `INSERT INTO cars (car_name, fuel_type, capacity, rental_price, car_img, available) VALUES (?, ?, ?, ?, ?, ?)`;

            database.query(query, [car_name, fuel_type, capacity, rental_price, car_img, available],
                function (error, data) {
                    console.log("car post data ------", data);

                    if (error) throw error;
                    res.redirect('/');
                });
        } else {
            res.send('Please enter all required fields!');
            res.end();
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("Error occurred");
    }
});


module.exports = router;