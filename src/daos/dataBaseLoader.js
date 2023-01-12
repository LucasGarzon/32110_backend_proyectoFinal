const startDB = require('./loaderMongo.js')

class Loaders {
  start() {
    startDB.startDB()
  }
}

const loader = new Loaders()
module.exports = loader
