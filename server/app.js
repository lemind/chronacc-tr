let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

let app = express();

let tasksRoutes = require("./tasks-routes")

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/resthub');
var db = mongoose.connection;

var port = process.env.PORT || 3001;

app.get('/', (req, res) => res.send('Hello World with Express'));

app.use('/tasks', tasksRoutes)

app.listen(port, function () {
    console.log("Running chronacc on port " + port);
});