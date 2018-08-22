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
            blocksLatest: [],
            transLatest: [],
        }
        this.lineChartOption1 = {
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
                connectNulls: true,
                // cursor:'none',
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(93,184,92,0.16)'
                        }, {
                            offset: 1,
                            color: 'rgba(93,184,92,0.16)'
                        }], false),
                        opacity: 0.8,
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgb(161,252,58)',
                    }
                },
                emphasis: {
                    label: true
                }
            }]
        };

        this.lineChartOption2 = {
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [20, 932, 30, 934, 1290, 20, 1320],
                type: 'line',
                connectNulls: true,
                // cursor:'none',
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(93,184,92,0.16)'
                        }, {
                            offset: 1,
                            color: 'rgba(93,184,92,0.16)'
                        }], false),
                        opacity: 0.8,
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgb(161,252,58)',
                    }
                },
                emphasis: {
                    label: true
                }
            }]
        };
    }

    // initLineCharts() {
    //     let self = this
    //     this.chartLine1 = echarts.init(document.getElementById('lineChart1'));
    //     this.chartLine1.setOption(this.lineChartOption1, true);
    //     this.chartLine2 = echarts.init(document.getElementById('lineChart2'));
    //     this.chartLine2.setOption(this.lineChartOption2, true);
    //     /* Change the size of charts when the container size is changed */
    //     setTimeout(function () {
    //         window.onresize = function () {
    //             self.chartLine1.resize();
    //             self.chartLine2.resize();
    //         }
    //     }, 200)
    // }

    /**
     * 更新echarts图表的信息
     * 
     * @memberof Home
     */
    updateLineCharts() {
        var self = this;
        var transactions_history_key = [];   　//用来存放14 Days Transactions History处理后的日期
        var transactions_history_value = [];　　//用来存放14 Days Transactions History处理后的日期对应值
        //遍历this.state.transactions_history对象
        for (var key in this.state.transactions_history) {
            transactions_history_key.push(key);
            transactions_history_value.push(this.state.transactions_history[key])
        }
        var hash_rate_growth_key = [];   //用来存放1HashRate Growth处理后的日期
        var hash_rate_growth_value = [];　　//用来存放1HashRate Growth处理后的日期对应值
        //遍历this.state.hash_rate_growth对象
        for (var key in this.state.hash_rate_growth) {
            hash_rate_growth_key.push(key);
            hash_rate_growth_value.push(this.state.hash_rate_growth[key])
        }

        this.lineChartOption1.xAxis.data = transactions_history_key;　　//设置图表一的日期显示
        this.lineChartOption1.series[0].data = transactions_history_value　//设置图表一的日期对应的值显示
        this.chartLine1 = echarts.init(document.getElementById('lineChart1'));　//echarts init折线图
        this.chartLine1.setOption(this.lineChartOption1, true);　　　　//设定值

        this.lineChartOption2.xAxis.data = hash_rate_growth_key;　　　//设置图表二的日期显示
        this.lineChartOption2.series[0].data = hash_rate_growth_value;　　//设置图表二的日期对应的值显示
        this.chartLine2 = echarts.init(document.getElementById('lineChart2')); //echarts init折线图
        this.chartLine2.setOption(this.lineChartOption2, true);    　//设定值
        
        //页面缩放echarts折线图重新绘制
        setTimeout(function () {
            window.onresize = function () {
                self.chartLine1.resize();
                self.chartLine2.resize();
            }
        }, 200)
    }


    /**
     * 获取Latest Blocks列表信息
     * 
     * @memberof Home
     */
    getBlockData() {
        var self = this;
        $.ajax({
            url: 'api/index_latest_blocks/',
            type: 'get',
            dataType: 'json',               //GET方式时,表单数据被转换成请求格式作为URL地址的参数进行传递
            success: function (data) {
                if (data.code == 200) {
                    self.setState({
                        blocksLatest: data.return_data
                    })
                }
            }
        })
    }

    /**
     * 获取Latest Transactions列表信息
     * 
     * @memberof Home
     */
    getLatestTrans() {
        var self = this;
        $.ajax({
            url: 'api/index_recent_transactions/',
            type: 'get',
            dataType: 'json',               //GET方式时,表单数据被转换成请求格式作为URL地址的参数进行传递
            success: function (data) {
                if (data.code == 200) {
                    self.setState({
                        transLatest: data.return_data
                    })
                }
            }
        })
    }

    /**
     * 获取首页6条信息和4块信息
     * 
     * @memberof Home
     */
    getHeaderMsg() {
        var self = this;
        $.ajax({
            url: 'api/index_base_info/',
            type: 'get',
            dataType: 'json',               //GET方式时,表单数据被转换成请求格式作为URL地址的参数进行传递
            success: function (data) {
                if (data.code == 200) {
                    self.setState({
                        hash_rate: data.return_data.hash_rate,　　　
                        difficulty: data.return_data.difficulty,
                        mining_earnings: data.return_data.mining_earnings,
                        last_block: data.return_data.last_block,
                        total_supply: data.return_data.total_supply,
                        transactions: data.return_data.transactions,

                        transaction_fees: data.return_data.transaction_fees,
                        tx_rate: data.return_data.tx_rate,
                        hash_rate_growth: data.return_data.hash_rate_growth,

                        unconfirmed_txs: data.return_data.unconfirmed_txs,
                        tansaction_celerator: data.return_data.tansaction_celerator,
                        transactions_history: data.return_data.transactions_history,
                    })

                    setTimeout(function () {
                        self.updateLineCharts()
                    }, 200);
                }
            }
        })
    }

    // 组件渲染完成后
    componentDidMount() {
        this.getBlockData()　　//获取Latest Blocks列表信息
        this.getLatestTrans()  //获取Latest Transactions列表信息
        this.getHeaderMsg()    //获取首页6条信息和4块信息
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
                                <p className='item-pre'> {this.state.hash_rate}EH/s</p>
                            </div>
                        </div>
                        <div className="col col-xs-6 col-sm-4 col-md-2 col-xl-2">
                            <div className="home-header-item">
                                <div className='item-wap-img'>
                                    <i className="fa fa-calculator"></i>
                                </div>
                                <p className='item-tit'> Difficulty</p>
                                <p className='item-pre'> {this.state.difficulty} EH/s</p>
                            </div>
                        </div>
                        <div className="col col-xs-6 col-sm-4 col-md-2 col-xl-2">
                            <div className="home-header-item">
                                <div className='item-wap-img'>
                                    <i className="fa fa-money-bill-wave"></i>
                                </div>
                                <p className='item-tit'> Mining Earnings</p>
                                <p className='item-pre'> {this.state.mining_earnings} EH/s</p>
                            </div>
                        </div>
                        <div className="col col-xs-6 col-sm-4 col-md-2 col-xl-2">
                            <div className="home-header-item">
                                <div className='item-wap-img'>
                                    <i className="fa fa-cube"></i>
                                </div>
                                <p className='item-tit'> Last Block</p>
                                <p className='item-pre'> {this.state.last_block}</p>
                            </div>
                        </div>
                        <div className="col col-xs-6 col-sm-4 col-md-2 col-xl-2">
                            <div className="home-header-item">
                                <div className='item-wap-img'>
                                    <i className="fa fa-dolly-flatbed"></i>
                                </div>
                                <p className='item-tit'> Total Supply</p>
                                <p className='item-pre'> {this.state.total_supply}</p>
                            </div>
                        </div>
                        <div className="col col-xs-6 col-sm-4 col-md-2 col-xl-2">
                            <div className="home-header-item">
                                <div className='item-wap-img'>
                                    <i className="fa fa-handshake"></i>
                                </div>
                                <p className='item-tit'> Transactions</p>
                                <p className='item-pre'> {this.state.transactions} M</p>
                            </div>
                        </div>
                    </section>

                    <section className="row">
                        <div className="col col-xs-12 col-sm-12 col-md-6 col-xl-6">
                            <div className='home-echarts'>
                                <div className="chart-title row">
                                    <div className="col col-xs-6 col-sm-6 col-md-6 col-xl-6">
                                        <i className="fa fa-line-chart" style={{ marginRight: '5px' }}></i>Current best transaction fees
                                    </div>
                                    <div className="col col-xs-6 col-sm-6 col-md-6 col-xl-6">
                                        <i className="fa fa-line-chart" style={{ marginRight: '5px' }}></i>24h Tx Rate
                                     </div>
                                </div>
                                <div className="row" style={{ padding: '2px 12px', fontSize: '20px' }}>
                                    <div className="col col-xs-6 col-sm-6 col-md-6 col-xl-6" style={{ paddingLeft: '35px' }}>
                                        {this.state.transaction_fees} BTC/Gas <i className="fa fa-arrow-alt-circle-up" style={{ marginLeft: '5px', color: '#5DB85C' }}></i>
                                    </div>
                                    <div className="col col-xs-6 col-sm-6 col-md-6 col-xl-6" style={{ paddingLeft: '35px' }}>
                                        {this.state.tx_rate} txs/s
                                    </div>
                                </div>

                                <div className="row chart-title" style={{ padding: '24px 12px 0', }}>
                                    <div className="col col-xs-12 col-sm-12 col-md-12 col-xl-12">
                                        <i className="fa fa-chart-area" style={{ marginRight: '5px' }}></i>14 Days Transactions History
                                    </div>
                                </div>
                                <div id="lineChart1" style={{ width: "100%", height: "370px" }}></div>
                            </div>
                        </div>

                        <div className="col col-xs-12 col-sm-12 col-md-6 col-xl-6">
                            <div className='home-echarts'>
                                <div className="chart-title row">
                                    <div className="col col-xs-6 col-sm-6 col-md-6 col-xl-6">
                                        <i className="fa fa-line-chart" style={{ marginRight: '5px' }}></i>Current best transaction fees
                                     </div>
                                    <div className="col col-xs-6 col-sm-6 col-md-6 col-xl-6">
                                        <i className="fa fa-line-chart" style={{ marginRight: '5px' }}></i>24h Tx Rate
                                     </div>
                                </div>
                                <div className="row" style={{ padding: '2px 12px', fontSize: '20px' }}>
                                    <div className="col col-xs-6 col-sm-6 col-md-6 col-xl-6" style={{ paddingLeft: '35px' }}>
                                        {this.state.unconfirmed_txs}
                                    </div>
                                    <div className="col col-xs-6 col-sm-6 col-md-6 col-xl-6" style={{ paddingLeft: '35px' }}>
                                        {this.state.tansaction_celerator} txs/s  <i className="fa fa-arrow-alt-circle-down" style={{ marginLeft: '5px', color: '#F57123' }}></i>
                                    </div>
                                </div>
                                <div className="row chart-title" style={{ padding: '24px 12px 0', }}>
                                    <div className="col col-xs-12 col-sm-12 col-md-12 col-xl-12">
                                        <i className="fa fa-chart-area" style={{ marginRight: '5px' }}></i>HashRate Growth
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
                                <Link to="/blocklist">View all <i className="fa fa-angle-right"></i></Link>
                            </div>
                            <ul className='block-list'>
                                {
                                    this.state.blocksLatest && this.state.blocksLatest.map(function (item, index) {
                                        return (
                                            <li className="clearfix" key={"block-" + index}>
                                                <Link to={"/blocklist/" + item.height}>

                                                    <div className="col col-xs-4 col-sm-4 col-md-4 col-xl-4">
                                                        <div className="name pull-left">
                                                            <div>
                                                                <i className="fa fa-cube"></i>
                                                                <span title={item.height}>{item.height}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col col-xs-8 col-sm-8 col-md-8 col-xl-8">
                                                        <div className="info">
                                                            <p className="timestamp">{item.time}</p>
                                                            <p className="other clearfix">
                                                                <span style={{ width: '60%' }}>
                                                                    <span className="key">Size:</span>
                                                                    <span className="value">{item.size}</span>
                                                                </span>
                                                                <span style={{ width: '35%' }}>
                                                                    <span className="key keyReward">Reward:</span>
                                                                    <span className="value valueReward">{item.rewards}</span>
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

                        <div className="col  col-xs-12 col-sm-12 col-md-6 col-xl-6 trans-col latest-list">
                            <div className="list-head clearfix">
                                <div className="latest-tit pull-left">
                                    <i className="fa fa-handshake" ></i>
                                </div>
                                <p>Latest Transactions</p>
                                <Link to="/translist">View all <i className="fa fa-angle-right"></i></Link>
                            </div>
                            <ul className='block-list'>
                                {
                                    this.state.transLatest && this.state.transLatest.map(function (item, index) {
                                        return (
                                            <li className="clearfix" key={"trans-" + index}>
                                                <Link to={"/translist/" + item.tx_hash}>
                                                    <div className="col col-xs-4 col-sm-4 col-md-4 col-xl-4">
                                                        <div className="name pull-left">
                                                            <div>
                                                                <i className="fa fa-handshake"></i>
                                                                <span title={item.tx_hash}>{item.tx_hash}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col col-xs-8 col-sm-8 col-md-8 col-xl-8">
                                                        <div className="info">
                                                            <p className="timestamp">{item.time}</p>
                                                            <p className="other clearfix">
                                                                <span style={{ width: '60%' }}>
                                                                    <span className="key">From:</span>
                                                                    <span className="value">{item.from}</span>
                                                                </span>
                                                                <span style={{ width: '35%' }}>
                                                                    <span className="key">To:</span>
                                                                    <span className="value">{item.to}</span>
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