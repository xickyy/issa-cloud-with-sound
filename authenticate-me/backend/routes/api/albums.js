const express = require('express');
const router = express.Router();
const { Album, User, Song} = require('../../db/models');

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
});

router.get('/:albumId', async(req, res, next) => {
  const reqId = req.params.albumId;
  const album = await Album.findByPk(reqId);

  if (album && album.id.toString() === reqId) {
    const user = await User.findByPk(album.userId);
    const song = await Song.findAll({where: {albumId: reqId}});
    res.json({album, user, song});
  } else {
    const e = new Error('no such album exists with this id');
    e.status = 404;
    return next(e);
  }
});

router.put('/:albumId', async(req, res, next) => {
  let {title, description, imageUrl} = req.body;
  let reqAlbumId = req.params.albumId;
  let currentAlbum = await Album.findOne({where:{id: reqAlbumId}});

  if (currentAlbum && (currentAlbum.id.toString() === reqAlbumId)) {
    const update = await currentAlbum.update({
      title: title,
      description: description,
      imageUrl: imageUrl
    },{});
    res.json(update);

  } else {
    const e = new Error("Album couldn't be found to be updated, no changes were made");
    e.status = 404;
    return next(e);
  }
});

module.exports = router;
