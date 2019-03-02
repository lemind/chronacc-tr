const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, './../dist')));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, './../dist/index.html'));
});

app.use(cors())
app.use(bodyParser.json())
app.use(helmet())


var port = process.env.PORT || 8091;

app.listen(port, "0.0.0.0", function () {
  console.log("Running chronacc on port " + port);
});
