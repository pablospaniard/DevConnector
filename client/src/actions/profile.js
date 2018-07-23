import axios from 'axios'

import * as constants from './constants'

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading())
  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: constants.GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: constants.GET_PROFILE,
        payload: {}
      })
    )
}

export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: constants.GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const addExperience = (data, history) => dispatch => {
  axios
    .post('/api/profile/experience', data)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: constants.GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const deleteExperience = id => dispatch => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(res =>
      dispatch({
        type: constants.GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: constants.GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const addEducation = (data, history) => dispatch => {
  axios
    .post('/api/profile/education', data)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: constants.GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const deleteEducation = id => dispatch => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then(res =>
      dispatch({
        type: constants.GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: constants.GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading())
  axios
    .get('/api/profile/all')
    .then(res =>
      dispatch({
        type: constants.GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: constants.GET_PROFILES,
        payload: null
      })
    )
}

export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete('/api/profile')
      .then(res =>
        dispatch({
          type: constants.SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: constants.GET_ERRORS,
          payload: err.response.data
        })
      )
  }
}

export const setProfileLoading = () => {
  return {
    type: constants.PROFILE_LOADING
  }
}

export const clearCurrentProfile = () => {
  return {
    type: constants.CLEAR_CURRENT_PROFILE
  }
}
