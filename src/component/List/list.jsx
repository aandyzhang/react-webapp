import React from 'react';
import axios from 'axios';
import moment from 'moment'
require('./list.less')

class List extends React.Component {
    state = {
        list: [],
        sliceList: [],
        showMore: true
    }
    componentDidMount() {
        axios.get(`https://file1.dxycdn.com/2020/0130/492/3393874921745912795-115.json?t=${46341925 + Math.random()}`).then((res) => {
            if (res.data.code == 'success') {
                this.setState({
                    list: res.data.data,
                    sliceList: res.data.data.slice(0, 10)
                })
            } else {
                alert('数据获取失败')
            }
        })
    }
    getMoreList(i) {
        const { list,sliceList } = this.state;
        this.setState({
            sliceList: [...sliceList, ...list.slice(10,10*i)],
            showMore: false
        })
    }
    render() {
        const { sliceList,showMore } = this.state;
        return (
            <div>
                {
                    sliceList.length > 0 ? sliceList.map((item, key) => {
                        return (
                            <div className="list" key={key}>
                                <div className="list-time">
                                    <span className="pubDate">{moment(item.pubDate).format('YYYY-MM-DD HH:mm:ss')}</span>
                                    <span className="pubDateStr">{item.pubDateStr}</span>
                                </div>
                                <div className="title">
                                    <a href={item.sourceUrl}>{item.title}</a>
                                </div>
                                <div className="summary">
                                    {item.summary}
                                </div>
                            </div>
                        )
                    }) : null
                }
                {showMore ? <div className="more" onClick={()=>{this.getMoreList(2)}}>点击查看更多</div> : null} 
            </div>
        )
    }
}

export default List