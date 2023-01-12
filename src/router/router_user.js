import express from 'express';
import { UsuariosMongo } from '../controllers/userManagerMongo.js';
import passport from 'passport';
import '../strategies/localStrategies.js'

const router = express.Router();
const manager = new UsuariosMongo()

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', manager.createUser);

router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

const userRouter = router;
export {userRouter}