import React from "react"
import $ from 'jquery'
import {injectIntl, intlShape, FormattedMessage } from 'react-intl'; /* react-intl imports */
import { Link } from 'react-router-dom'
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
                            amount_transacted: transData.value,
                            confirmations: transData.confirmations,
                            fees: transData.gasUsed * transData.gasPrice,
                            fees_rate: transData.fees_rate,
                            input: transData.source,
                            output: transData.to,
                            time: transData.time,
                            tx_hash: transData.hash,
                            block_height:transData.blockNumber,
                            value:transData.value,
                            gas_limit:transData.gasLimit,
                            gas_used:transData.gasUsed,
                            gas_price:transData.gasPrice,
                            actual_tx_cost:transData.actual_tx_cost,
                            fee:transData.fee,
                            nonce:transData.nonce,
                            transactionIndex:transData.transactionIndex,
                            input_data:transData.input_data ? transData.input_data.replace(/\n/g,'#').split('#') : false,
                        },
                        transactionList:[{
                            amount_transacted: transData.value,
                            confirmations: transData.confirmations,
                            fees: transData.gasUsed * transData.gasPrice,
                            fees_rate: transData.fees_rate,
                            input: transData.source,
                            output: transData.to,
                            time: transData.time,
                            tx_hash: transData.hash,
                        }],
                        eventLogList:transData.receipt||[],
                    })
                }
                // console.log(data);
            }
        })
    }

    /**
     * eventLog : data type change(filter)
     * @param {string} filter : from Filter component dropList click
     */
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
                                    <FormattedMessage id="amountTransacted" tagName="p"/>
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
                                    <FormattedMessage id="fees" tagName="p"/>
                                    <p>{this.state.detailInfo.fees }</p>
                                </div>
                            </div>
                        </div>
                        <div className="col col-12 col-sm-12 col-md-3 col-xl-5 stats-col">
                            <div className="item" >
                                <div className="icon">
                                    <i className="fas fa-lock"></i>
                                </div>
                                <div className="text">
                                    <FormattedMessage id="confirmationsSum" tagName="p"/>
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
                                    <span className="attr"><FormattedMessage id="txHash"/>:</span>
                                    <span className="value trans-table-value">{this.state.detailInfo.tx_hash}</span>
                                </p>
                                {/*<p>*/}
                                    {/*<span className="attr"><FormattedMessage id="txReceiptStatus"/></span>*/}
                                    {/*<span className="value trans-table-value">{this.state.detailInfo.tx_receipt_status}</span>*/}
                                {/*</p>*/}
                                <p>
                                    <span className="attr"><FormattedMessage id="height"/></span>
                                    <span className="value trans-table-value">{this.state.detailInfo.block_height}</span>
                                </p>
                                <p>
                                    <span className="attr">From</span>
                                    <span className="value trans-table-value"><Link to={"/address/"+this.state.detailInfo.input}>{this.state.detailInfo.input}</Link></span>
                                </p>
                                <p>
                                    <span className="attr">To</span>
                                    <span className="value trans-table-value"><Link to={"/address/"+this.state.detailInfo.input}>{this.state.detailInfo.output}</Link></span>
                                </p>
                                <p>
                                    <span className="attr"><FormattedMessage id="value"/></span>
                                    <span className="value trans-table-value">{this.state.detailInfo.value}</span>
                                </p>
                            </div>
                            <div className="col col-12 col-sm-12 col-md-6 col-xl-5 info-col">
                                <p>
                                    <span className="attr"><FormattedMessage id="gasLimit"/></span>
                                    <span className="value">{this.state.detailInfo.gas_limit}</span>
                                </p>
                                <p>
                                    <span className="attr"><FormattedMessage id="gasUsed"/></span>
                                    <span className="value">{this.state.detailInfo.gas_used}</span>
                                </p>
                                <p>
                                    <span className="attr"><FormattedMessage id="gasPrice"/></span>
                                    <span className="value">{this.state.detailInfo.gas_price}</span>
                                </p>
                                <p>
                                    <span className="attr"><FormattedMessage id="actualTxCostFee"/></span>
                                    <span className="value">{this.state.detailInfo.fees}</span>
                                </p>
                                <p>
                                    <span className="attr">{'Nonce & {Position}'}</span>
                                    <span className="value">{this.state.detailInfo.nonce} & {'{'}{this.state.detailInfo.transactionIndex}{'}'}</span>
                                </p>
                            </div>
                        </div>
                    </section>
                    <section className="list-part">
                        <div className="title"><FormattedMessage id="summary"/></div>
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
                                                i.input &&
                                                <Qrcode id={index + "a"} text={i.input} size="70" />
                                            }
                                            <span>
                                                <FormattedMessage id="address"/>
                                                <br />
                                                <Link to={'/address/'+i.input}>
                                                    <b>{i.input}</b>
                                                </Link>
                                            </span>
                                        </div>
                                        <div className="item-b">
                                            {
                                                i.output &&
                                                <Qrcode id={index} text={i.output} size="70" />
                                            }
                                            <span>
                                                <FormattedMessage id="address"/>
                                                <br />
                                                <Link to={'/address/'+i.output}>
                                                    <b>{i.output}</b>
                                                </Link>
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
                    {
                        this.state.detailInfo.input_data &&
                    <section className="input-data">
                        <div className="title"><FormattedMessage id="inputData"/></div>

                            <div className="data-code">
                                {this.state.detailInfo.input_data.map(function (item,index) {
                                    return(
                                        <p key={index} className={"input-list"+index}>{item}</p>
                                    )
                                }.bind(this))}
                            </div>


                    </section>
                    }
                    {
                        (this.state.eventLogList.length != 0)&&
                        <section className="event-log">
                            <div className="title"><FormattedMessage id="eventLogs" values={{num: this.state.eventLogList.length}}/></div>
                            {
                                this.state.eventLogList.map(function (log, index) {
                                    return (
                                        <div className="eventLog-list" key={index}>
                                            <p>
                                                <span className="log-title"><FormattedMessage id="address"/></span>
                                                <span className="log-value">
                                                <Link to={'/address/' + log.address}>{log.address}</Link>
                                            </span>
                                            </p>
                                            <p>
                                                <span className="log-title"><FormattedMessage id="name"/></span>
                                                <span className="log-value">{log.name}</span>
                                            </p>
                                            <p>
                                                <span className="log-title"><FormattedMessage id="topics"/></span>
                                                <span className="log-value">[0] : {log.topics[0]} <br/> [1] : {log.topics[1]}</span>
                                            </p>
                                            <p>
                                                <span className="log-title"><FormattedMessage id="data"/></span>
                                                <span className="log-value">
                                                <Filter
                                                    dropList={['Hex', 'Number', 'Text', 'Address']}
                                                    defaultValue={'Hex'}
                                                    handleFilter={this.handleFilter.bind(this)}
                                                />
                                                <i className="fa fa-arrow-alt-circle-right"></i>
                                                    {log.data}</span>
                                            </p>
                                        </div>
                                    )
                                }.bind(this))
                            }

                        </section>
                    }
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