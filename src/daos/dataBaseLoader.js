import startDB from './loaderMongo.js'
// import startFirebase from './loaderFirebase.js'

class Loaders {
  start() {
    startDB()
    // startFirebase()
  }
}

const loader = new Loaders()
export default loader