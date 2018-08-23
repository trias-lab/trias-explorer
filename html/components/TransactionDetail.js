import React from "react"
import $ from 'jquery'
import {injectIntl, intlShape, FormattedMessage } from 'react-intl'; /* react-intl imports */
import SubNavbar from "./common/SubNavbar"
export default class TransactionDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transID: this.props.match.params.transID,
            subNavbarMatch: this.props.match,
            detailInfo: [],
            transactionList:[{
                address: "1PFtrRjbq4aLfM7k4tyLZ3ZAuTsgLr6Q8Q",
                balance: 0,
                received: 675347.32077952,
                sent: 675347.32077952,
                time: "2018-08-17 13:36:26",
                tx_count: 114138}],
        }
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

    render() {
        return (
            <div className="address-container">
                {/*TransactionDetail: {this.state.transID}*/}
                <SubNavbar match={this.state.subNavbarMatch}/>
                <div className="page-content">
                    <section className="graph-group" >
                        <div className="col col-12 col-sm-12 col-md-3 col-xl-5 stats-col">
                            <div className="item" >
                                <div className="icon">
                                    <i className="fas fa-envelope-open"></i>
                                </div>
                                <div className="text">
                                    <p>Received</p>
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
                                    <p>Sent</p>
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
                                    <p>Balance</p>
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
                                    <p>Date/Time</p>
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
                                    <span className="attr">Address</span>
                                    <span className="value">{this.state.detailInfo.address}</span>
                                </p>
                                <p>
                                    <span className="attr">Received</span>
                                    <span className="value">{this.state.detailInfo.received}</span>
                                </p>
                                <p>
                                    <span className="attr">Sent</span>
                                    <span className="value">{this.state.detailInfo.sent}</span>
                                </p>
                                <p>
                                    <span className="attr">Balance</span>
                                    <span className="value">{this.state.detailInfo.balance}</span>
                                </p>
                            </div>
                            <div className="col col-12 col-sm-12 col-md-6 col-xl-5 info-col">
                                <p>
                                    <span className="attr">Tx Count</span>
                                    <span className="value">{this.state.detailInfo.tx_count}</span>
                                </p>
                                <p>
                                    <span className="attr">Date/Time</span>
                                    <span className="value">{this.state.detailInfo.time}</span>
                                </p>
                            </div>
                        </div>
                    </section>
                    <section className="list-part">
                        <div className="title">Transactions</div>
                        {this.state.transactionList && this.state.transactionList.map(function (i, index) {
                            return (
                                <div className="list-item" key={index}>
                                    <p className="item-title">
                                        <span>Txhash:</span>{i.tx_hash}
                                    </p>
                                    <div className="detail-group">
                                        <div className="detail-item">
                                            <i className="fas fa-handshake"></i>
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
                        }.bind(this))}
                        {
                            !this.state.transactionList.length && <tr className="" style={{ width: '100%', height: '70px', lineHeight: '70px', background: 'transparent', border: 'none', }}><td style={{ paddingLeft: '40px', width: '100%' }}>当前没有匹配的数据。</td></tr>
                        }
                    </section>
                </div>

            </div>
        )
    }
}