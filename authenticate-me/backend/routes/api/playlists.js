const express = require('express');
const router = express.Router();
const { Playlist } = require('../../db/models');

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
