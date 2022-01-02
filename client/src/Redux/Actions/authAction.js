import { type } from '../Types/index'

const actions = {
    setJWT : (payload) => {
        return {type : type.SET_JWT, payload}
    },

    setUser : (payload) => {
        return {type : type.SET_USER, payload}
    },
    
    logOut : (payload = null) => {
        return {type : type.LOG_OUT, payload}
    }
}

export default actions