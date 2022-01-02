import { createStore } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'
// import logger from 'redux-logger'
import { loadState } from '../../Utils/StorageUtils'
import rootReducer from '../Reducers/index'

const preLoadedState = {
    authReducer : loadState('authState'),

}

const store = createStore(rootReducer, preLoadedState)

export default store