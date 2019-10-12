const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const path = require('path');

// temporary not used. for separate prod scheme

const app = express();

app.use(express.static(path.join(__dirname, './../dist')));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, './../dist/index.html'));
});

app.use(cors())
app.use(bodyParser.json())
app.use(helmet())


const port = process.env.PORT || 8090;
const address = process.env.ADDRESS || "0.0.0.0";

app.listen(port, address, function () {
  console.log("Running chronacc on port " + port);
});
