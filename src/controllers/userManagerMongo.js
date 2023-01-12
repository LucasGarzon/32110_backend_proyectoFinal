import User  from '../models/userModel.js'

export class UsuariosMongo { 
  // Crear usuario
  async createUser(req, res, next) {
    const { name, email, password, address, age, phone, photo} = req.body;
    User.findOne({ email }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (user) {
        return res.status(400).send({ message: 'El email ya esta registrado' });
      }
      const newUser = new User({ name, email, password, address, age, phone, photo });
      newUser.save((err) => {
        if (err) {
          return next(err);
        }
        req.login(newUser, (err) => {
          if (err) {
            return next(err);
          }
          res.send({ message: 'Usuario registrado exitosamente!' });
        });
      });
    });
  }
  
  
}