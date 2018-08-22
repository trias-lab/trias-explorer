import React from "react"
import $ from 'jquery'
import { Link } from 'react-router-dom'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'; /* react-intl imports */
import echarts from 'echarts'
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: this.props.intl.locale,
            blocksLatest: []
        }
        this.lineChartOption = {
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(161,252,58,0.5)'
                        }, {
                            offset: 1,
                            color: 'rgba(161,252,58, 0.1)'
                        }], false),
                        opacity: 0.8,
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgb(161,252,58)',
                    }
                },
            }]
        };
    }

    initLineCharts() {
        let self = this
        this.chartLine1 = echarts.init(document.getElementById('lineChart1'));
        this.chartLine1.setOption(this.lineChartOption, true);
        this.chartLine2 = echarts.init(document.getElementById('lineChart2'));
        this.chartLine2.setOption(this.lineChartOption, true);
        /* Change the size of charts when the container size is changed */
        setTimeout(function () {
            window.onresize = function () {
                self.chartLine1.resize();
                self.chartLine2.resize();
            }
        }, 200)
    }

    updateLineCharts() {
        // this.lineChartOption.series[0].data = this.state.chartSeries
        // this.chartLine1 = echarts.init(document.getElementById('lineChart1'));
        // this.chartLine1.setOption(this.lineChartOption, true);
        // this.chartLine2 = echarts.init(document.getElementById('lineChart2'));
        // this.chartLine2.setOption(this.lineChartOption, true);
    }

    getLatestBlocks() {
        this.setState({
            blocksLatest: [{
                id: '2983792',
                timestamp: '2018-08-17 19:11:19',
                size: '8493 B',
                reward: '12.93. BTC'
            }, {
                id: '2983792',
                timestamp: '2018-08-17 19:11:19',
                size: '8493 B',
                reward: '12.93. BTC'
            }, {
                id: '2983792',
                timestamp: '2018-08-17 19:11:19',
                size: '8493 B',
                reward: '12.93. BTC'
            }, {
                id: '2983792',
                timestamp: '2018-08-17 19:11:19',
                size: '8493 B',
                reward: '12.93. BTC'
            }, {
                id: '2983792',
                timestamp: '2018-08-17 19:11:19',
                size: '8493 B',
                reward: '12.93. BTC'
            }, {
                id: '2983792',
                timestamp: '2018-08-17 19:11:19',
                size: '8493 B',
                reward: '12.93. BTC'
            }]
        })
    }

    getLatestTrans() {
        this.setState({
            transLatest: [{
                id: 'OXABESG',
                timestamp: '2018-08-17 19:11:19',
                from: '0xcadhjkdsfiowe356',
                to: '0xcadhjkdsfiowe356'
            }, {
                id: 'OXABESG',
                timestamp: '2018-08-17 19:11:19',
                from: '0xcadhjkdsfiowe356',
                to: '0xcadhjkdsfiowe356'
            }, {
                id: 'OXABESG',
                timestamp: '2018-08-17 19:11:19',
                from: '0xcadhjkdsfiowe356',
                to: '0xcadhjkdsfiowe356'
            }, {
                id: 'OXABESG',
                timestamp: '2018-08-17 19:11:19',
                from: '0xcadhjkdsfiowe356',
                to: '0xcadhjkdsfiowe356'
            }, {
                id: 'OXABESG',
                timestamp: '2018-08-17 19:11:19',
                from: '0xcadhjkdsfiowe356',
                to: '0xcadhjkdsfiowe356'
            }, {
                id: 'OXABESG',
                timestamp: '2018-08-17 19:11:19',
                from: '0xcadhjkdsfiowe356',
                to: '0xcadhjkdsfiowe356'
            },]
        })
    }

    componentDidMount() {
        this.initLineCharts()
        this.getLatestBlocks()
        this.getLatestTrans()
    }

    render() {
        return (
            <div>
                <section className="row text-center main-title ">
                  <div>
                    <FormattedMessage id="title" tagName="h1" />
                    <p><i className="fa fa-thumbs-up"></i> by Trias-lab Foundation</p>
                  </div>
                </section>

                <div className="home-page public-content">
                    <section className="row">
                        <div className="col col-xs-6 col-sm-4 col-md-2 col-xl-2">
                            <div className="home-header-item">
                                <div className='item-wap-img'>
                                    <i className="fa fa-line-chart"></i>
                                </div>
                                <p className='item-tit'> HASH RATE</p>
                                <p className='item-pre'> 49.65 EH/s</p>
                            </div>
                        </div>
                        <div className="col col-xs-6 col-sm-4 col-md-2 col-xl-2">
                            <div className="home-header-item">
                                <div className='item-wap-img'>
                                    <i className="fa fa-calculator"></i>
                                </div>
                                <p className='item-tit'> HASH RATE</p>
                                <p className='item-pre'> 49.65 EH/s</p>
                            </div>
                        </div>
                        <div className="col col-xs-6 col-sm-4 col-md-2 col-xl-2">
                            <div className="home-header-item">
                                <div className='item-wap-img'>
                                    <i className="fa fa-money-bill-wave"></i>
                                </div>
                                <p className='item-tit'> HASH RATE</p>
                                <p className='item-pre'> 49.65 EH/s</p>
                            </div>
                        </div>
                        <div className="col col-xs-6 col-sm-4 col-md-2 col-xl-2">
                            <div className="home-header-item">
                                <div className='item-wap-img'>
                                    <i className="fa fa-cube"></i>
                                </div>
                                <p className='item-tit'> HASH RATE</p>
                                <p className='item-pre'> 49.65 EH/s</p>
                            </div>
                        </div>
                        <div className="col col-xs-6 col-sm-4 col-md-2 col-xl-2">
                            <div className="home-header-item">
                                <div className='item-wap-img'>
                                    <i className="fa fa-dolly-flatbed"></i>
                                </div>
                                <p className='item-tit'> HASH RATE</p>
                                <p className='item-pre'> 49.65 EH/s</p>
                            </div>
                        </div>
                        <div className="col col-xs-6 col-sm-4 col-md-2 col-xl-2">
                            <div className="home-header-item">
                                <div className='item-wap-img'>
                                    <i className="fa fa-handshake"></i>
                                </div>
                                <p className='item-tit'> HASH RATE</p>
                                <p className='item-pre'> 49.65 EH/s</p>
                            </div>
                        </div>
                    </section>

                    <section className="row">
                        <div className="col col-xs-12 col-sm-12 col-md-6 col-xl-6">
                            <div className='home-echarts'>
                                <div className="chart-title row">
                                    <div className="col col-xs-6 col-sm-6 col-md-6 col-xl-6">
                                        <i className="fa fa-line-chart"></i>Current best transaction fees
                                    </div>
                                    <div className="col col-xs-6 col-sm-6 col-md-6 col-xl-6">
                                        <i className="fa fa-line-chart"></i>24h Tx Rate
                                     </div>
                                </div>
                                <div className="row" style={{ padding: '2px 12px', fontSize: '20px' }}>
                                    <div className="col col-xs-6 col-sm-6 col-md-6 col-xl-6">
                                        0.00003 BTC/Gas <i className="fa fa-arrow-alt-circle-up"></i>
                                    </div>
                                    <div className="col col-xs-6 col-sm-6 col-md-6 col-xl-6">
                                        2.35 txs/s
                                    </div>
                                </div>

                                <div className="row chart-title" style={{ padding: '24px 12px 0', }}>
                                    <div className="col col-xs-12 col-sm-12 col-md-12 col-xl-12">
                                        <i className="fa fa-chart-area"></i>14 Days Transactions History
                                    </div>
                                </div>
                                <div id="lineChart1" style={{ width: "100%", height: "370px" }}></div>
                            </div>

                        </div>
                        <div className="col col-xs-12 col-sm-12 col-md-6 col-xl-6">
                            <div className='home-echarts'>
                                <div className="chart-title row">
                                    <div className="col col-xs-6 col-sm-6 col-md-6 col-xl-6">
                                        <i className="fa fa-line-chart"></i>Current best transaction fees
                                     </div>
                                    <div className="col col-xs-6 col-sm-6 col-md-6 col-xl-6">
                                        <i className="fa fa-line-chart"></i>24h Tx Rate
                                     </div>
                                </div>
                                <div className="row" style={{ padding: '2px 12px', fontSize: '20px' }}>
                                    <div className="col col-xs-6 col-sm-6 col-md-6 col-xl-6">
                                        0.00003 BTC/Gas <i className="fa fa-arrow-alt-circle-up"></i>
                                    </div>
                                    <div className="col col-xs-6 col-sm-6 col-md-6 col-xl-6">
                                        2.35 txs/s
                                     </div>
                                </div>

                                <div className="row chart-title" style={{ padding: '24px 12px 0', }}>
                                    <div className="col col-xs-12 col-sm-12 col-md-12 col-xl-12">
                                        <i className="fa fa-chart-area"></i>14 Days Transactions History
                                     </div>
                                </div>
                                <div id="lineChart2" style={{ width: "100%", height: "370px" }}></div>
                            </div>
                        </div>
                    </section>
                    <section className="row">
                        <div className="col col-12 col-sm-12 col-md-6 col-xl-6">
                        </div>
                        <div className="col col-12 col-sm-12 col-md-6 col-xl-6">
                        </div>
                    </section>
                    <section className="row home-page-list">
                        <div className="col  col-xs-12  col-sm-12 col-md-6 col-xl-6 blocks-col latest-list">
                            <div className="list-head clearfix">
                                <div className="latest-tit pull-left">
                                    <i className="fa fa-cubes" ></i>
                                </div>
                                <p>Latest Blocks</p>
                                <a href="/blocklist">View all <i className="fa fa-angle-right"></i></a>
                            </div>
                            <ul className='block-list'>
                                {
                                    this.state.blocksLatest && this.state.blocksLatest.map(function (item, index) {
                                        return (
                                            <li className="clearfix" key={"block-" + index}>
                                                <Link to={"/blocklist/" + item.id}>

                                                    <div className="col col-xs-4 col-sm-4 col-md-4 col-xl-4">
                                                        <div className="name pull-left">
                                                            <i className="fa fa-line-chart">{item.id}</i>
                                                            <img src="" alt="" /><span></span>
                                                        </div>
                                                    </div>
                                                    <div className="col col-xs-8 col-sm-8 col-md-8 col-xl-8">
                                                        <div className="info">
                                                            <p className="timestamp">{item.timestamp}</p>
                                                            <p className="other">
                                                                <span>
                                                                    <span className="key">Size:</span>
                                                                    <span className="value">{item.size}</span>
                                                                </span>
                                                                <span>
                                                                    <span className="key">Reward:</span>
                                                                    <span className="value">{item.reward}</span>
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>

                        <div className="col col-12 col-sm-12 col-md-6 col-xl-6 trans-col latest-list">
                            <div className="list-head clearfix">
                                <div className="latest-tit pull-left">
                                    <i className="fa fa-handshake" ></i>
                                </div>
                                <p>Latest Transactions</p>
                                <a href="/translist">View all <i className="fa fa-angle-right"></i></a>
                            </div>
                            <ul className='block-list'>
                                {
                                    this.state.transLatest && this.state.transLatest.map(function (item, index) {
                                        return (
                                            <li className="clearfix" key={"trans-" + index}>
                                                <Link to={"/translist/" + item.id}>
                                                    <div className="col col-xs-4 col-sm-4 col-md-4 col-xl-4">
                                                        <div className="name pull-left">
                                                            <i className="fa fa-line-chart">{item.id}</i>
                                                            <img src="" alt="" /><span></span>
                                                        </div>
                                                    </div>
                                                    <div className="col col-xs-8 col-sm-8 col-md-8 col-xl-8">
                                                        <div className="info">
                                                            <p className="timestamp">{item.timestamp}</p>
                                                            <p className="other">
                                                                <span>
                                                                    <span className="key">Size:</span>
                                                                    <span className="value">{item.size}</span>
                                                                </span>
                                                                <span>
                                                                    <span className="key">Reward:</span>
                                                                    <span className="value">{item.reward}</span>
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </section>
                </div>
            </div>

        )
    }
}
/* Inject intl to Home props */
const propTypes = {
    intl: intlShape.isRequired,
};
Home.propTypes = propTypes
export default injectIntl(Home)