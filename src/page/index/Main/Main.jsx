import React, { Component } from 'react';
import { HashRouter, Route} from "react-router-dom";
import Loadable from 'react-loadable';
import BottomBar from '../BottomBar/index';
// import Header from '../Home/Header/Header';
import Loading from 'component/Loading/Loading';
// import Order from '../Order/Order';
// import Category from '../Home/Category/Category';
// import Home from '../My/My'
// import { connect } from "react-redux";
import { connect } from '../../../utils/my-react-redux'
import asyncComponent from '../../../utils/AsyncComponent'
require('./Main.less');

//懒加载
const My = Loadable({
    loader: () => import(/* webpackChunkName: "my" */'../My/My'),
    loading: Loading,
});
// async function getComponent(){
//     // return import(/* webpackChunkName: "my" */'../My/My').then(({default:Demo})=>{
//     //     return Demo;
//     // })
//     const { default: Demo} = await import(/* webpackChunkName: "my" */'../My/My');
//     return Demo
// }

//懒加载组件  使用高阶组件
const Home = asyncComponent({
    loader:()=> import(/* webpackChunkName: "home" */'../Home/Home')
})
// const Home = Loadable({
//     loader: () => import(/* webpackChunkName: "category" */'../Home/Home'),
//     loading: Loading,
// });
// console.log('home',Home)
const Order = Loadable({
    loader: () => import(/* webpackChunkName: "order" */'../Order/Order'),
    loading: Loading,
});

class Main extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="wrapper">
                <HashRouter>
                <div>
                    {/* <Header /> */}
                    <Route path="/" component={Home} exact></Route>
                    <Route path="/home" component={Home} exact></Route>
                    <Route path="/my" component={My} exact></Route>
                    <Route path="/order" component={Order} exact></Route>
                    <BottomBar />
                </div>
                </HashRouter>
            </div>
        );
    }
}

export default connect(null,null)(Main);