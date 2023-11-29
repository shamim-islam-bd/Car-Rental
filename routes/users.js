var express = require('express');
var router = express.Router();
// var database = require('../DBConnection.js');


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send({ title: 'respond with a resource', session: req.session });
});


// router.post('/login', function (request, response, next) {
//   var email = request.body.email;
//   var password = request.body.password;

//   console.log("email from login --------- ", request.body);

//   if (email && password) {
//     query = `SELECT * FROM users WHERE email = "${email}"`;

//     database.query(query, function (error, data) {
//       console.log("data from login --------- ", JSON.stringify(data));

//       if (data.length > 0) {
//         for (var count = 0; count < data.length; count++) {
//           if (data[count].password == password) {
//             request.session.user_id = data[count].user_id;

//             response.redirect("/");
//           }
//           else {
//             response.send('Incorrect Password');
//           }
//         }
//       }
//       else {
//         response.send('Incorrect Email Address');
//       }
//       response.end();
//     });
//   }
//   else {
//     response.send('Please Enter Email Address and Password Details');
//     response.end();
//   }

// });


// router.get('/logout', function (request, response, next) {
//   request.session.destroy();
//   response.redirect("/");

// });



module.exports = router;








