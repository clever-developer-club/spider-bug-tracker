import {type} from '../Types/index'

const initialState = {
    bugs : [],
    // amount : 0
}

const bugReducer = (state = initialState,action) => {
    switch(action.type){
        case type.SET_BUG:
            return Object.assign({},state,{products : action.payload})
        // case type.REMOVE_BUG:
        //     return Object.assign({},state,{
        //         bugs : state.bugs.filter(bug => bug._id !== action.payload.id),
        //         // amount : state.amount - action.payload.amount
        //     })
        // case type.UPDATE_BUG:
        //     return Object.assign({},state,{
        //         bugs : state.bugs.map(bug => {
        //             if(bug._id === action.payload.id){
        //                 bug.status = action.payload.status
        //             }
        //             return bug
        //         }),
        //         // amount: state.amount + action.payload.amount
        //     })
        // case type.CLEAR_CART:
        //     return Object.assign({},initialState)
        default:
            return state
    }
}

export default bugReducer