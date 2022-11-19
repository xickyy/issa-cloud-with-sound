const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album, Playlist } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];


// Sign up
router.post('/',
validateSignup,
  async (req, res, next) => {
    const { email, password, username, firstName, lastName } = req.body;
    const userExists = await User.findOne({where: {email}});
    if(userExists){
     const e = new Error('User already exists');
     e.status = 403;
     return next(e)

    }
    const user = await User.signup({ email, username, password, firstName, lastName });
    user.dataValues.token = req.cookies.token
    await setTokenCookie(res, user);

    return res.json({
      user
    });
  }
);


router.get('/:userId', async (req, res, next) => {
  const userId = parseInt(req.params.userId);
  const user = await User.findOne({where: {id: userId}});
  if(user && user.id === userId) {
    const songs = await Song.findAll({where: {userId: userId}});
    const albums = await Album.findAll({where: {userId: userId}});
    let totalSongs = 0;
    let totalAlbums = 0;
    let songImages = []
    for(let i = 0; i < songs.length; i++) {
      totalSongs++
      songImages.push(songs[i].imageUrl)
    }
    for(let i = 0; i < albums.length; i++) {
      totalAlbums++
    }
    user.dataValues.totalSongs = totalSongs;
    user.dataValues.totalAlbums = totalAlbums;
    user.dataValues.songImages = songImages;
    res.json(user)
  } else {
    const e = new Error("Could not find a user with that id");
    e.status = 404;
    return next(e);
  }
});

router.get('/:userId/songs', async (req, res, next) =>{
  const userId = parseInt(req.params.userId);
  const user = await User.findOne({where: {id: userId}});
  if(user && user.id === userId) {
    const songs = await Song.findAll({where: {userId: userId}});
    res.json(songs);
  } else {
    const e = new Error("Could not find a user with that id");
    e.status = 404;
    return next(e);
  }
});

router.get('/:userId/playlists', async (req, res, next) => {
  const userId = parseInt(req.params.userId);
  const user = await User.findOne({where: {id: userId}});
  const allPlaylists = await Playlist.findAll({where: {userId: userId}});
  if (user && (user.id === userId)) {
    res.json(allPlaylists);
  } else {
    const e = new Error("Could not find a user with that id");
    e.status = 404;
    return next(e);
  }
});

module.exports = router;
