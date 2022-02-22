import { type } from '../Types/index'

const initialState = {
    jwtToken: '',
    user: {}
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case type.SET_JWT: return {
            ...state,
            jwtToken: action.payload 
        }

        case type.SET_USER: return {
            ...state,
            user: action.payload
        }

        case type.LOG_OUT: return {
            jwtToken : "",
            user : {}
        }

        default: 
            return state
    }
}

export default authReducer