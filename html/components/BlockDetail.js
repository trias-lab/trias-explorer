import React from "react"
import $ from 'jquery'
import CustomPagination from "./common/CustomPagination"
import {injectIntl, intlShape, FormattedMessage } from 'react-intl'; /* react-intl imports */
import SubNavbar from "./common/SubNavbar"
import Qrcode from "./common/Qrcode"
import { Link } from 'react-router-dom'

/**
 * Component for main part of block details page.
 */
export default class BlockDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subNavbarMatch: this.props.match,
            blockHash: this.props.match.params.blockID,
            totalItemsCount: 100,
            pageCount: 10,
            transactionList: [],
            rowsPerPage: 10,
            currentPage: 1,
            detailInfo: [],
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
                blockHash: nextProps.match.params.blockID
            },()=>{
                this.getList(this.state.currentPage, this.state.rowsPerPage);
                this.getInfo();
            })
        }
    }

    /**
     * Get transactions list
     * @param {int} currentPage 
     * @param {int} rowsPerPage 
     */
    getList(currentPage, rowsPerPage) {
        var self = this
        $.ajax({
            url: '/api/block_transactions/',
            type: 'get',
            dataType: 'json',               //GET方式时,表单数据被转换成请求格式作为URL地址的参数进行传递
            data: {
                block_hash: self.state.blockHash,
                size: rowsPerPage,
                page_size: currentPage,
                sort:0
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
     * Update maximum number of rows per page
     * @param {int} num new value
     */
    setRowsPerPage(num) {
        this.setState({
            rowsPerPage: num
        })
        // get new data and update state.
        this.getList(this.state.currentPage, num)
    }

    /**
     * On select page number by clicking buttons in the pagination
     * @param {int} pagenum new page number
     */
    handleSelectPage(pagenum) {
        this.setState({
            currentPage: pagenum
        })
        // get new data and update state.
        this.getList(pagenum, this.state.rowsPerPage)
    }

    /**
     * enter page and jump
     * @return {[type]} [description]
     */
    jumpPageKeyDown(e) {
        if (e.keyCode === 13) {           //if enter key
            this.handleJumpPage()
        }
    }

    /**
     * click select page
     */
    handleJumpPage() {
        var pagenum = parseInt($('#inputPageNum').val())
        this.setState({
            currentPage: pagenum
        })
        this.getList(pagenum, this.state.rowsPerPage)
        //console.log('jump')
    }

    /**
     * Get details of current block
     */
    getInfo() {
        var self = this
        $.ajax({
            url: '/api/block_info/',
            type: 'get',
            dataType: 'json',               //GET方式时,表单数据被转换成请求格式作为URL地址的参数进行传递
            data: {
                block_hash: self.state.blockHash
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
            <div className="address-container block-detail-container">
                <SubNavbar match={this.state.subNavbarMatch}/>
                <div className="page-content">
                    <section className="graph-group" >
                        <div className="col col-12 col-sm-12 col-md-3 col-xl-5 stats-col">
                            <div className="item" >
                                <div className="icon">
                                    <i className="fas fa-cube"></i>
                                </div>
                                <div className="text">
                                    <FormattedMessage id="height" tagName="p"/>
                                    <p>{this.state.detailInfo.height}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col col-12 col-sm-12 col-md-3 col-xl-5 stats-col">
                            <div className="item" >
                                <div className="icon">
                                    <i className="fas fa-handshake"></i>
                                </div>
                                <div className="text">
                                    <FormattedMessage id="transactionCount" tagName="p"/>
                                    <p>{this.state.detailInfo.transactions}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col col-12 col-sm-12 col-md-3 col-xl-5 stats-col">
                            <div className="item" >
                                <div className="icon">
                                    <i className="fas fa-money-bill-wave"></i>
                                </div>
                                <div className="text">
                                    <FormattedMessage id="totalFees" tagName="p"/>
                                    <p>{this.state.detailInfo.total_fees}</p>
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
                        <div className="title"><FormattedMessage id="advancedInfo"/></div>
                        <div className="info-content clearfix">
                            <div className="col col-12 col-sm-12 col-md-6 col-xl-5 info-col">
                                <p>
                                    <span className="attr"><FormattedMessage id="height" /></span>
                                    <span className="value">{this.state.detailInfo.number}</span>
                                </p>
                                <p>
                                    <span className="attr"><FormattedMessage id="confirmationsSum" /></span>
                                    <span className="value">{this.state.detailInfo.confirmations}</span>
                                </p>
                                <p>
                                    <span className="attr"><FormattedMessage id="size" /></span>
                                    <span className="value">{this.state.detailInfo.size} Bytes</span>
                                </p>
                                <p>
                                    <span className="attr"><FormattedMessage id="txCount" /></span>
                                    <span className="value">{this.state.detailInfo.transactionsCount}</span>
                                </p>
                                <p>
                                    <span className="attr"><FormattedMessage id="difficulty" /></span>
                                    <span className="value">{this.state.detailInfo.difficulty}</span>
                                </p>
                                <p>
                                    <span className="attr"><FormattedMessage id="nonce" /></span>
                                    <span className="value">{this.state.detailInfo.nonce}</span>
                                </p>
                                <p>
                                    <span className="attr"><FormattedMessage id="time" /></span>
                                    <span className="value">{this.state.detailInfo.time}</span>
                                </p>
                                <p>
                                    <span className="attr"><FormattedMessage id="gasLimit" /></span>
                                    <span className="value">{this.state.detailInfo.gasLimit}</span>
                                </p>
                                <p>
                                    <span className="attr"><FormattedMessage id="gasUsed" /></span>
                                    <span className="value">{this.state.detailInfo.gasUsed}</span>
                                </p>                           
                            </div>
                            <div className="col col-12 col-sm-12 col-md-6 col-xl-5 info-col">
                                <p>
                                    <span className="attr"><FormattedMessage id="blockHash" /></span>
                                    <span className="value">{this.state.blockHash}</span>
                                </p>
                                <p>
                                    <span className="attr"><FormattedMessage id="prevBlock" /></span>
                                    <span className="value">
                                    {
                                        this.state.detailInfo.parentHash && this.state.detailInfo.parentHash!=='N/A' ?
                                        <Link to={"/blocklist/"+this.state.detailInfo.parentHash}>
                                            {this.state.detailInfo.parentHash}
                                        </Link>:
                                        this.state.detailInfo.parentHash
                                    }   
                                    </span>
                                </p>
                                <p>
                                    <span className="attr"><FormattedMessage id="nextBlock" /></span>
                                    <span className="value">
                                    {
                                        this.state.detailInfo.nextHash && this.state.detailInfo.nextHash!=='N/A' ?
                                        <Link to={"/blocklist/"+this.state.detailInfo.nextHash}>
                                            {this.state.detailInfo.nextHash}
                                        </Link>:
                                        this.state.detailInfo.nextHash
                                    }                                        
                                    </span>
                                </p>
                                <p>
                                    <span className="attr"><FormattedMessage id="miner" /></span>
                                    <span className="value"><Link to={'/address/'+this.state.detailInfo.miner}>{this.state.detailInfo.miner}</Link></span>
                                </p>
                            </div>
                        </div>
                    </section>
                    <section className="list-part">
                        <div className="title"><FormattedMessage id="transactions"/></div>
                        {this.state.transactionList && this.state.transactionList.length>0 ? this.state.transactionList.map(function (i, index) {
                            return (
                                <div className="list-item" key={index}>
                                    <p className="item-title">
                                        <span><FormattedMessage id="txHash"/>:</span>
                                        <Link to={"/translist/"+i.hash}>
                                            {i.hash}
                                        </Link>
                                    </p>
                                    <div className="detail-group">
                                        <div className="detail-item">
                                            <i className="fas fa-handshake"></i>
                                            <span>
                                                <FormattedMessage id="amount"/>
                                                <br />
                                                <b>{i.value}</b>
                                            </span>
                                        </div>
                                        <div className="detail-item">
                                            <i className="fas fa-money-bill-wave"></i>
                                            <span>
                                                <FormattedMessage id="fees"/>
                                                <br />
                                                <b>{i.gas * i.gasPrice}</b>
                                            </span>
                                        </div>
                                        {/* <div className="detail-item">
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
                                                <b>{i.confirmations} <FormattedMessage id="confirmations" /></b>
                                            </span>
                                        </div> */}
                                    </div>
                                    <div className="address-bar">
                                        <div className="item-a">
                                            {
                                                i.source &&
                                                <Qrcode id={'output-'+index} text={i.source} size="70" />
                                            }
                                            <span>
                                                <FormattedMessage id="address"/>
                                                <br />
                                                <Link to={"/address/"+ i.source}>
                                                    <b>{i.source}</b>
                                                </Link>
                                            </span>
                                        </div>
                                        <div className="item-b">
                                            {
                                                i.to &&
                                                <Qrcode id={'input-'+index} text={i.to} size="70" />
                                            }
                                            <span>
                                            <FormattedMessage id="address"/>
                                                <br />
                                                <Link to={"/address/"+ i.to}>
                                                    <b>{i.to}</b>
                                                </Link>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}.bind(this)):
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