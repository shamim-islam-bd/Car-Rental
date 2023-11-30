var express = require('express');
var router = express.Router();
var database = require('../DBConnection.js');

/*..GET home page..*/
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', session: req.session });
});

router.get('/dashboard', function (req, res, next) {
  if (req.session.user_id) {
    res.render('dashboard', { title: 'Dashboard', session: req.session });
  } else {
    res.redirect('/');
  }
});

router.post('/register', function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var username = req.body.username;
  var role = req.body.role;

  if (email && password && username && role) {
    express.query('INSERT INTO users (email, password, username, role) VALUES (?, ?, ?, ?)',
      [email, password, username, role], function (error, results, fields) {
        console.log("username", results);
        if (error) throw error;
        response.redirect('/');
      });
  } else {
    response.send('Please enter Email Address, Password, Username and Role!');
    response.end();
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


module.exports = router;