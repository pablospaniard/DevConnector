import { combineReducers } from '../../../../../../../../Library/Caches/typescript/2.9/node_modules/redux'
import authReducer from './auth'
import errorReducer from './error'
import profileReducer from './profile'

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer,
})
