import React, {Component} from 'react';

export default function asyncComponent({loader}){
    class AsyncComponent extends Component {
        constructor(props){
            super(props);
            this.state = {
                component: null
            }
        }
        componentDidMount() {
            //执行外部promise
            loader().then(res=>{
                this.setState({
                    component: res.default
                })
            })
        }
        render(){
            const C = this.state.component
            return C ? <C {...this.props}/> : null;
        }
    }
    return AsyncComponent;
}