import mongoose from 'mongoose'

const uri = "mongodb+srv://coderuser:m0UT39tsieEmsxJ5@codercluster.q42yf0t.mongodb.net/?retryWrites=true&w=majority";
// export const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

export default async function startDB(){
  await mongoose.connect(uri, (err) => {
    if (err) return console.log('error al conectar a la base de datos')
    console.log('base de datos Mongo conectada!');
  })
}

