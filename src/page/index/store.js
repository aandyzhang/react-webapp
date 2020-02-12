import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import mainReducer from './reducer/main.js';

const store = createStore(mainReducer, applyMiddleware(thunk));
// if (module.hot) {
//     module.hot.accept('./reducer/main', ()=>{
//         const nextRootReducer = require('./reducer/main.js').default;
//         store.replaceReducer(nextRootReducer)
//     });
// }

export default store;