import React, { Component } from 'react';
import { getCategoryList } from '../../actions/categoryAction'
// import { connect} from 'react-redux'
import { connect } from '../../../../utils/my-react-redux'
require("./Category.less")
/**
 * 中间分类菜单
 */
class Category extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.getCategoryList()
    }
    renderItem(){
        const { items } = this.props;
           return items.map((item,index)=> {
               return (
                    <div key={index} className="category-item">
                        <img src={item.url} className="category-icon" />
                        <div className="category-name">{item.name}</div>
                    </div>
               )
            })
    }
    render() {
        return (
            <div className="category clearfix">
                { this.renderItem() }
            </div>
        )
    }
}

const mapDispatch = (dispatch) =>({
    getCategoryList(){
        dispatch(getCategoryList())
    }
})
export default connect((state)=>({
    items: state.categoryReducer.items
}),mapDispatch)(Category)