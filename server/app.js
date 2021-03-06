const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const routes = require('./routes/');

const app = express();
dotenv.config();

const router = express.Router()

let mongoUri = process.env.MONGODB_URI

const migrate = require('./db/migrate');

if (process.env.NODE_ENV === 'production') {
  const env = {
    'process.env.MONGODB_URI': `"${process.env.MONGODB_URI}"`,
    'process.env.MONGODB_URI_DATABASE_NAME': `"${process.env.MONGODB_URI_DATABASE_NAME}"`,
    'process.env.MONGODB_URI_ATLAS': `"${process.env.MONGODB_URI_ATLAS}"`
  };

  migrate.migrate(env);

  mongoUri = process.env.MONGODB_URI_ATLAS;
}

try {
  mongoose.connect(mongoUri, {
    //useMongoClient: true
  })
} catch (error) {
  console.log('Connecting mongoose error', error);
}

mongoose.connection.on('error', function(err){
  console.log('Mongoose error', err);
});


if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, './../client/dist')));
  app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, './../client/dist/index.html'));
  });
}

routes(router);

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

app.use('/api', router);

var port = process.env.PORT || 3001;

app.listen(port, "0.0.0.0", function () {
  console.log("Running chronacc on port " + port);
});
