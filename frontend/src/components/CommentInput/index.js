import "./CommentInput.css"

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newComment } from "../../store/comments";
import { useParams, useHistory } from "react-router-dom";
import { getComments } from "../../store/comments";


const CommentInput = () => {

  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const history = useHistory();
  const { songId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const commentobj = await dispatch(newComment(songId, comment));
    if (commentobj) {
      history.push(`/songs/${commentobj.songId}`)
      setComment('')
      dispatch(getComments(songId))
    }
  }


  return (
    <form onSubmit={handleSubmit}>
      <label>
        Create Comment
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </label>
      <button>Submit</button>
    </form>
  )
}

export default CommentInput;
