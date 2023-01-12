const express = require('express');
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { Song, User, Album, Comment } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');



router.get('/', async(req, res) => {
  // const all = await Song.findAll();
  // res.status(200);
  // res.json(all);
  let { page, size } = req.query;

  page = Number.parseInt(page);
  size = Number.parseInt(size);

  if (Number.isNaN(page) && !(page > 0)) {
    page = 1;
  }
  if (Number.isNaN(size) && !(size > 0)) {
    size = 4;
  }

  const songs = await Song.findAll({
    limit: size,
    offset: size * (page - 1),
    include: [{model: User}, {model: Album}]
  });

  return res.json({
    songs,
    page,
    size
  });
});

const validatesong = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid Title'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a description.'),
    check('url')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a Url.'),
    check('imageUrl')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a image Url.'),
    check('albumId')
    .exists()
    .isInt()
    .withMessage('Please select and album.'),
  handleValidationErrors
];

const validateComment = [
  check('body')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid comment'),
  handleValidationErrors
];


router.post('/', validatesong, async(req, res, next) => {
  let {title, description, url, imageUrl, albumId} = req.body
  let currentUserId = req.user.id
  let album = await Album.findByPk(albumId)
  if (album && (album.id == albumId)) {
    const newSong = await Song.create({
      userId: currentUserId,
      title: title,
      description: description,
      url: url,
      imageUrl: imageUrl,
      albumId: albumId
    }, {});
    res.json(newSong)
  } else {
    const e = new Error("Album couldn't be found");
    e.status = 404;
    return next(e);
  }

});

router.get('/current', requireAuth, async(req, res) => {
  let currentUser = req.user.id
  const currentSongs = await Song.findAll({where: {userId: currentUser }});
  res.json(currentSongs);
});

router.get('/:songId', async(req, res, next) => {
  let songId = req.params.songId;
  const song = await Song.findOne({where: {id: songId},
    include: [{model: User}, {model: Album}]});

  if (song && (song.id.toString() === songId)) {

    res.json(song);
  } else {
    const e = new Error("Song couldn't be found");
    e.status = 404;
    return next(e);
  }
});

router.put('/:songId', validatesong, async (req, res, next) => {
  let {title, description, url, imageUrl} = req.body;
  let reqSongId = req.params.songId;
  let currentSong = await Song.findOne({where:{id: reqSongId}});

  if (currentSong && (currentSong.id.toString() === reqSongId)) {
    const update = await currentSong.update({
      title: title,
      description: description,
      url: url,
      imageUrl: imageUrl
    },{});
    res.json(update);

  } else {
    const e = new Error("Song couldn't be found to be updated, no changes were made");
    e.status = 404;
    return next(e);
  }
});

router.post('/:songId/comments', validateComment, async (req, res, next) => {
  let {body} = req.body;
  let reqId = req.params.songId
  let song = await Song.findOne({where: {id: reqId}});
  if(song && (song.id.toString() === reqId)) {
    const comment = await Comment.create({
      body: body,
      songId: parseInt(reqId),
      userId: req.user.id
    });
    const newComment = await Comment.findByPk(comment.id, {include:{model: User}})
    res.json(newComment);
  } else {
    const e = new Error('Could not find a song with the specified Id');
    e.status = 404;
    return next(e)
  }
});


router.get('/:songId/comments', async (req, res, next) => {
  let reqId = req.params.songId;
  let song = await Song.findOne({where: {id: reqId}});
  if(song && song.id.toString() === reqId) {
    const comments = await Comment.findAll({where: {songId: reqId }, include: {model: User}});
    res.json(comments);
  } else {
    const e = new Error("No song found with the specified Id");
    e.status = 404;
    return next(e);
  }
});

router.delete('/:songId', async (req, res, next) => {
  const songId = parseInt(req.params.songId);
  const song = await Song.findOne({ where: {id: songId}});
  if(song && song.id === songId) {
    await song.destroy();
    res.json('Song successfully deleted');
  } else {
    const e = new Error('Could not find a song with the specified id');
    e.status = 404;
    return next (e);
  }
});


module.exports = router;
