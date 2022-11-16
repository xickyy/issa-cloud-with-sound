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
});

router.get('/', async (req, res) => {
  const all = await Album.findAll();
  res.status(200);
  res.json(all);
});


router.get('/current', async(req, res) => {
  const allCurrent = await Album.findAll({where: {userId: req.user.id}});
  res.json(allCurrent);
})

module.exports = router;
