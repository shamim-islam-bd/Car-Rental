'use strict';

var http = require('http');
var port = process.env.PORT || 1337;
var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyparser = require('body-parser');
var session = require('express-session');

var path = require('path');

//setup ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './View/Html'));

//setup public folder

// var HTMLpath = path.join(__dirname, "./View/Html");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyparser.json());

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))


const cors = require('cors');
app.use(cors());

var port = process.env.PORT || 1337;

var UserRepository = require('./Repositories/UserRepository');
var UserService = require('./Services/UserService');
var UserController = require('./Controllers/UserController');


const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);


/* GET home page. */
app.get('/', function (req, res, next) {
    res.render('index', { title: 'Car Rental System', session: req.session });
});

// User Routes for Login, Logout, Register, and Get Users
app.post("/user/register", (req, res) => userController.register(req, res));
app.post("/user/login", (req, res) => userController.login(req, res));
app.post("/user/logout", (req, res) => userController.logout(req, res));
app.get("/user/getUsers", (req, res) => userController.getUsers(req, res));


app.listen(port, () => {
    console.log(`Server running at ${port}`);
});