import React from 'react';
// import { connect } from 'react-redux';
import {connect} from '../../utils/my-react-redux'
import Loading from '../Loading/Loading';
// require('./ScrollView.less');
/**
 * 上拉加载更多组件 <ScrollView isend={bool} loadCallback={func}></ScrollView>
 */
//防抖
// const debounce =(fn,wait)=>{
//     let timer;
//     return function(){
//         let _this = this;
//         if(timer){
//             clearTimeout(timer)
//         }
//         timer = setTimeout(()=>{
//             fn.call(_this,...arguments)
//         },wait)
//     }
// }
class ScrollView extends React.Component {
    constructor(props){
        super(props);
        this._onLoadPage = this.onLoadPage.bind(this);
        this.loadingHeight = 40;
    }
    onLoadPage(){
        let clientHeight = document.documentElement.clientHeight;
        let scrollHeight = document.body.scrollHeight;
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        let proLoadDis = 30;

        if((clientHeight + scrollTop) >= (scrollHeight - proLoadDis)) {
            if(!this.props.isend){  //是否还能滚动
                if(!this.props.readyToLoad){ //接口是否响应成功
                    return;
                }
                // this.props.loadCallback && debounce(this.props.loadCallback.bind(this),1000)()
                this.props.loadCallback && this.props.loadCallback()
            }
        }
    }
    //节流
    throttle(fn,wait) {
        let timer;
        return function() {
            let _this = this;
            if(!timer){
                timer = setTimeout(()=> {
                    fn.call(_this,...arguments);
                },wait)
            }
        }
    }
    throttle2(fn,wait) {
        let pre = 0;
        return function(){
            const _this =this;
            let now = Date.now();
            if(now - pre >= wait) {
                fn.call(_this,...arguments);
                pre = now;
            }
        }
    }
    componentDidMount(){
        window.addEventListener('scroll', this._onLoadPage);
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this._onLoadPage);
    }
    renderLoad(){
        return !this.props.isend ? <Loading loadingHeight={this.loadingHeight}/> : null;
    }
    render() {
        return (
            <div className="scrollView">
                {this.props.children}
                {this.renderLoad()}
            </div>
        )
    }
}

export default connect((state)=>({
    readyToLoad: state.scrollViewReducer.readyToLoad
}))(ScrollView);