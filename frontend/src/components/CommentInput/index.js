import "./CommentInput.css"

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newComment } from "../../store/comments";
import { useParams, useHistory } from "react-router-dom";
import { getComments } from "../../store/comments";


const CommentInput = () => {

  const [comment, setComment] = useState('')
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch()
  const history = useHistory();
  const { songId } = useParams();
  const sessionUser = useSelector(state => state.session.user);

  const handleSubmit = async (e) => {
    setErrors([]);
    e.preventDefault();
    const commentobj = await dispatch(newComment(songId, comment))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    if (commentobj) {
      history.push(`/songs/${commentobj.songId}`)
      setComment('')
      dispatch(getComments(songId))
    }
  }

  if (sessionUser) {
    return (
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
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
  } else {
    return (
      <h4>Please sign in to leave a comment</h4>
    )
  }
}

export default CommentInput;
