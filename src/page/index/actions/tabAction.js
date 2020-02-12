import * as actionTypes from './actionTypes.js';

export const changeTabAction = (name) =>{
    return {
        type: actionTypes.ACTIVEKEY,
        name,
    }
}