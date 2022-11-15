const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
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

router.get('/current', requireAuth, async(req, res) => {
  let currentUser = req.user.id
  const currentSongs = await Song.findAll({where: {userId: currentUser }});
  res.json(currentSongs);
});

module.exports = router;
