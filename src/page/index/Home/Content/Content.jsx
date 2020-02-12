import React, { Component } from 'react';
require('./Content.less')
// import { connect } from 'react-redux';
import { connect } from '../../../../utils/my-react-redux'
import ScrollView from 'component/ScrollView/ScrollView';
import { getContentList } from '../../actions/contentAction'
class Content extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isend: false
        }
        this.page = 0;
    }
    componentDidMount(){
        this.fetchData();
    }
    fetchData(page){
        // this.props.dispatch(getContentList(page))
        this.props.getContentList1(page)
    }
    onLoadPage() {
        this.page ++;
        if(this.page > 3){
            this.setState({
                isend: true
            })
        }else{
            this.fetchData(this.page)
        }
    }
    renderItem() {
        const { list } = this.props
        return list.map((item,index)=> {
            return (
                <div className="content-item" key={index}>
                    <div className="content-item-left">
                        <img src={require('static/image/list.jpg')} alt=""/>
                    </div>
                    <div className="content-item-right">
                        <div className="content-title two-line">{item.des}</div>
                        <div className="content-des">
                            <span style={{ width: '20px'}}>中级</span>
                            <span className="count">{item.count} 人</span>
                        </div>
                    </div>
                </div>
            )
        })
    }
    render() {
        return (
            <div className="content clearfix">
                <ScrollView isend={this.state.isend} loadCallback={this.onLoadPage.bind(this)}>
                    {this.renderItem()}
                </ScrollView>
            </div>
        )
    }
}

export default connect((state)=> ({
    list: state.contentReducer.list
}),(dispatch)=>({
    getContentList1: (page)=>{
        dispatch(getContentList(page))
    }
}))(Content)