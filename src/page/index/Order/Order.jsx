import React, { Component } from 'react';
import Header from '../Home/Header/Header';
import cls from 'classnames'
import ReactEcharts from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/map'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/visualMap'
import List from '../../../component/List/list'
import provinces from '../../../data/area.json';
import overall from '../../../data/overall.json';
require('./Order.less');

class Order extends Component {
    state = {
        cities: []
    }
    componentDidMount() {
        import(`echarts/map/json/china.json`).then(map => {
            echarts.registerMap('china', map.default)
        })
    }
    render() {
        return (
            <div>
                <Header />
                <div className="nocv-list">
                    <div className="nocv-item">
                        <div className="nocv-item-number error-color">
                            {overall.confirmedCount}
                        </div>
                        <div className="nocv-item-desc">确诊</div>
                        <div className="nocv-item-incr">较昨日 <span className="error-color">+{overall.confirmedIncr}</span></div>
                    </div>
                    <div className="nocv-item">
                        <div className="nocv-item-number warning-color">
                            {overall.suspectedCount}
                        </div>
                        <div className="nocv-item-desc">疑似</div>
                        <div className="nocv-item-incr">较昨日 <span className="warning-color">+{overall.suspectedIncr}</span></div>
                    </div>
                    <div className="nocv-item">
                        <div className="nocv-item-number grey-color">
                            {overall.deadCount}
                        </div>
                        <div className="nocv-item-desc">死亡</div>
                        <div className="nocv-item-incr">较昨日 <span className="grey-color">+{overall.deadIncr}</span></div>
                    </div>
                    <div className="nocv-item">
                        <div className="nocv-item-number success-color">
                            {overall.curedCount}
                        </div>
                        <div className="nocv-item-desc">治愈</div>
                        <div className="nocv-item-incr">较昨日 <span className="success-color">+{overall.curedIncr}</span></div>
                    </div>
                </div>
                <div className="note" >
                    <div className="note-item">
                        <span className="red"></span>
                        <div className="note-desc">
                            {overall.note1}
                        </div>
                    </div>
                    <div className="note-item">
                        <span className="red"></span>
                        <div className="note-desc">
                            {overall.note2}
                        </div>
                    </div>
                    <div className="note-item">
                        <span className="red"></span>
                        <div className="note-desc">
                            {overall.note3}
                        </div>
                    </div>
                    <div className="note-item">
                        <span className="red"></span>
                        <div className="note-desc">
                            {overall.remark1}
                        </div>
                    </div>
                </div>
                <div className="map">
                    <ReactEcharts
                        echarts={echarts}
                        option={this.getOption()}
                        lazyUpdate={true}
                    />
                </div>
                <div className="nocv-detail">
                    <h2>国内疫情</h2>
                    <div className="nocv-title-item">
                        <div className="grey-color">地区</div>
                        <div className="error-color">确诊</div>
                        <div className="grey-color">死亡</div>
                        <div className="success-color">治愈</div>
                    </div>
                    <div className="nocv-detail-item">
                        {
                            this.renderItem()
                        }
                    </div>
                </div>
                <div className="article">
                    <h2>实时资讯</h2>
                    <List />
                </div>
                <div className="symptom-title">
                    <h2>症状表现</h2>
                    <div className="symptom-list">
                        <div className="symptom-text">
                            <span className="emphasis-icon"></span>
                            <a href="https://mdeer.taobao.com/guide/h5/science/article/168108">北京卫健委：新型肺炎症状自我评估办法</a>
                        </div>
                        <div className="symptom-text">
                            <span className="emphasis-icon"></span>
                            <a href="https://mdeer.taobao.com/guide/h5/science/article/168115">扩散！武汉协和医院最新治疗方案</a>
                        </div>
                        <div className="symptom-text">
                            <span className="emphasis-icon"></span>
                            <a href="https://mdeer.taobao.com/guide/h5/science/article/168110">出现这五类症状，应高度警惕新型肺炎</a>
                        </div>
                        <div className="symptom-text">
                            <span className="emphasis-icon"></span>
                            <a href="https://mdeer.taobao.com/guide/h5/science/article/167752">记住3句就医建议</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    chooseProvince(item) {

        this.setState({
            cities: this.state.cities.length > 0 ? [] : item.cities
        })
    }
    renderItem() {
        const { cities } = this.state;
        return provinces.map((item, key) => {
            return (
                <div key={key} >
                     <div className="nocv-province-item" onClick={() => { this.chooseProvince(item) }}>
                        <div className="nocv-province-item-li">{item.provinceShortName}</div>
                        <div className="nocv-province-item-li">{item.confirmedCount}</div>
                        <div className="nocv-province-item-li">{item.deadCount}</div>
                        <div className={cls('triangle', 'nocv-province-item-li',{
                            'up': cities.length > 0 && item.cities == cities,
                            'down': cities.length == 0 || item.cities != cities
                        })}>
                            {item.curedCount}
                        </div>
                    </div>
                    {item.cities == cities && cities.length > 0 ? cities.map((children, k) => {
                        return (
                            <div key={k} className="nocv-province-city">
                                <div>{children.cityName}</div>
                                <div>{children.confirmedCount}</div>
                                <div>{children.deadCount}</div>
                                <div>
                                    {children.curedCount}
                                </div>
                            </div>
                        )
                    }) : null}
                </div>
            )
        })
    }
    getOption = () => {
        const province = false;
        const data = provinces.map(p => ({
            name: p.provinceShortName,
            value: p.confirmedCount
        }))
        return {

            tooltip: {
                trigger: 'item',
            },
            visualMap: {
                show: true,
                type: 'piecewise',
                min: 0,
                max: 2000,
                align: 'right',
                top: province ? 0 : '40%',
                right: 0,
                left: province ? 0 : 'auto',
                inRange: {
                    color: [
                        '#ffc0b1',
                        '#ff8c71',
                        '#ef1717',
                        '#9c0505'
                    ]
                },
                pieces: [
                    { min: 1000 },
                    { min: 500, max: 999 },
                    { min: 100, max: 499 },
                    { min: 10, max: 99 },
                    { min: 1, max: 9 },
                ],
                padding: 5,
                // "inverse": false,
                // "splitNumber": 5,
                orient: province ? 'horizontal' : 'vertical',
                showLabel: province ? false : true,
                text: ['高', '低'],
                itemWidth: 10,
                itemHeight: 10,
                textStyle: {
                    fontSize: 10
                }
                // "borderWidth": 0
            },
            series: [{
                left: 'center',
                // top: '15%',
                // bottom: '10%',
                type: 'map',
                name: '确诊人数',
                silent: province ? true : false,
                label: {
                    show: true,
                    position: 'inside',
                    // margin: 8,
                    fontSize: 6
                },
                mapType: province ? province.pinyin : 'china',
                data,
                zoom: 1.2,
                roam: false,
                showLegendSymbol: false,
                emphasis: {},
                rippleEffect: {
                    show: true,
                    brushType: 'stroke',
                    scale: 2.5,
                    period: 4
                }
            }]
        }
    }
}

export default Order;