import { GET_LIST } from '../actions/actionTypes'
const initList = {
    lists: []
}

const handleList = (state,action)=> {
    return { ...state, lists: action.data}
}
export default (state = initList, action) => {
    switch(action.type) {
        case GET_LIST:  
            return handleList(state,action);
        default: return state;
    }
}