import React from "react"
import $ from 'jquery'
import CustomPagination from "./common/CustomPagination"
import {injectIntl, intlShape, FormattedMessage } from 'react-intl'; /* react-intl imports */
import SubNavbar from "./common/SubNavbar"

export default class BlockDetail extends React.Component {
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
                curr_page: currentPage,
                page_size: rowsPerPage,
                address: '0x1111'
            },
            success: function (data) {
                self.setState({
                    transactionList: data.return_data,
                    totalItemsCount: data.size,
                    pageCount: data.total_page,
                })
            }
        })
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

    getInfo() {
        var self = this
        $.ajax({
            url: '/api/address/',
            type: 'get',
            dataType: 'json',               //GET方式时,表单数据被转换成请求格式作为URL地址的参数进行传递
            data: {
                // address: self.state.blockid
                address: '0x1111'
            },
            success: function (data) {
                self.setState({
                    detailInfo: data.return_data,
                })
                console.log(data);
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
                                    <i className="fas fa-envelope-open"></i>
                                </div>
                                <div className="text">
                                    <FormattedMessage id="height" tagName="p"/>
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
                                    <FormattedMessage id="transactionCount" tagName="p"/>
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
                                    <FormattedMessage id="totalFees" tagName="p"/>
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
                        <div className="title" >Advanced Info</div>
                        <div className="info-content clearfix">
                            <div className="col col-12 col-sm-12 col-md-6 col-xl-5 info-col">
                                <p>
                                    <span className="attr"><FormattedMessage id="height" /></span>
                                    <span className="value">{this.state.detailInfo.address}</span>
                                </p>
                                <p>
                                    <span className="attr"><FormattedMessage id="confirmations" /></span>
                                    <span className="value">{this.state.detailInfo.received}</span>
                                </p>
                                <p>
                                    <span className="attr"><FormattedMessage id="size" /></span>
                                    <span className="value">{this.state.detailInfo.sent}</span>
                                </p>
                                <p>
                                    <span className="attr"><FormattedMessage id="txCount" /></span>
                                    <span className="value">{this.state.detailInfo.balance}</span>
                                </p>
                                <p>
                                    <span className="attr"><FormattedMessage id="version" /></span>
                                    <span className="value">{this.state.detailInfo.address}</span>
                                </p>
                                <p>
                                    <span className="attr"><FormattedMessage id="difficulty" /></span>
                                    <span className="value">{this.state.detailInfo.received}</span>
                                </p>
                                <p>
                                    <span className="attr"><FormattedMessage id="bits" /></span>
                                    <span className="value">{this.state.detailInfo.sent}</span>
                                </p>
                                <p>
                                    <span className="attr"><FormattedMessage id="nonce" /></span>
                                    <span className="value">{this.state.detailInfo.balance}</span>
                                </p>
                                <p>
                                    <span className="attr"><FormattedMessage id="time" /></span>
                                    <span className="value">{this.state.detailInfo.balance}</span>
                                </p>
                            </div>
                            <div className="col col-12 col-sm-12 col-md-6 col-xl-5 info-col">
                                <p>
                                    <span className="attr"><FormattedMessage id="blockHash" /></span>
                                    <span className="value">{this.state.detailInfo.tx_count}</span>
                                </p>
                                <p>
                                    <span className="attr"><FormattedMessage id="prevBlock" /></span>
                                    <span className="value">{this.state.detailInfo.time}</span>
                                </p>
                                <p>
                                    <span className="attr"><FormattedMessage id="nextBlock" /></span>
                                    <span className="value">{this.state.detailInfo.tx_count}</span>
                                </p>
                                <p>
                                    <span className="attr"><FormattedMessage id="merkleRoot" /></span>
                                    <span className="value">{this.state.detailInfo.time}</span>
                                </p>
                            </div>
                        </div>
                    </section>
                    <section className="list-part">
                        <div className="title">Transactions</div>
                        {this.state.transactionList && this.state.transactionList.length>0 ? this.state.transactionList.map(function (i, index) {
                            return (
                                <div className="list-item" key={index}>
                                    <p className="item-title">
                                        <span>Txhash:</span>{i.tx_hash}
                                    </p>
                                    <div className="detail-group">
                                        <div className="detail-item">
                                            <i class="fas fa-handshake"></i>
                                            <span>
                                                Amount
                                                <br />
                                                <b>{i.amount_transacted}</b>
                                            </span>
                                        </div>
                                        <div className="detail-item">
                                            <i className="fas fa-money-bill-wave"></i>
                                            <span>
                                                Fees
                                                <br />
                                                <b>{i.fees}</b>
                                            </span>
                                        </div>
                                        <div className="detail-item">
                                            <i className="fas fa-calendar-alt"></i>
                                            <span>
                                                Time
                                                <br />
                                                <b>{i.time}</b>
                                            </span>
                                        </div>
                                        <div className="detail-item">
                                            <i className="fas fa-fingerprint"></i>
                                            <span>
                                                Status
                                                <br />
                                                <b>{i.confirmations} Confirmation</b>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="address-bar">
                                        <div className="item-a">
                                            <i className="fas fa-qrcode"></i>
                                            <span>
                                                Address
                                                <br />
                                                <b>{i.output}</b>
                                            </span>
                                        </div>
                                        <div className="item-b">
                                            <i className="fas fa-qrcode"></i>
                                            <span>
                                                Address
                                                <br />
                                                <b>{i.input}</b>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        }.bind(this)):
                        <div className="nullData">
                            <FormattedMessage id="nullData" tagName="p"/>
                        </div>
                    }                      
                        <CustomPagination
                            from={(this.state.currentPage - 1) * this.state.rowsPerPage}
                            to={(this.state.currentPage-1)*this.state.rowsPerPage + (this.state.actionList?this.state.actionList.length:0)}
                            totalItemsCount={this.state.totalItemsCount}
                            totalPagesCount={this.state.pageCount}
                            currentPage={this.state.currentPage}
                            onChangeRowsPerPage={(num) => this.setRowsPerPage(num)}
                            onSelectPage={(e) => this.handleSelectPage(e)}
                        />
                    </section>
                </div>               
            </div>
        )
    }
}