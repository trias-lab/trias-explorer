import React from "react"
import $ from 'jquery'
import {injectIntl, intlShape, FormattedMessage } from 'react-intl'; /* react-intl imports */
import SubNavbar from "./common/SubNavbar"
import Qrcode from "./common/Qrcode"
export default class TransactionDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transID: this.props.match.params.transID,
            subNavbarMatch: this.props.match,
            detailInfo: {},
            transactionList:[],
            eventLogList:[],
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

    /*
    * get trans details data
    * */

    getTransDetailData(){
        var self = this
        $.ajax({
            url: '/api/transaction_info/',
            type: 'get',
            dataType: 'json',
            data: {
                tx_hash:self.props.match.params.transID
            },
            success: function (data) {
                let transData =  data['return_data']
                if(data.code==200){
                    self.setState({
                        detailInfo:{
                            amount_transacted: transData.amount_transacted,
                            confirmations: transData.confirmations,
                            fees: transData.fees,
                            fees_rate: transData.fees_rate,
                            input: transData.input,
                            output: transData.output,
                            time: transData.time,
                            tx_hash: transData.tx_hash,
                            tx_receipt_status:transData.tx_receipt_status,
                            block_height:transData.block_height,
                            value:transData.value,
                            gas_limit:transData.gas_limit,
                            gas_used:transData.gas_used,
                            gas_price:transData.gas_price,
                            actual_tx_cost:transData.actual_tx_cost,
                            fee:transData.fee,
                            nonce:transData.nonce,
                            position:transData.position,
                            input_data:transData.input_data.replace(/\n/g,'#').split('#'),
                        },
                        transactionList:[{
                            amount_transacted: transData.amount_transacted,
                            confirmations: transData.confirmations,
                            fees: transData.fees,
                            fees_rate: transData.fees_rate,
                            input: transData.input,
                            output: transData.output,
                            time: transData.time,
                            tx_hash: transData.tx_hash,
                        }],
                        eventLogList:transData.receipt,
                    })
                }
                // console.log(data);
            }
        })
    }

    /*
    * eventLog : data type change(filter)
    * @param {string} filter : from Filter component dropList click
    * */

    handleFilter(filter){
        console.log(filter)
    }

    componentWillMount(){
        this.getTransDetailData();
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
                                    <i className="fas fa-ticket-alt"></i>
                                </div>
                                <div className="text">
                                    <p>Amount Transacted</p>
                                    <p>{this.state.detailInfo.amount_transacted}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col col-12 col-sm-12 col-md-3 col-xl-5 stats-col">
                            <div className="item" >
                                <div className="icon">
                                    <i className="fas fa-money-bill-wave"></i>
                                </div>
                                <div className="text">
                                    <p>Fees</p>
                                    <p>{this.state.detailInfo.fees}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col col-12 col-sm-12 col-md-3 col-xl-5 stats-col">
                            <div className="item" >
                                <div className="icon">
                                    <i className="fas fa-lock"></i>
                                </div>
                                <div className="text">
                                    <p>Confirmations</p>
                                    <p>{this.state.detailInfo.confirmations}</p>
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
                                    <span className="attr">TxHash:</span>
                                    <span className="value trans-table-value">{this.state.detailInfo.tx_hash}</span>
                                </p>
                                <p>
                                    <span className="attr">TxReceipt Status</span>
                                    <span className="value trans-table-value">{this.state.detailInfo.tx_receipt_status}</span>
                                </p>
                                <p>
                                    <span className="attr">Block_Height</span>
                                    <span className="value trans-table-value">{this.state.detailInfo.block_height}</span>
                                </p>
                                <p>
                                    <span className="attr">From</span>
                                    <span className="value trans-table-value">{this.state.detailInfo.input}</span>
                                </p>
                                <p>
                                    <span className="attr">To</span>
                                    <span className="value trans-table-value">{this.state.detailInfo.output}</span>
                                </p>
                                <p>
                                    <span className="attr">Value</span>
                                    <span className="value trans-table-value">{this.state.detailInfo.value}</span>
                                </p>
                            </div>
                            <div className="col col-12 col-sm-12 col-md-6 col-xl-5 info-col">
                                <p>
                                    <span className="attr">Gas Limit</span>
                                    <span className="value">{this.state.detailInfo.gas_limit}</span>
                                </p>
                                <p>
                                    <span className="attr">Gas Used By Txn</span>
                                    <span className="value">{this.state.detailInfo.gas_used}</span>
                                </p>
                                <p>
                                    <span className="attr">Gas Price</span>
                                    <span className="value">{this.state.detailInfo.gas_limit}</span>
                                </p>
                                <p>
                                    <span className="attr">Actual Tx Cost/Fee</span>
                                    <span className="value">{this.state.detailInfo.actual_tx_cost}&nbsp;{this.state.detailInfo.fee}</span>
                                </p>
                                <p>
                                    <span className="attr">Nonce & { `Position` }</span>
                                    <span className="value">{this.state.detailInfo.nonce} & {this.state.detailInfo.position}</span>
                                </p>
                            </div>
                        </div>
                    </section>
                    <section className="list-part">
                        <div className="title">Summary</div>
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
                                            {
                                                i.output &&
                                                <Qrcode id={index} text={i.output} size="70" />
                                            }
                                            <span>
                                                Address
                                                <br />
                                                <b>{i.output}</b>
                                            </span>
                                        </div>
                                        <div className="item-b">
                                            {
                                                i.input &&
                                                <Qrcode id={index + "a"} text={i.input} size="70" />
                                            }
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
                            (!this.state.transactionList.length || this.state.transactionList.length==0) &&
                            <div className="nullData">
                                <FormattedMessage id="nullData" tagName="p"/>
                            </div>
                        }
                    </section>
                    <section className="input-data">
                        <div className="title">Input Data</div>
                        {
                            this.state.detailInfo.input_data &&
                            <div className="data-code">
                                {this.state.detailInfo.input_data.map(function (item,index) {
                                    return(
                                        <p key={index} className={"input-list"+index}>{item}</p>
                                    )
                                }.bind(this))}
                            </div>
                        }
                        {
                            !this.state.detailInfo.input_data &&
                            <div className="nullData">
                                <FormattedMessage id="nullData" tagName="p"/>
                            </div>
                        }

                    </section>
                    <section className="event-log">
                        <div className="title">Event Logs (3)</div>
                        {
                            this.state.eventLogList && this.state.eventLogList.map(function(log,index){
                                return(
                                    <div className="eventLog-list" key={index}>
                                        <p>
                                            <span className="log-title">Address</span>
                                            <span className="log-value">{log.address}</span>
                                        </p>
                                        <p>
                                            <span className="log-title">Name</span>
                                            <span className="log-value">{log.name}</span>
                                        </p>
                                        <p>
                                            <span className="log-title">Topics</span>
                                            <span className="log-value">[0] : {log.topics[0]} <br/> [1] : {log.topics[1]}</span>
                                        </p>
                                        <p>
                                            <span className="log-title">Data</span>
                                            <span className="log-value">
                                                <Filter
                                                    dropList = {['Hex','Number','Text','Address']}
                                                    defaultValue = {'Hex'}
                                                    handleFilter = {this.handleFilter.bind(this)}
                                                />
                                                <i className="fa fa-arrow-alt-circle-right"></i>
                                                {log.data}</span>
                                        </p>
                                    </div>
                                )
                            }.bind(this))
                        }
                        {
                            (!this.state.eventLogList.length || this.state.eventLogList.length==0) &&
                            <div className="nullData">
                                <FormattedMessage id="nullData" tagName="p"/>
                            </div>
                        }

                    </section>
                </div>

            </div>
        )
    }
}

class Filter extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showDropList:false,
            dropList:this.props.dropList || [this.props.defaultValue],
            defaultValue:this.props.defaultValue || '',
        }
    }
    handleToggleList(){
        this.setState({
            showDropList:!this.state.showDropList
        })
    }
    handleSelectItem(dropList){
        this.setState({
            showDropList:false,
            defaultValue:dropList,
        })
        //Triggers the parent component event , transfer parameters: @param {string} dropList
        this.props.handleFilter(dropList)
    }
    componentWillMount(){

    }
    render(){
        let liList = this.state.dropList.map(function(dropList,index){
            return(
                <li key={index} onClick={this.handleSelectItem.bind(this,dropList)}>{dropList}</li>
            )
        }.bind(this))
        return(
            <div className="event-log-filter">
                <div className={this.state.showDropList?'ipt-box ipt-box-hover':"ipt-box"}
                     onClick={this.handleToggleList.bind(this)}>
                    <input value={this.state.defaultValue} readOnly={true}/>
                    <i className="fa fa-caret-down"></i>
                </div>
                {
                    this.state.showDropList &&
                    <ul className="drop-list">
                        {liList}
                    </ul>
                }

            </div>
        )
    }
}