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


// GET request for the register page
router.get('/register', (req, res) => {
  res.render('register'); // Assuming register.ejs is in your views folder
});

// GET request for the register page
router.get('/login', (req, res) => {
  res.render('login'); // Assuming register.ejs is in your views folder
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
        res.redirect('/login');
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
        if (data[0].password === password) {
          var user = data[0];
          request.session.user_id = user.id; // Store user ID in session
          response.redirect("/dashboard");
        } else {
          response.send('Incorrect Password');
        }
      } else {
        response.send('Incorrect Email Address');
      }
    });
  } else {
    response.send('Please Enter Email Address and Password Details');
  }
});



router.get('/dashboard', function (request, response, next) {
  if (request.session.user_id) {
    response.render('dashboard'); // Render your dashboard.ejs page
  } else {
    response.redirect('/login'); // Redirect to the login page if not logged in
  }
});



router.get('/logout', function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      console.error(err);
    }
    res.redirect('/login');
  });
});



module.exports = router;