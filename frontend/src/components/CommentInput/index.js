import "./CommentInput.css"

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newComment } from "../../store/comments";
import { useParams } from "react-router-dom";


const CommentInput = () => {

  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const {songId} = useParams();

  const handleSubmit = async (e) => {
      e.preventDefault();
      await dispatch(newComment(songId));
    }


  return (
    <form onSubmit={handleSubmit()}>
      <label>
        Create Comment
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </label>
      <input type="submit" />
    </form>
  )
}

export default CommentInput;
