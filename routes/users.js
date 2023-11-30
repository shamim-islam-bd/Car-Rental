var express = require('express');
var router = express.Router();
// var database = require('../DBConnection.js');


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send({ title: 'respond with a resource', session: req.session });
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

module.exports = router;








