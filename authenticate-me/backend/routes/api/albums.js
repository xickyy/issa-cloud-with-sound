const express = require('express');
const router = express.Router();
const { Album } = require('../../db/models');

router.post('/', async (req, res) => {
  let {title, description, imageUrl} = req.body;
  let currentUserId = req.user.id
  const newAlbum = await Album.create({
    userId: currentUserId,
    title: title,
    description: description,
    imageUrl: imageUrl
  }, {});
  res.json(newAlbum);
})

module.exports = router;
