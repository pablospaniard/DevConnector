import axios from 'axios'

import * as constants from './constants'

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading())
  axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: constants.GET_PROFILE,
        payload: res.data,
      }),
    )
    .catch(err =>
      dispatch({
        type: constants.GET_PROFILE,
        payload: {},
      }),
    )
}

export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: constants.GET_ERRORS,
        payload: err.response.data,
      }),
    )
}

export const setProfileLoading = () => {
  return {
    type: constants.PROFILE_LOADING,
  }
}

export const clearCurrentProfile = () => {
  return {
    type: constants.CLEAR_CURRENT_PROFILE,
  }
}
