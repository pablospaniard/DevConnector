import axios from 'axios'

import * as constants from './constants'

// Add Post
export const addPost = postData => dispatch => {
  dispatch(clearErrors())
  axios
    .post('/api/posts', postData)
    .then(res => dispatch({type: constants.ADD_POST, payload: res.data}))
    .catch(err =>
      dispatch({type: constants.GET_ERRORS, payload: err.response.data})
    )
}

// Get Posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading())
  axios
    .get('/api/posts')
    .then(res => dispatch({type: constants.GET_POSTS, payload: res.data}))
    .catch(err => dispatch({type: constants.GET_POSTS, payload: null}))
}

// Get Post
export const getPost = id => dispatch => {
  dispatch(setPostLoading())
  axios
    .get(`/api/posts/${id}`)
    .then(res => dispatch({type: constants.GET_POST, payload: res.data}))
    .catch(err => dispatch({type: constants.GET_POST, payload: null}))
}

// Delete Post
export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res => dispatch({type: constants.DELETE_POST, payload: id}))
    .catch(err =>
      dispatch({type: constants.GET_ERRORS, payload: err.response.data})
    )
}

// Add Like
export const addLike = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: constants.GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Remove Like
export const removeLike = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: constants.GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Add Comment
export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors())
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res => dispatch({type: constants.GET_POST, payload: res.data}))
    .catch(err =>
      dispatch({type: constants.GET_ERRORS, payload: err.response.data})
    )
}

// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res => dispatch({type: constants.GET_POST, payload: res.data}))
    .catch(err =>
      dispatch({type: constants.GET_ERRORS, payload: err.response.data})
    )
}

// Set loading state
export const setPostLoading = () => {
  return {type: constants.POST_LOADING}
}

// Clear errors
export const clearErrors = () => {
  return {type: constants.CLEAR_ERRORS}
}
