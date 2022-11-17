const express = require('express');
const router = express.Router();
const { Playlist, Song } = require('../../db/models');

router.post('/', async (req, res) => {
  let currentUserId = req.user.id
  const {name, imageUrl} = req.body
  const playlist = await Playlist.create({
    name: name,
    imageUrl: imageUrl,
    userId: currentUserId
  });
  res.json(playlist);
});


router.post('/:playlistId/songs', async (req, res, next) => {
  const songId = req.body;
  const playlistId = parseInt(req.params.playlistId);
  const song = await Song.findByPk(songId);
  const playlist = await Playlist.findByPk(playlistId);
  if((song && song.id === songId) && (playlist && playlist.id === playlistId)) {
//still need some logic here for the route "add song to playlsit"
  } else {
    const e = new Error("Either the playlist or the song does not exists witht he specified id's");
  e.status = 404;
  return next(e);
  }
});


router.put('/:playlistId', async(req, res, next) => {
  let {name, imageUrl} = req.body;
  let reqPlaylistId = req.params.playlistId;
  let currentList = await Playlist.findOne({where:{id: reqPlaylistId}});

  if (currentList && (currentList.id.toString() === reqPlaylistId)) {
    const update = await currentList.update({
      name: name,
      imageUrl: imageUrl
    },{});
    res.json(update);

  } else {
    const e = new Error("Playlist couldn't be found to be updated, no changes were made");
    e.status = 404;
    return next(e);
  }
});

module.exports = router;
