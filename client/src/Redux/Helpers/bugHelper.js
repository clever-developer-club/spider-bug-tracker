import store from '../Store/index'
import actions from '../Actions/bugAction'
import {saveState} from '../../Utils/StorageUtils'

export const getBug = () => {
    return store.getState().bugReducer.bugs
}

export const saveBug = () => {
    saveState('bugState',getBug())
}

export const setBUG = (bugs) => {
    store.dispatch(actions.setBUG(bugs))
    saveBug()
}

// export const getCartLength = () => {
//     return store.getState().cartReducer.cart.length
// }

// export const addToCart = (product,quantity) => {
//     let existingProduct = getCart().cart.find(p => p._id === product._id)
//     if(existingProduct !== undefined) return
//     product.quantity = quantity
//     let payload = {
//         product,
//         amount : product.price*quantity
//     }
//     store.dispatch(actions.addToCart(payload))
//     saveCart()
// }

// export const removeBUG = (bugId) => {
//     let bug = getBug().bugs.find(bug => bug._id === bugId)
//     if(bug === undefined) return
//     let payload = {
//         id : bugId,
//         // amount : (product.price)*(product.quantity)
//     }
//     store.dispatch(actions.removeBUG(payload))
//     saveBug()
// }

// export const updateBUG = (bugID,status) => {
//     let bug = getBug().bugs.find(bug => bug._id === bugId)
//     if(bug === undefined) return
//     let payload = {
//         id : productId,
//         status,
//         // amount: (quantity - product.quantity)*product.price
//     }
//     store.dispatch(actions.updateBUG(payload))
//     saveBug()
// }

// export const clearCart = () => {
//     store.dispatch(actions.clearCart())
//     saveCart()
// }