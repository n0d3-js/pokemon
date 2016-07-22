/* eslint-disable new-cap */

import express from 'express';
import Pokemon from '../models/pokemon';
import passport from 'passport';
const router = module.exports = express.Router();
const auth = passport.authenticate('jwt', { session: false });

// index
router.get('/', auth, (req, res) => {
  res.send({ pokemon: req.user.pokemon });
});

// create
router.post('/', auth, (req, res) => {
  Pokemon.create(req.body, (err, pokemon) => {
    req.user.update({ $push: { pokemon } }, () => {
      res.send({ pokemon });
    });
  });
});
