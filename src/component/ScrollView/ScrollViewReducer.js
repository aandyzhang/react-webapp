import {GET_READY_TO_LOAD} from './ScrollViewTypes'
let initData = {
    readyToLoad: true
}
const dealData=(state,action)=>{
    return {...state,readyToLoad: action.obj}
}
export default(state = initData,action)=>{
    switch(action.type){
        case GET_READY_TO_LOAD:
            return dealData(state,action);
        default:
            return state
    }
}