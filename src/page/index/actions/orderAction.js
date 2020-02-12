import { GET_LIST } from './actionTypes'
import { GET_READY_TO_LOAD } from 'component/ScrollView/ScrollViewTypes'
import axios from 'axios';

export const getList = () => (dispatch) => {
    dispatch({
        type: GET_READY_TO_LOAD,
        obj: false
    })
    axios.get('https://data-ncov.webfamily.workers.dev').then((res)=>{
        if(res.status == 200) {
            dispatch({
                type: GET_LIST,
                data: res.data,
            })
            dispatch({
                type: GET_READY_TO_LOAD,
                obj: true
            })
        }else{
            alert('数据获取失败')
        }
    })
}