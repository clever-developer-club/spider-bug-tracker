import { combineReducers } from 'redux'
import authReducer from './authReducer'
import bugReducer from './bugReducer'

export default combineReducers({
    authReducer,
    bugReducer   
})