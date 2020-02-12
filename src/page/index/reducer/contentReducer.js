import { GET_CONTENT_LIST } from '../actions/actionTypes'
let initList = {
    list: [],
    page: 0,
}

const getList = (state,action) => {
    let _listData = [];
    let _page = action.page || 0;
    if(_page === 0){
        _listData = action.list;
    }else{
        _listData = state.list.concat(action.list);
    }
    // _page +=1;
    // if()
    return {...state, list: _listData}
}
export default (state = initList, action)=> {
    switch(action.type){
        case GET_CONTENT_LIST:
            return getList(state,action);
        default:
            return state;
    }
}