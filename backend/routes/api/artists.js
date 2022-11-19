const express = require('express');
const router = express.Router();
const { User, Album } = require('../../db/models');

router.get('/:userId/albums', async (req, res, next) => {
  const userId = req.user.id;
  const user = await User.findByPk(userId);
  if(userId && user.id === userId) {
    const userAlbums = await Album.findAll({where: {userId: userId}});
    res.json(userAlbums);
  } else {
    const e = new Error('No such user exists with this id');
    e.status = 404;
    return next(e);
  }

});

module.exports = router;
