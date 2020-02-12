import React, { Component } from 'react';
// import Slider from 'react-slick';
require("./Header.less");
const headerImg = require('../../../../static/image/header.jpg')
/**
 * 首页头部
 */
class Header extends Component {
    render() {
        // const settings ={
        //     dots: true,
        //     arrows: false,
        //     slidesToShow: 0,
        //     swipeToSlide: true,
        //     autoplay: true
        // }
        return (
            <div className="header">
                <div className="header-img">
                    <img src={headerImg} alt=""  />
                </div>
            </div>
        )
    }
}


export default Header