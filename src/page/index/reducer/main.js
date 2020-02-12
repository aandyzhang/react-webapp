import tabReducer from './tabReducer.js';
import categoryReducer from './categoryReducer.js';
import contentReducer from './contentReducer.js';
import scrollViewReducer from 'component/ScrollView/ScrollViewReducer.js';

import { combineReducers } from 'redux';

const reducers = combineReducers({
    tabReducer,
    contentReducer,
    categoryReducer,
    scrollViewReducer,
});


export default reducers;