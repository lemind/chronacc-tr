const {
  init,
  create,
  database,
  config,
  up,
  down,
  status 
} = require('migrate-mongo');
const fs = require('fs')

const CONFIG_FILE = './migrate-mongo-config.js'

const migrate = async function(){
  try {
    const db = await database.connect();
    const migrated = await up(db);
    migrated.forEach(fileName => console.log('Migrated:', fileName));

    const migrationStatus = await status(db);
    migrationStatus.forEach(({ fileName, appliedAt }) => {
      console.log(fileName, ':', appliedAt)
    });

  } catch(error) {
    console.log('Migration error', error)
  }
};

module.exports = {
  migrate: function(params){
    this.init(params);
  },
  init: function(params){
    fs.readFile(CONFIG_FILE, 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      }

      let result = data;
      for (const prop in params) {
        const param = params[prop];
        if (param) {
          result = result.replace(prop, param);
        }
      };

      fs.writeFile(CONFIG_FILE, result, 'utf8', function (err) {
        if (err) return console.log(err);

        migrate();
      });
    });
  }
};