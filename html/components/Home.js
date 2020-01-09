import React from "react"
import $ from 'jquery'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'; /* react-intl imports */

// 引入 echarts 主模块。
import * as echarts from 'echarts/lib/echarts';
// 引入折线图。
import 'echarts/lib/chart/line';
// 引入提示框组件、标题组件、工具箱组件。
import 'echarts/lib/component/tooltip';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blocksLatest: [],
            transLatest: [],
            richList: [],
            hash_rate: "",
            totalDifficulty: "",
            lastBlockFees: "",
            last_block: "",
            addresses: "",
            transactions: "",

        }
        this.lineChartOption1 = {
            grid: {
                top: '28px',
                left: '43px',
                right: '13px',
                bottom: '36px'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        color: '#68BD68',
                        opacity: 0.5,
                        width: 2
                    }
                },
                formatter: ' <span style="color:#9CA2AB;font-size:12px;">{b0} </span><br />  <span style="background:rgb(93, 184, 92);width:10px;height:10px; display: inline-block; border-radius: 50%;margin-right:6px;"></span><span style="color:#DEE0E3">Transactions: </span> <span style="color:#FEFEFE">{c0} </span>'
            },
            xAxis: {
                type: 'category',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        color: '#EDF0F2'
                    }
                },
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
                            color: '#5DB85C'
                        }, {
                            offset: 1,
                            color: '#5DB85C'
                        }], false),
                        opacity: 0.16,
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#5DB85C',
                    }
                },
                emphasis: {
                    label: true
                },

            }]
        };

        this.lineChartOption2 = {
            grid: {
                top: '28px',
                left: '50px',
                right: '16px',
                bottom: '36px'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        color: '#68BD68',
                        opacity: 0.5,
                        width: 2
                    }
                },
                formatter: ' <span style="color:#9CA2AB;font-size:12px;">{b0} </span> <br />  <span style="background:rgb(93, 184, 92);width:10px;height:10px; display: inline-block; border-radius: 50%;margin-right:6px;"></span><span style="color:#DEE0E3">Transactions: </span> <span style="color:#FEFEFE">{c0} </span>'
            },
            xAxis: {
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        color: '#EDF0F2'
                    }
                },
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
                            color: '#5DB85C'
                        }, {
                            offset: 1,
                            color: '#5DB85C'
                        }], false),
                        opacity: 0.16,
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#5DB85C',
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

        var transactionsHistory_key = [];   //用来存放1HashRate Growth处理后的日期
        var transactionsHistory_value = [];　　//用来存放1HashRate Growth处理后的日期对应值
        //遍历this.state.transactionsHistory对象
        for (var key in this.state.transactionsHistory) {
            transactionsHistory_key.push(key);
            transactionsHistory_value.push(this.state.transactionsHistory[key])
        }

        this.lineChartOption2.xAxis.data = transactionsHistory_key.reverse();　　　//设置图表二的日期显示
        this.lineChartOption2.series[0].data = transactionsHistory_value.reverse();　　//设置图表二的日期对应的值显示
        this.chartLine1 = echarts.init(document.getElementById('lineChart1')); //echarts init折线图
        this.chartLine1.setOption(this.lineChartOption2, true);    　//设定值

        //页面缩放echarts折线图重新绘制
        setTimeout(function () {
            window.onresize = function () {
                self.chartLine1.resize();
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
                        hash_rate: data.return_data.hashRate,
                        totalDifficulty: data.return_data.totalDifficulty,
                        lastBlockFees: data.return_data.lastBlockFees,
                        last_block: data.return_data.lastBlock,
                        addresses: data.return_data.addresses,
                        transactions: data.return_data.transactions,

                        lastTransactionFees: data.return_data.lastTransactionFees,
                        tx_rate: data.return_data.transactionRate,
                        transactionsHistory: data.return_data.transactionsHistory,

                        unconfirmed_txs: data.return_data.unconfirmed,
                        blocksRate: data.return_data.blocksRate,
                        richList: data.return_data.richList,
                    },()=>{
                        self.updateLineCharts()
                    })
                }
            }
        })
    }


    // 组件渲染完成后
    componentDidMount() {
        this.getBlockData()　　//获取Latest Blocks列表信息
        this.getLatestTrans()  //获取Latest Transactions列表信息
        this.getHeaderMsg()    //获取首页6条信息和4块信息
        var self = this;
        this.setinter = setInterval(function () {
            self.getBlockData()　　//获取Latest Blocks列表信息
            self.getLatestTrans()  //获取Latest Transactions列表信息
            self.getHeaderMsg()    //获取首页6条信息和4块信息
        }, 6000)
    }
    componentWillUnmount() {
        clearInterval(this.setinter)
    }


    render() {
        return (
            <div>
                <section className="text-center main-title ">
                    <div>
                        <FormattedMessage id="dataValidity" tagName="p" />
                        <FormattedMessage id="title" tagName="h1" />
                        <p><i className="fa fa-thumbs-up"></i> by Trias-lab Foundation</p>
                    </div>
                </section>
                <div className="home-page public-content">
                    <section className="clearfix">
                        <div className="col col-xs-6 col-sm-4 col-md-2 col-xl-2">
                            <div className="home-header-item">
                                <div className='item-wap-img'>
                                    <i className="fa fa-line-chart"></i>
                                </div>
                                <FormattedMessage id="homeItemTit">
                                    {(txt) => (
                                        <p className='item-tit'>
                                            {txt}
                                        </p>
                                    )}
                                </FormattedMessage>
                                <p className='item-pre'>
                                 <FormattedMessage id="stayTuned" />
                                 </p>
                            </div>
                        </div>
                        <div className="col col-xs-6 col-sm-4 col-md-2 col-xl-2">
                            <div className="home-header-item">
                                <div className='item-wap-img'>
                                    <i className="fa fa-calculator"></i>
                                </div>
                                <FormattedMessage id="totalDifficulty">
                                    {(txt) => (
                                        <p className='item-tit'> {txt}</p>
                                    )}
                                </FormattedMessage>
                                <p className='item-pre' title={`${this.state.totalDifficulty}`}> {this.state.totalDifficulty}</p>
                            </div>
                        </div>
                        <div className="col col-xs-6 col-sm-4 col-md-2 col-xl-2">
                            <div className="home-header-item">
                                <div className='item-wap-img'>
                                    <i className="fa fa-money-bill-wave"></i>
                                </div>
                                <FormattedMessage id="miningEarnings">
                                    {(txt) => (
                                        <p className='item-tit'> {txt}</p>
                                    )}
                                </FormattedMessage>
                                <p className='item-pre' title={`${this.state.lastBlockFees}`}> {this.state.lastBlockFees} </p>
                            </div>
                        </div>
                        <div className="col col-xs-6 col-sm-4 col-md-2 col-xl-2">

                            <Link to="/blocklist">
                                <div className="home-header-item">
                                    <div className='item-wap-img'>
                                        <i className="fa fa-cube"></i>
                                    </div>
                                    <FormattedMessage id="lastBlock">
                                        {(txt) => (
                                            <p className='item-tit'> {txt}</p>
                                        )}
                                    </FormattedMessage>
                                    <p className='item-pre' title={`# ${this.state.last_block}`}> #{this.state.last_block}</p>
                                </div>

                            </Link>
                        </div>
                        <div className="col col-xs-6 col-sm-4 col-md-2 col-xl-2">
                            <div className="home-header-item">
                                <div className='item-wap-img'>
                                    <i className="fa fa-dolly-flatbed"></i>
                                </div>
                                <FormattedMessage id="Addresses">
                                    {(txt) => (
                                        <p className='item-tit'> {txt}</p>
                                    )}
                                </FormattedMessage>
                                <p className='item-pre' title={this.state.addresses}> {this.state.addresses}</p>
                            </div>
                        </div>
                        <div className="col col-xs-6 col-sm-4 col-md-2 col-xl-2">
                            <div className="home-header-item">
                                <div className='item-wap-img'>
                                    <i className="fa fa-handshake"></i>
                                </div>
                                <FormattedMessage id="transactionCount">
                                    {(txt) => (
                                        <p className='item-tit'> {txt}</p>
                                    )}
                                </FormattedMessage>
                                <p className='item-pre' title={`${this.state.transactions}M`}> {this.state.transactions}</p>
                            </div>
                        </div>
                    </section>

                    <section className="clearfix">
                        <div className="col col-xs-12 col-sm-12 col-md-6 col-xl-6">
                            <div className='home-echarts'>
                                <div className="clearfix">
                                    <div className="col col-xs-12 col-sm-6 col-md-6 col-xl-6">
                                        <p className="chart-title">
                                            <i className="fa fa-line-chart" style={{ marginRight: '5px' }}></i>
                                            <FormattedMessage id="currentBest" />
                                        </p>
                                        <p className="chart-value" title={`${this.state.lastTransactionFees} `}>
                                            {this.state.lastTransactionFees}
                                            {/*<i className="fa fa-arrow-alt-circle-up" style={{ marginLeft: '5px', color: '#5DB85C' }}></i>*/}
                                        </p>
                                    </div>
                                    {/* <div className="col col-xs-12 col-sm-6 col-md-6 col-xl-6">
                                        <p className="chart-title">
                                            <i className="fa fa-line-chart" style={{ marginRight: '5px' }}></i>
                                            <FormattedMessage id="rate24" />
                                        </p>
                                        <p className="chart-value" title={`${this.state.tx_rate} txs/s`}>
                                            {this.state.tx_rate} txs/s
                                        </p>
                                    </div>
                                    */}
                                </div>
                                <div className="chart-title clearfix" style={{ padding: '24px 12px 0', }}>
                                    <i className="fa fa-chart-area" style={{ marginRight: '5px' }}></i>
                                    <FormattedMessage id="history7" />
                                </div>
                                <div id="lineChart1" style={{ width: "100%", height: "370px", padding: "0 12px" }}></div>
                            </div>
                        </div>

                        <div className="col col-xs-12 col-sm-12 col-md-6 col-xl-6">
                            <div className='home-echarts'>
                                <div className="clearfix">
                                    <div className="col col-xs-12 col-sm-6 col-md-6 col-xl-6">
                                        <p className="chart-title">
                                            <i className="fa fa-line-chart" style={{ marginRight: '5px' }}></i>
                                            <FormattedMessage id="unconfirmedTxs" />
                                        </p>
                                        <p className="chart-value" title={`${this.state.unconfirmed_txs}`}>
                                            {this.state.unconfirmed_txs}
                                        </p>
                                    </div>
                                    {/*
                                 <div className="col col-xs-12 col-sm-6 col-md-6 col-xl-6">
                                        <p className="chart-title">
                                            <i className="fa fa-line-chart" style={{ marginRight: '5px' }}></i>
                                            <FormattedMessage id="transactionAccelerator" />
                                        </p>
                                        <p className="chart-value" title={`${this.state.blocksRate} txs/s`}>
                                            {this.state.blocksRate} txs/s  <i className="fa fa-arrow-alt-circle-down" style={{ marginLeft: '5px', color: '#F57123' }}></i>
                                        </p>
                                     </div>
                                 */}
                                </div>
                                <div className="chart-title clearfix" style={{ padding: '24px 12px 0', }}>
                                    <i className="fa fa-table" style={{ marginRight: '5px' }}></i><FormattedMessage id="latestActive" />
                                </div>

                                <div style={{ padding: "0 15px" }}>

                                    {this.state.richList.length > 0 &&

                                        <table id="blockHistoryTable">
                                            <thead>
                                                <tr>
                                                    <FormattedMessage id="address" tagName="td" />
                                                    <FormattedMessage id="balance" tagName="td" />
                                                    <FormattedMessage id="time" tagName="td" />
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.richList && this.state.richList.map(function (item, index) {
                                                        return (

                                                            <tr key={index}>
                                                                <td className="td-block-height" title={item.address}>
                                                                    <Link to={"/address/" + item.address}>   {item.address}  </Link>
                                                                </td>
                                                                <td title={item.balance}>{item.balance}</td>
                                                                <td title={item.time}>{item.time}</td>
                                                            </tr>

                                                        )
                                                    }.bind(this))
                                                }


                                            </tbody>
                                        </table>
                                    }


                                    {
                                        (this.state.richList.length == 0 || !this.state.richList.length) &&
                                        <div className="nullData">
                                            <FormattedMessage id="nullData" tagName="p" />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="col col-12 col-sm-12 col-md-6 col-xl-6">
                        </div>
                        <div className="col col-12 col-sm-12 col-md-6 col-xl-6">
                        </div>
                    </section>
                    <section className="home-page-list clearfix">
                        <div className="col  col-xs-12  col-sm-12 col-md-6 col-xl-6 blocks-col latest-list">
                            <div className="list-head clearfix">
                                <div className="latest-tit pull-left">
                                    <i className="fa fa-cubes" ></i>
                                </div>
                                <FormattedMessage id="latestBlocks" tagName='p' />
                                <Link to="/blocklist"><FormattedMessage id="viewAll" /><i className="fa fa-angle-right"></i></Link>
                            </div>
                            <ul className='block-list'>
                                {
                                    this.state.blocksLatest && this.state.blocksLatest.map(function (item, index) {
                                        return (
                                            <li className="clearfix" key={"block-" + index}>
                                                <Link to={"/blocklist/" + item.hash}>

                                                    <div className="col col-xs-4 col-sm-4 col-md-4 col-xl-4">
                                                        <div className="name pull-left">
                                                            <div>
                                                                <i className="fa fa-cube"></i>
                                                                <span title={`#${item.number}`}>{`#${item.number}`}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col col-xs-8 col-sm-8 col-md-8 col-xl-8">
                                                        <div className="info">
                                                            <p className="timestamp">{item.time}</p>
                                                            <p className="other clearfix">
                                                                <span style={{ width: '100%' }}>
                                                                    <span className="key"><FormattedMessage id="txCount" />:</span>
                                                                    <span className="value" title={item.transactionsCount}>{item.transactionsCount}</span>
                                                                </span>
                                                                {/* <span style={{ width: '35%' }}>
                                                                    <span className="key keyReward"><FormattedMessage id="reward" />:</span>
                                                                    <span className="value valueReward" title={item.blockReward}>{item.blockReward}</span>
                                                                </span> */}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                        )
                                    })
                                }

                                {
                                    (this.state.blocksLatest.length == 0 || !this.state.blocksLatest.length) &&
                                    <div className="nullData">
                                        <FormattedMessage id="nullData" tagName="p" />
                                    </div>
                                }
                            </ul>
                        </div>

                        <div className="col  col-xs-12 col-sm-12 col-md-6 col-xl-6 trans-col latest-list">
                            <div className="list-head clearfix">
                                <div className="latest-tit pull-left">
                                    <i className="fa fa-handshake" ></i>
                                </div>
                                <FormattedMessage id="latestTransactions" tagName='p' />
                                <Link to="/translist">  <FormattedMessage id="viewAll" /><i className="fa fa-angle-right"></i></Link>
                            </div>
                            <ul className='block-list'>
                                {
                                    this.state.transLatest && this.state.transLatest.map(function (item, index) {
                                        // 如果type为1，为字符串交易
                                        let isStr = item.type === 1
                                        return (
                                            <li className="clearfix" key={"trans-" + index}>
                                                <Link to={"/translist/" + item.hash}>
                                                    <div className="col col-xs-4 col-sm-4 col-md-4 col-xl-4">
                                                        <div className="name pull-left">
                                                            <div>
                                                                <i className="fa fa-handshake"></i>
                                                                <span title={item.hash}>{item.hash}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col col-xs-8 col-sm-8 col-md-8 col-xl-8">
                                                        <div className="info">
                                                            <p className="timestamp">{item.time}</p>
                                                            {
                                                                isStr?
                                                                <p className="other str clearfix">
                                                                    <span style={{ width: '100%' }}>
                                                                        <span className="key"><FormattedMessage id="txMessage" />:</span>
                                                                        <span className="value" title={item.tx_str}>{item.tx_str}</span>
                                                                    </span>
                                                                </p>:
                                                                <p className="other clearfix">
                                                                    <span style={{ width: '60%' }}>
                                                                        <span className="key">From:</span>
                                                                        <span className="value" title={item.source}>{item.source}</span>
                                                                    </span>
                                                                    <span style={{ width: '35%' }}>
                                                                        <span className="key">To:</span>
                                                                        <span className="value" title={item.to}>{item.to}</span>
                                                                    </span>
                                                                </p>
                                                            }
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                        )
                                    })
                                }

                                {
                                    (this.state.transLatest.length == 0 || !this.state.transLatest.length) &&
                                    <div className="nullData">
                                        <FormattedMessage id="nullData" tagName="p" />
                                    </div>
                                }
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}