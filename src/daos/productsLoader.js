import startDB from './productsDaosMongo.js'

class Loaders {
  start() {
    startDB()
  }
}

const loader = new Loaders()
export default loader