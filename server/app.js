const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const mongoose = require('mongoose');

const routes = require('./routes/')

const app = express();

const router = express.Router()
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/chronacc"

try {
  mongoose.connect(url, {
    //useMongoClient: true
  })
} catch (error) {

}

routes(router)

app.use(cors())
app.use(bodyParser.json())
app.use(helmet())
// app.use('/static',express.static(path.join(__dirname,'static')))

app.use('/api', router)

var port = process.env.PORT || 3001;

app.get('/', (req, res) => res.send('Hello World with Express'));

app.listen(port, function () {
    console.log("Running chronacc on port " + port);
});
