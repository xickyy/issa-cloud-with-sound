const express = require('express');
const router = express.Router();
const { Playlist, Song, PlaylistSong} = require('../../db/models');

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
  const {songId} = req.body;
  const playlistId = parseInt(req.params.playlistId);
  const song = await Song.findOne({where: {id: songId}});
  const playlist = await Playlist.findByPk(playlistId);
  if((song && song.id === songId) && (playlist && playlist.id === playlistId)) {
    const addedSong = await PlaylistSong.create({
      songId: songId,
      playlistId: playlistId
    });
    res.json(addedSong);
  } else {
    const e = new Error("Either the playlist or the song does not exist with the specified id's");
  e.status = 404;
  return next(e);
  }
});


router.get('/current', async (req, res, next) => {
  const user = req.user.id;
  const playlists = await Playlist.findAll({ where: {userId: user}});
  res.json(playlists);
});

router.get('/:playlistId', async (req, res, next) => {
  console.log('hitting wrong route')
  const playlistId = parseInt(req.params.playlistId);
  const playlist = await Playlist.findByPk(playlistId);
  const songsLink = await PlaylistSong.findAll({where: {playlistId: playlistId}});
  const songs = [];

  if (playlist && playlist.id === playlistId) {
    for(let i = 0; i < songsLink.length; i++) {
      let songId = songsLink[i].songId;
      let song = await Song.findByPk(songId);
      songs.push(song);
    }
    playlist.dataValues.songs = songs
    res.json(playlist);
  } else {
    const e = new Error("Playlist does not exist with the specified id");
    e.status = 404;
    return next(e);
  }
})


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





router.delete('/:playlistId', async (req, res, next) => {
  const playlistId = parseInt(req.params.playlistId);
  const playlist = await Playlist.findOne({ where: {id: playlistId}});
  if(playlist && playlist.id === playlistId) {
    await playlist.destroy();
    res.json('Playlist successfully deleted');
  } else {
    const e = new Error('Could not find a playlist with the specified id');
    e.status = 404;
    return next (e);
  }
});

module.exports = router;
