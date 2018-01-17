const express = require('express');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const mongoose = require('mongoose');
//
global.appRoot = path.resolve(__dirname);
//
const app = express();

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Add a cache control header to the response to prevent caching
app.use(function(req, res, next) {
  if (!res.getHeader('Cache-Control')) {
    res.setHeader('Cache-Control', 'no-cache');
  }
  next();
});

//create a cors middleware
app.use(function(req, res, next) {
    //set headers to allow cross origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Get our API routes
const portalRoutes = require('./server/src/portal/portalRoutes.js');

// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// file upload
app.use(fileUpload());

// Set our api routes
app.use('/api/portal', portalRoutes);

// This responds a POST request for the upload page
app.post('/api/file/upload', function (req, res) {
   console.log("Got a POST request for the Upload page");
    if (!req.files) {
        console.log('no files');
    } else {
        console.log(req.files);
        var file = req.files.filename, filename = file.name;
        file.mv('./server/upload/' + filename, function(err) {
            if (err) {
                console.log(err);
                res.send('error occurred');
            } else {
                res.send('File upload successful!');
            }
        })
    }
   res.send('API POST for file upload');
})


// instantiate mongoose connection to mongodb: database name test
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
mongoose.Promise = global.Promise;

//
var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)

})