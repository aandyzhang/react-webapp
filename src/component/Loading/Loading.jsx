import React from 'react';
require('./Loading.less')
class Loading extends React.Component{
    render() {
        return (
            <div className="loading" style={{height: this.props.loadingHeight}}>
                <div className="loading-icon"></div>
            </div>
        );
    }
}
export default Loading