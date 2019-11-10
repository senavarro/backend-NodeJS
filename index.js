'use stric'

var mongoose = require('mongoose');
app = require('./app')
var port = 3700; 

mongoose.Promise = global.Promise; 
mongoose.connect('mongodb://localhost:27017/portfolio')
        .then(() =>{
            console.log("Database connected... Success!");

            // Server creation
            app.listen(port, () =>{
                console.log("Server running in localhost: 3700");
            });
        })
        .catch(err => {console.log(err)});

