import { GET_CATEGORY_LIST } from './actionTypes.js';
// import { getData } from '../../../utils/request';
import { get } from '../../../utils/request';
// import axios from 'axios';

export const getCategoryList = () => async (dispatch) => {
    // axios.get('/data/category.json').then((res)=>{
    //     if(res.data.errcode == 0) {
    //         dispatch({
    //             type: GET_CATEGORY_LIST,
    //             list: res.data.data.list
    //         })
    //     }
    // })
    // get('/data/category.json').then(res=>{
    //     if(res.errcode === 0){
    //         dispatch({
    //             type: GET_CATEGORY_LIST,
    //             list: res.data.list
    //         })
    //     }
    // })
    // getData('/data/category.json').then(res=>{
    //     if(res.errcode == 0) {
    //         dispatch({
    //             type: GET_CATEGORY_LIST,
    //             list: res.data.list
    //         })
    //     }
    // },err=>{
    //     console.log('err',err)
    // })
    // const result = await getData('/data/category.json');
    // if(result.errcode === 0){
    //     dispatch({
    //         type: GET_CATEGORY_LIST,
    //         list: result.data.list
    //     })
    // }

    // const res = getData('/data/category.json');
    // if(res.errcode === 0){
    //     dispatch({
    //         type: GET_CATEGORY_LIST,
    //         list: res.data.list
    //     })
    // }

    const result = await get('/data/category.json');
    console.log(result)
    if(result.errcode === 0){
        dispatch({
            type: GET_CATEGORY_LIST,
            list: result.data.list
        })
    }
}