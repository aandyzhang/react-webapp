import React from 'react';
import ReactDom from 'react-dom';
// import { Provider } from 'react-redux';
import { Provider } from '../../utils/my-react-redux'
import Container from './Main/Container.jsx';
import store from './store.js';
ReactDom.render(
    <Provider store= {store}>
        <Container />
    </Provider>,
    document.getElementById("root")
)