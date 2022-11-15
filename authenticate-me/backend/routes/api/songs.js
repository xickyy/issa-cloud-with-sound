const express = require('express');
const router = express.Router();
const { Song } = require('../../db/models');


router.get('/', async(req, res) => {
  const all = await Song.findAll();
  res.status(200);
  res.json(all);
});


router.post('/', async(req, res) => {
  let {title, description, url, imageUrl, albumId} = req.body
  let currentUserId = req.user.id
  const newSong = await Song.create({
    userId: currentUserId,
    title: title,
    description: description,
    url: url,
    imageUrl: imageUrl,
    albumId: albumId
  }, {});
  res.json(newSong)
});

module.exports = router;
