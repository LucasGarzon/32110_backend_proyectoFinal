import admin from "firebase-admin"
import fs from 'fs'

// export async function startFirebase() {
//   //Leer JSON con claves
// }
var serviceAccount = JSON.parse(fs.readFileSync("./serviceAccountKey.json", 'utf-8'));
//Inicializar la bd
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
console.log('Base de datos Firestore conectada!')

const db = admin.firestore()
export default db



