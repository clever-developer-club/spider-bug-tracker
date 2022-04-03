import { createStore} from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'
// import logger from 'redux-logger'
import { loadState } from '../../Utils/StorageUtils'
import rootReducer from '../Reducers/index'
// import reduxThunk from 'redux-thunk';

const preLoadedState = {
    authReducer : loadState('authState'),
    bugReducer: loadState('bugState')
}

const store = createStore(rootReducer,preLoadedState)

export default store