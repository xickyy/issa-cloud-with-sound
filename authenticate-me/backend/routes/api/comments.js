const express = require('express');
const router = express.Router();
const { Album, User, Song, Comment} = require('../../db/models');

router.put('/:commentId', async (req, res, next) => {
  const commentId = parseInt(req.params.commentId)
  const comment = await Comment.findOne({ where: {id: commentId}});
  const {body} = req.body;
  if(comment && comment.id === commentId) {
    const update = await comment.update({
      body: body
    });
    res.json(update);
  } else {
    const e = new Error('Could not find a comment with the specified id');
    e.status = 404;
    return next (e);
  }
});

router.delete('/:commentId', async (req, res, next) => {
  const commentId = parseInt(req.params.commentId);
  const comment = await Comment.findOne({ where: {id: commentId}});
  if(comment && comment.id === commentId) {
    await comment.destroy();
    res.json('Comment successfully deleted');
  } else {
    const e = new Error('Could not find a comment with the specified id');
    e.status = 404;
    return next (e);
  }
});

module.exports = router;
