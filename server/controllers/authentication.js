/* eslint-disable new-cap */

import express from 'express';
import passport from 'passport';
import User from '../models/user';
const router = module.exports = express.Router();

// register
router.post('/register', (req, res) => {
  User.create(req.body, (err, user) => {
    if (!user) {
      return res.status(400).send();
    }

    return res.status(200).send();
  });
});

// login
router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const token = req.user.token();
  res.send({ token });
});
