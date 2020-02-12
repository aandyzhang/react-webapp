import React from 'react';
import { hot } from 'react-hot-loader';
import Main from './Main'

class Container extends React.Component {
    render(){
        return (
            <Main />
        )
    }
}

export default hot(module)(Container)