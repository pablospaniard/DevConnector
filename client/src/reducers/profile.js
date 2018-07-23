import * as constants from '../actions/constants'

const initialState = {
  profile: null,
  profiles: null,
  loading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case constants.PROFILE_LOADING:
      return {
        ...state,
        loading: true
      }
    case constants.GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      }
    case constants.GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      }
    case constants.CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      }
    default:
      return state
  }
}
