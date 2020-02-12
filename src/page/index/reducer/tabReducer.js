import { TABKEY } from '../config.js';
import * as actionTypes from '../actions/actionTypes';
const defaultState = {
    tabs: [
        {
            name: "首页",
            key: TABKEY.home
        },
        {
            name: "nocv",
            key: TABKEY.order,
        },
        {
            name: "我的",
            key: TABKEY.my
        }
    ],
    activeKey: TABKEY.home
}
const changeActiveKey = (state,action) => {
    let activeKey = action.name;
    return {...state, activeKey:activeKey}
}
export default (state = defaultState, action)=>{
    switch(action.type){
        case actionTypes.ACTIVEKEY :
            return changeActiveKey(state,action);
        default:
            return state;
    }
}