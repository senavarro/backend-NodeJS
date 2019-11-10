'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Load route files
var project_routes = require('./routes/project');


// Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //* = here go the url or entry points allowed. Change according to the project
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// Routes 
app.use('/api', project_routes);

// Export 
module.exports = app;
