import { GET_CONTENT_LIST } from './actionTypes'
import { GET_READY_TO_LOAD } from 'component/ScrollView/ScrollViewTypes'
import axios from 'axios';

export const getContentList = (page) => (dispatch) => {
    dispatch({
        type: GET_READY_TO_LOAD,
        obj: false
    })
    axios.get('./data/content.json').then((res)=>{
        setTimeout(()=>{
            if(res.data.errcode == 0) {
                dispatch({
                    type: GET_CONTENT_LIST,
                    list: res.data.data.list,
                    page,
                })
                dispatch({
                    type: GET_READY_TO_LOAD,
                    obj: true
                })
            }
        },1000)
    })
}