import { combineReducers } from 'redux'

import authReducer from './auth_details/reducers'

const rootReducer = combineReducers({
  admin: authReducer
})

export default rootReducer
