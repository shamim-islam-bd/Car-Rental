var express = require('express');
var router = express.Router();
var database = require('../DBConnection.js');

/* GET route that renders the index.ejs file */
router.get('/', function (req, res, next) {
  try {
    var query = `SELECT * FROM cars`;

    database.query(query, function (error, data) {
      if (error) throw error;
      // res.send(data);
      res.render('index', { cars: data }); // Pass the fetched data to the 'index.ejs' template
    });

  } catch (error) {
    console.log(error);
    res.status(500).send("Error occurred");
  }
});

/* GET route that renders the index.ejs file */
router.get('/cars', function (req, res, next) {
  try {
    var query = `SELECT * FROM cars`;

    database.query(query, function (error, data) {
      if (error) throw error;
      // res.send(data);
      res.render('index', { cars: data }); // Pass the fetched data to the 'index.ejs' template
    });

  } catch (error) {
    console.log(error);
    res.status(500).send("Error occurred");
  }
});

router.post('/register', function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var username = req.body.username;
  var role = req.body.role;

  if (email && password && username && role) {
    database.query('INSERT INTO users (email, password, username, role) VALUES (?, ?, ?, ?)',
      [email, password, username, role], function (error, results, fields) {
        if (error) {
          console.error("Error occurred during registration:", error);
          res.status(500).send('Error occurred during registration');
          return;
        }
        console.log("User registered successfully");
        res.redirect('/');
      });
  } else {
    res.status(400).send('Please enter Email Address, Password, Username, and Role!');
  }
});


router.post('/login', function (request, response, next) {
  var email = request.body.email;
  var password = request.body.password;

  if (email && password) {
    query = `SELECT * FROM users WHERE email = "${email}"`;

    database.query(query, function (error, data) {
      if (data.length > 0) {
        for (var count = 0; count < data.length; count++) {
          if (data[count].password == password) {
            request.session.user_id = data[count].user_id;

            response.redirect("/dashboard");
          }
          else {
            response.send('Incorrect Password');
          }
        }
      }
      else {
        response.send('Incorrect Email Address');
      }
      response.end();
    });
  }
  else {
    response.send('Please Enter Email Address and Password Details');
    response.end();
  }

});


router.get('/logout', function (request, response, next) {
  request.session.destroy();
  response.redirect("/");
});


router.get('/dashboard', function (request, response, next) {
  if (request.session.user_id) {
    response.redirect("/dashboard");
  }
  else {
    response.send('Please login to view this page!');
  }
  response.end();
});


module.exports = router;