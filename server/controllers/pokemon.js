/* eslint-disable new-cap */

import express from 'express';
import Pokemon from '../models/pokemon';
const router = module.exports = express.Router();

// index
router.get('/', (req, res) => {
  Pokemon.find().exec((err, pokemon) => {
    res.send({ pokemon });
  });
});

// create
router.post('/', (req, res) => {
  Pokemon.create(req.body, (err, pokemon) => {
    res.send({ pokemon });
  });
});
