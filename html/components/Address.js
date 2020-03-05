import React from "react"
import $ from "jquery"
import { Link } from 'react-router-dom'
import CustomPagination from "./common/CustomPagination"
import {injectIntl, FormattedMessage, intlShape} from 'react-intl'; /* react-intl imports */
import SubNavbar from "./common/SubNavbar"
import Qrcode from "./common/Qrcode"

/**
 * Component for address page.
 */
class Address extends React.Component {
    static propTypes = {
        /** Inject intl to CustomPagination props */
        intl: intlShape.isRequired,
    };

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
            lang: this.props.intl.locale,
            explaining: false,              // 浮窗控制 rate提示
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
                subNavbarMatch: nextProps.match,
                addressID: nextProps.match.params.addressID,
                rowsPerPage: 10,
                currentPage: 1
            },()=> {
                this.getList(this.state.currentPage, this.state.rowsPerPage);
                this.getInfo();
            })
        }
        if(this.state.lang !== nextProps.intl.locale){  // if language changes
            this.setState({
                lang: nextProps.intl.locale,
            },()=>{
                this.getList(this.state.currentPage, this.state.rowsPerPage);
                this.getInfo();
            })
        }
    }



    /**
     * 获取列表数据
     * @param {int} currentPage
     * @param {int} rowsPerPage
     * @public
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
                if (data.code === 200) {
                    self.setState({
                        transactionList: data.return_data,
                        totalItemsCount: data.total_size,
                        pageCount: data.total_page,
                    })
                }
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
            rowsPerPage: num,
            currentPage: 1
        })
        this.getList(1, num)
    }

    /**
     * 选择页码的监听
     */
    handleSelectPage(pagenum) {
        this.setState({
            currentPage: pagenum
        })
        this.getList(pagenum, this.state.rowsPerPage)
    }

    /**
     * 跳转输入框的按键事件监听
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

    /**
     * 获取地址详情
     * @public
     */
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
                if (data.code === 200) {
                    self.setState({
                        detailInfo: data.return_data,
                    })
                }
            }
        })
    }

    // 显示
    showExplain = () => {
        this.setState({
            explaining: true
        })
    };

    // 隐藏
    hideExplain = (key) => {
        this.setState({
            explaining: false
        })
    };

    render() {
        return (
            <div className='address-container'>
                <SubNavbar match={this.state.subNavbarMatch}/>
                {/* <SubNavbar match={this.state.detailInfo.address}/> */}
                <div className="page-content">
                    <div className="qrcode-layer">
                        {
                            this.state.detailInfo.address &&
                            <Qrcode id='title' text={this.state.detailInfo.address} size="70" />
                        }
                    </div>
                    <section className="graph-group address-graph-group" >
                        <div className="stats-col address-stats-col">
                            <div className="item" >
                                <div className="icon">
                                    <i className="fas fa-envelope-open"/>
                                </div>
                                <div className="text">
                                    <FormattedMessage id="received" tagName="p"/>
                                    <p>{this.state.detailInfo.received}</p>
                                </div>
                            </div>
                        </div>
                        <div className="stats-col address-stats-col">
                            <div className="item" >
                                <div className="icon">
                                    <i className="fas fa-envelope"/>
                                </div>
                                <div className="text">
                                    <FormattedMessage id="sent" tagName="p"/>
                                    <p>{this.state.detailInfo.sent}</p>
                                </div>
                            </div>
                        </div>
                        <div className="stats-col address-stats-col">
                            <div className="item" >
                                <div className="icon">
                                    <i className="fas fa-balance-scale"/>
                                </div>
                                <div className="text">
                                    <FormattedMessage id="balance" tagName="p"/>
                                    <p>{this.state.detailInfo.balance}</p>
                                </div>
                            </div>
                        </div>
                        <div className="stats-col address-stats-col">
                            <div className="item" >
                                <div className="icon">
                                    <i className="fas fa-money-check"/>
                                </div>
                                <div className="text">
                                    <div className='item-more-data clear' onMouseOver={() => this.showExplain()}
                                         onMouseLeave={() => this.hideExplain()} >
                                        <p className='item-tit'><FormattedMessage id="privacyBalance" /></p>
                                        <i className="fas fa-question-circle"/>
                                        <div className={`item-bubble ${this.state.explaining && 'item-bubbling'} ${this.state.lang === 'en' && 'bubble-location'}`}>
                                            <span><FormattedMessage id="privacyTips1" /></span>
                                            <a href="https://wallet.trias.one/"><FormattedMessage id="logIn" /></a>
                                            <span><FormattedMessage id="privacyTips2" /></span>
                                        </div>
                                        <span className={`icon_arrow ${this.state.explaining && 'item-bubbling'}`}/>
                                    </div>
                                    <p>********</p>
                                </div>
                            </div>
                        </div>
                        <div className="stats-col address-stats-col">
                            <div className="item" >
                                <div className="icon">
                                    <i className="fas fa-calendar-alt"/>
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
                                    <span className="value">{this.state.detailInfo.txCount}</span>
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
                                        <Link to={"/translist/"+i.hash}>
                                            {i.hash}
                                        </Link>
                                    </p>
                                    <div className="detail-group">
                                        <div className="detail-item clearfix">
                                            <i className="fas fa-handshake"></i>
                                            <span>
                                                <FormattedMessage id="amount"/>
                                                <br />
                                                <b>{i.value}</b>
                                            </span>
                                        </div>
                                        <div className="detail-item clearfix">
                                            <i className="fas fa-money-bill-wave"></i>
                                            <span>
                                                <FormattedMessage id="fees"/>
                                                <br />
                                                <b>{i.fees}</b>
                                            </span>
                                        </div>
                                        <div className="detail-item clearfix">
                                            <i className="fas fa-calendar-alt"></i>
                                            <span>
                                                <FormattedMessage id="time"/>
                                                <br />
                                                <b>{i.time}</b>
                                            </span>
                                        </div>
                                        <div className="detail-item clearfix">
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
                                                i.source &&
                                                <Qrcode id={index} text={i.source} size="70" />
                                            }
                                            {
                                                i.source &&
                                                <span>
                                                    <FormattedMessage id="address"/>
                                                    <br />
                                                    <Link to={"/address/"+ i.source}>
                                                        <b>{i.source}</b>
                                                    </Link>
                                                </span>
                                            }
                                        </div>
                                        <div className="item-b">
                                            {
                                                i.to &&
                                                <Qrcode id={index + "a"} text={i.to} size="70" />
                                            }
                                            {
                                                i.to &&
                                                <span>
                                                    <FormattedMessage id="address"/>
                                                    <br />
                                                    <Link to={"/address/"+ i.to}>
                                                        <b>{i.to}</b>
                                                    </Link>
                                                </span>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        }.bind(this))}
                        {
                            !this.state.transactionList.length &&
                            <div className="nullData">
                                <FormattedMessage id="nullData" tagName="p"/>
                            </div>
                        }
                        <CustomPagination
                            from={(this.state.currentPage - 1) * this.state.rowsPerPage}
                            to={(this.state.currentPage-1)*this.state.rowsPerPage + (this.state.transactionList?this.state.transactionList.length:0)}
                            totalItemsCount={this.state.totalItemsCount}
                            totalPagesCount={this.state.pageCount}
                            currentPage={this.state.currentPage}
                            onChangeRowsPerPage={(num) => this.setRowsPerPage(num)}
                            onSelectPage={(num) => this.handleSelectPage(num)}
                            onPageInputKeyDown={(e) => this.jumpPageKeyDown(e)}
                        />
                    </section>
                </div>
            </div>
        )
    }
}

export default injectIntl(Address)
