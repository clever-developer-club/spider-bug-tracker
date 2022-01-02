import store from '../Store/index'
import actions from '../Actions/authAction'
import { saveState } from '../../Utils/StorageUtils'

export const getUser = () => {
    return store.getState().authReducer.user
}

export const getJWT = () => {
    return store.getState().authReducer.jwtToken
}

export const getAuthDetails = () => {
    return store.getState().authReducer
}

export const saveAuthDetails = () => {
    saveState('authState',getAuthDetails())
}

export const setJWTToken = (token) => {
	store.dispatch(actions.setJWT(token))
	saveAuthDetails()
}

export const setUser = (user) => {
	store.dispatch(actions.setUser(user))
	saveAuthDetails()
}

export const setAuthDetails = (data) => {
    store.dispatch(actions.setJWT(data.token))
    store.dispatch(actions.setUser(data.data))
    saveAuthDetails()
}

export const logOut = () => {
    store.dispatch(actions.logOut())
    saveAuthDetails()
}
