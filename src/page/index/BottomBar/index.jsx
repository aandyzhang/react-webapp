import './index.less';
import React, { Component } from "react";
// import { connect } from "react-redux";
import { connect } from '../../../utils/my-react-redux'
import { Link } from 'react-router-dom'
import * as actions  from '../actions/tabAction.js';
/**
 * 首页底部tab栏
 */
class BottomBar extends Component {
    constructor(props){
        super(props)
    }
    renderItem(){
        let tabs = this.props.tabs;
        return tabs.map((item,index)=> {
            let itemIcon = item.key + ' btn-item';
            if(item.key === this.props.activeKey){
                itemIcon += ' active';
            }
            return (
                <Link key={index} to={'/'+item.key} className= {itemIcon} onClick={()=>{this.props.changeTab(item.key)}}>
                    <div className="tab-icon"></div>
                    <div className="btn-name">{item.name}</div>
                </Link>
            )
        })
    }
    render(){
        return (
            <div className="bottom-bar">
                {this.renderItem()}
            </div>
        )
    }
}
const mapStateProps = (state)=> ({
    tabs: state.tabReducer.tabs,
    activeKey: state.tabReducer.activeKey
})
const mapDispatchProps =(dispatch) => {
    return {
        changeTab(name){
            dispatch(actions.changeTabAction(name));
        }
    }
}
export default connect(mapStateProps, mapDispatchProps)(BottomBar);