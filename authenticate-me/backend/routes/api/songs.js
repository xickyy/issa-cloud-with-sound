const express = require('express');
const router = express.Router();
const { Song } = require('../../db/models');


router.get('/', async(req, res) => {
  const all = await Song.findAll();
  res.status(200);
  res.json(all);
});

module.exports = router;
