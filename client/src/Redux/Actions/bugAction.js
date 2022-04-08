import { type } from '../Types/index'

const actions = {
    setBUG : (payload) => {
        return {type : type.SET_BUG, payload}
    },

    // removeBUG : (payload) => {
    //     return {type : type.REMOVE_BUG, payload}
    // },
    
    // updateBUG : (payload) => {
    //     return {type : type.UPDATE_BUG, payload}
    // }
}

export default actions