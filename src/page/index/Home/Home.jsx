import React, { Component } from 'react';
// import Loadable from 'react-loadable';
import Category from './Category/Category'
import Header from './Header/Header'
import Content from './Content/Content'
// import Loading from 'component/Loading/Loading';

// const Content = Loadable({
//   loader: ()=> import(/* webpackChunkName: "content" */'./Content/Content'),
//   loading: Loading,
// })
/**
 * 首页
 */
class Home extends Component { 
  render() {
    return (
      <div>
          <Header/>
          <Category />
          <Content />
      </div>
    )
  }
}

export default Home;