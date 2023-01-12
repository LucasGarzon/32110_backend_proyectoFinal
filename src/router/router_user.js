const express = require('express');
const {UsuariosMongo} = require('../controllers/userManagerMongo.js');
const passport = require('passport');
const telCodes = require('../config/countryCodes.json')
require('../strategies/localStrategies.js')

const router = express.Router();
const manager = new UsuariosMongo()

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup', {countryCodes: telCodes});
});

router.get('/registerError', (req, res) => {
  res.render('errors/registerError')
})

router.post('/signup', manager.createUser);

router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

const userRouter = router;
module.exports = {userRouter};
