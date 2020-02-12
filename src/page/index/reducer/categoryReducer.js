import { GET_CATEGORY_LIST } from '../actions/actionTypes'
const initCategory = {
    items: []
}

const handleCategory = (state,action)=> {
    return { ...state, items: action.list}
}
export default (state = initCategory, action) => {
    switch(action.type) {
        case GET_CATEGORY_LIST:  
            return handleCategory(state,action);
        default: return state;
    }
}