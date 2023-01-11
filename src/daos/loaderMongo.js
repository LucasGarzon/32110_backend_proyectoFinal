import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/proyectoFinal";

export default async function startDB(){
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('base de datos Mongo conectada!');
  } catch (err) {
    console.log('Error al conectar a la base de datos Mongo: ',err);
  }
}
