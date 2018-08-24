/**
 * 
 * Address Page
 * 
 */
import React from "react"
import $ from "jquery"
import { Link } from 'react-router-dom'
import CustomPagination from "./common/CustomPagination"
import {injectIntl, intlShape, FormattedMessage } from 'react-intl'; /* react-intl imports */
import SubNavbar from "./common/SubNavbar"
import Qrcode from "./common/Qrcode"
export default class Address extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subNavbarMatch: this.props.match,
            addressID: this.props.match.params.addressID,
            nodeSearchKey: '',//节点列表搜索关键字
            totalItemsCount: 100,
            pageCount: 10,
            transactionList: [],
            rowsPerPage: 10,
            currentPage: 1,
            detailInfo: [],
            // nodeid: this.props.location.state.nodeid,
            // blockid: this.props.match.params.blockid,
        }
    }

    componentDidMount() {
        this.getList(this.state.currentPage, this.state.rowsPerPage);
        this.getInfo();
    }

    /**
     * Before a mounted component receives new props, reset some state.
     * Determine whether the location is changed, then update the navigation bar based on the current URL.
     * @param {Object} nextProps new props
     */
    componentWillReceiveProps(nextProps){
        if(this.state.subNavbarMatch.url !== nextProps.match.url){
            this.setState({
                subNavbarMatch: nextProps.match
            })
        }
    }

    /**
     * 获取列表数据
     * @param {int} currentPage 
     * @param {int} rowsPerPage 
     */
    getList(currentPage, rowsPerPage) {
        var self = this
        $.ajax({
            url: '/api/address_transactions/',
            type: 'get',
            dataType: 'json',               //GET方式时,表单数据被转换成请求格式作为URL地址的参数进行传递
            data: {
                page: currentPage,
                size: rowsPerPage,
                address: self.state.addressID
            },
            success: function (data) {
                self.setState({
                    transactionList: data.return_data,
                    totalItemsCount: data.total_size,
                    pageCount: data.total_page,
                })
            }
        })
    }

    /**
     * 搜索输入框内容变化时的监听
     */
    onChangeSearchInput(e) {
        this.setState({
            nodeSearchKey: e.target.value
        })
    }

    handleSearchNode(e) {
        e.preventdefault();
    }

    /**
     * 设置列表每页最多显示行数
     * @param {int} num 行数 
     */
    setRowsPerPage(num) {
        this.setState({
            rowsPerPage: num
        })
        this.getList(this.state.currentPage, num)
        //console.log(num)
    }

    /**
     * 选择页码的监听
     */
    handleSelectPage(pagenum) {
        this.setState({
            currentPage: pagenum
        })
        this.getList(pagenum, this.state.rowsPerPage)
        //console.log(pagenum)
    }

    /**
     * 跳转输入框的onChange监听
     */
    onChangeInputPage(e) {
        var re = /^[0-9]+$/
        var pagenum = e.target.value      //获取输入的页码
        //如果输入的页码不为空,并且如果输入的页码不符合规范(不是正整数，或者大于最大页码)
        if (pagenum != "" && (!re.test(pagenum) || pagenum == 0 || pagenum > this.state.pageCount)) {
            $('#inputPageNum').val('');   //清空输入框的内容                       
        }
    }
    /**
     * 跳转输入框的按键事件监听
     * @return {[type]} [description]
     */
    jumpPageKeyDown(e) {
        if (e.keyCode === 13) {           //当按下的键是回车键
            this.handleJumpPage()
        }
    }

    /**
     * 点击跳转按钮的监听
     */
    handleJumpPage() {
        var pagenum = parseInt($('#inputPageNum').val())
        this.setState({
            currentPage: pagenum
        })
        this.getList(pagenum, this.state.rowsPerPage)
    }

    getInfo() {
        var self = this
        $.ajax({
            url: '/api/address/',
            type: 'get',
            dataType: 'json',               //GET方式时,表单数据被转换成请求格式作为URL地址的参数进行传递
            data: {
                address: self.state.addressID
            },
            success: function (data) {
                self.setState({
                    detailInfo: data.return_data,
                })
            }
        })
    }
    render() {
        return (
            <div className='address-container'>
                <SubNavbar match={this.state.subNavbarMatch}/>
                {/* <SubNavbar match={this.state.detailInfo.address}/> */}
                <div className="page-content">
                    <div className="qrcode-layer">
                        {
                            this.state.detailInfo.address &&
                            <Qrcode id='2' text={this.state.detailInfo.address} size="70" />
                            // console.log(this.state.detailInfo)
                        }
                    </div>
                    <section className="graph-group" >
                        <div className="col col-12 col-sm-12 col-md-3 col-xl-5 stats-col">
                            <div className="item" >
                                <div className="icon">
                                    <i className="fas fa-envelope-open"></i>
                                </div>
                                <div className="text">
                                    <FormattedMessage id="received" tagName="p"/>
                                    <p>{this.state.detailInfo.received}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col col-12 col-sm-12 col-md-3 col-xl-5 stats-col">
                            <div className="item" >
                                <div className="icon">
                                    <i className="fas fa-envelope"></i>
                                </div>
                                <div className="text">
                                    <FormattedMessage id="sent" tagName="p"/>
                                    <p>{this.state.detailInfo.sent}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col col-12 col-sm-12 col-md-3 col-xl-5 stats-col">
                            <div className="item" >
                                <div className="icon">
                                    <i className="fas fa-balance-scale"></i>
                                </div>
                                <div className="text">
                                    <FormattedMessage id="balance" tagName="p"/>
                                    <p>{this.state.detailInfo.balance}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col col-12 col-sm-12 col-md-3 col-xl-5 stats-col">
                            <div className="item" >
                                <div className="icon">
                                    <i className="fas fa-calendar-alt"></i>
                                </div>
                                <div className="text">
                                    <FormattedMessage id="dateAndTime" tagName="p"/>
                                    <p>{this.state.detailInfo.time}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="info-part">
                        <div className="title" ><FormattedMessage id="advancedInfo"/></div>
                        <div className="info-content clearfix">
                            <div className="col col-12 col-sm-12 col-md-6 col-xl-5 info-col">
                                <p>
                                    <span className="attr"><FormattedMessage id="address"/></span>
                                    <span className="value">{this.state.detailInfo.address}</span>
                                </p>
                                <p>
                                    <span className="attr"><FormattedMessage id="received"/></span>
                                    <span className="value">{this.state.detailInfo.received}</span>
                                </p>
                                <p>
                                    <span className="attr"><FormattedMessage id="sent"/></span>
                                    <span className="value">{this.state.detailInfo.sent}</span>
                                </p>
                                <p>
                                    <span className="attr"><FormattedMessage id="balance"/></span>
                                    <span className="value">{this.state.detailInfo.balance}</span>
                                </p>
                            </div>
                            <div className="col col-12 col-sm-12 col-md-6 col-xl-5 info-col">
                                <p>
                                    <span className="attr"><FormattedMessage id="txCount" /></span>
                                    <span className="value">{this.state.detailInfo.tx_count}</span>
                                </p>
                                <p>
                                    <span className="attr"><FormattedMessage id="time" /></span>
                                    <span className="value">{this.state.detailInfo.time}</span>
                                </p>
                            </div>
                        </div>
                    </section>
                    <section className="list-part">
                        <div className="title"><FormattedMessage id="transactions"/></div>
                        {this.state.transactionList && this.state.transactionList.map(function (i, index) {
                            return (
                                <div className="list-item" key={index}>
                                    <p className="item-title">
                                        <span><FormattedMessage id="txHash"/>:</span>
                                        <Link to={"/translist/"+i.tx_hash}>
                                            {i.tx_hash}
                                        </Link>
                                    </p>
                                    <div className="detail-group">
                                        <div className="detail-item">
                                            <i className="fas fa-handshake"></i>
                                            <span>
                                                <FormattedMessage id="amount"/>
                                                <br />
                                                <b>{i.amount_transacted}</b>
                                            </span>
                                        </div>
                                        <div className="detail-item">
                                            <i className="fas fa-money-bill-wave"></i>
                                            <span>
                                                <FormattedMessage id="fees"/>
                                                <br />
                                                <b>{i.fees}</b>
                                            </span>
                                        </div>
                                        <div className="detail-item">
                                            <i className="fas fa-calendar-alt"></i>
                                            <span>
                                                <FormattedMessage id="time"/>
                                                <br />
                                                <b>{i.time}</b>
                                            </span>
                                        </div>
                                        <div className="detail-item">
                                            <i className="fas fa-fingerprint"></i>
                                            <span>
                                                <FormattedMessage id="status"/>
                                                <br />
                                                <b>{i.confirmations} <FormattedMessage id="confirmations"/></b>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="address-bar">
                                        <div className="item-a">
                                            {
                                                i.output &&
                                                <Qrcode id={index} text={i.output} size="70" />
                                            }
                                            <span>
                                                <FormattedMessage id="address"/>
                                                <br />
                                                <Link to={"/address/"+ i.output}>
                                                    <b>{i.output}</b>
                                                </Link>
                                            </span>
                                        </div>
                                        <div className="item-b">
                                            {
                                                i.input &&
                                                <Qrcode id={index + "a"} text={i.input} size="70" />
                                            }
                                            <span>
                                                <FormattedMessage id="address"/>
                                                <br />
                                                <Link to={"/address/"+ i.input}>
                                                    <b>{i.input}</b>
                                                </Link>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        }.bind(this))}
                        {
                            !this.state.transactionList.length && <div className="" style={{ width: '100%', height: '70px', lineHeight: '70px', background: 'transparent', border: 'none', }}>当前没有匹配的数据。</div>
                        }
                            <CustomPagination
                                from={(this.state.currentPage - 1) * this.state.rowsPerPage}
                                to={(this.state.currentPage-1)*this.state.rowsPerPage + (this.state.transactionList?this.state.transactionList.length:0)}
                                totalItemsCount={this.state.totalItemsCount}
                                totalPagesCount={this.state.pageCount}
                                currentPage={this.state.currentPage}
                                onChangeRowsPerPage={(num) => this.setRowsPerPage(num)}
                                onSelectPage={(e) => this.handleSelectPage(e)}
                                onChangePageInput={(e) => this.onChangeInputPage(e)}
                                onPageInputKeyDown={(e) => this.jumpPageKeyDown(e)}
                                onClickJumpButton={() => this.handleJumpPage()}
                            />
                    </section>
                </div>
            </div>
        )
    }
}