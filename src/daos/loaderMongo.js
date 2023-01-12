const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/proyectoFinal";

async function startDB(){
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('base de datos Mongo conectada!');
  } catch (err) {
    console.log('Error al conectar a la base de datos Mongo: ',err);
  }
}

module.exports = {startDB}
