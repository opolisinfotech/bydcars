var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var express = require('express');
global.slashes = require('slashes');
global.nl2br  = require('nl2br');
global.app = express(); 
global.moment = require('moment');
const fileUpload = require('express-fileupload');

const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
var logger = require('morgan');


global.connectPool = require('./config/db.js'); 
global.nodeSiteUrl = 'http://localhost'; // node  
global.nodeAdminUrl = 'http://localhost:8080/api/admin'; // node  
global.SITE_NAME = 'bydcars';
global.siteTitle = 'BYD Cars';  
var app = express();

// Notification type 
global.PROJECT_NOTIFICATION_TYPE = 1; 
global.MILESTONE_UPDATE_NOTIFICATION_TYPE = 2; 
global.MILESTONE_PAYMENT_NOTIFICATION_TYPE = 3;  
global.REVIEW_NOTIFICATION_TYPE = 4;  

/* Admin section code */
app.set('view engine', 'ejs');
//app.set('view engine', 'pug') 
var path = require('path');
app.set('views', path.join(__dirname, 'views'));  
app.use(express.static(__dirname +'/public'));  
var flash = require('express-flash-messages') 
app.use(flash()) ;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(fileUpload());

app.use(session({secret: 'krunal', saveUninitialized: false, resave: false}));
app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json');
    next();
});   
app.use(bodyParser.json());  
app.use(express.urlencoded({limit: '100mb',extended: true })); 

const nodemailer    = require("nodemailer"); 
global.smtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'test@octalsoftware.com',
        pass: 'octal@123'
    }
}); 
 
var apiRouter = require('./routes/api');
app.use('/api', apiRouter); 
var server = app.listen(8080, function () { 
  console.log("Example app listening at http://localhost:%s", server.address().port);
});   
   
process.on('uncaughtException', function (err) { 
  console.log('Caught exception: ' + err);
});  

// Check session of logged user 
global.CheckPermission = function(req, res){  
  if(typeof req.session.user !== "undefined"){
      LoginUser = req.session.LoginUser; 
      if(LoginUser){
          return true; 
      }else{ 
          res.redirect(nodeAdminUrl+'/login'); 
      }
  }else{
      return true; 
  } 
  return true;  
}; 

