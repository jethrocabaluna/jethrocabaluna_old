var express = require("express"),
    bodyParser = require("body-parser"),
    nodemailer = require("nodemailer");
    

require('scroll-behaviour').polyfill();
require("dotenv").config();

var app = express();
var port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.render("homepage");
});

app.post("/", function(req, res) {
  let mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + '&gt;',
    to: process.env.GMAIL_USER,
    subject: 'New message from my portfolio',
    text: `${req.body.name} (${req.body.email}) (${req.body.mobilenumber}) says: ${req.body.message}`
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
      res.redirect('/');
      console.log(error);
    }
    else {
      res.redirect('/');
      console.log("success sending email");
    }
  });
});

app.listen(port, function() {
  console.log("My Website server is starting...")
});