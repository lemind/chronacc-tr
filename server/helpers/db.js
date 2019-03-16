const mongoose = require('mongoose')

const MONGO_STATE_CONNECTED = 1;

module.exports = {
  isDbReady: () => {
    return mongoose.connection.readyState === MONGO_STATE_CONNECTED
  }
}
