export const loadState = (key) => {
    try{
        const state = localStorage.getItem(key)
        if(state) {
            return JSON.parse(state)
        }
        return undefined
    }catch(err) {
        return undefined
    }
} 

export const saveState = (key, state) => {
    try{
        const data = JSON.stringify(state)
        localStorage.setItem(key, data)
    } catch(err) {
        return undefined
    }
}