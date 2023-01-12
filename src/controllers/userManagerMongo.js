const User = require('../models/userModel.js')

class UsuariosMongo { 
  // Crear usuario
  async createUser(req, res, next) {
    const { username, name, email, password, address, age, phone} = req.body;
    let user = await User.findOne({email})
    if (user) res.redirect('/registerError')
    user = await User.create({
      username,
      name,
      email,
      password,
      address,
      age,
      phone
    })
    res.redirect('/login')
    // await User.findOne({ email, username }, (err, user) => {
    //   if (err) {
    //     return next(err);
    //   }
    //   if (user) {
    //     return res.status(400).send({ message: 'El usuario/email ya esta registrado' });
    //   }
    //   const newUser = new User({ username, name, email, password, address, age, phone, photo });
    //   newUser.save((err) => {
    //     if (err) {
    //       return next(err);
    //     }
    //     req.login(newUser, (err) => {
    //       if (err) {
    //         return next(err);
    //       }
    //       res.send({ message: 'Usuario registrado exitosamente!' });
    //     });
    //   });
    // });
  }
}

module.exports = { UsuariosMongo }
