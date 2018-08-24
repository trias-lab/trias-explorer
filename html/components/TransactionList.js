import React from "react"
import $ from 'jquery'
import {injectIntl, intlShape, FormattedMessage } from 'react-intl'; /* react-intl imports */
import { Link } from 'react-router-dom'
import SubNavbar from "./common/SubNavbar"
import CustomPagination from "./common/CustomPagination"
class TransactionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: this.props.intl.locale,
            subNavbarMatch: this.props.match,   // Route  match props
            totalItemsCount: 100, //total number = pageCount*rowsPerPage
            pageCount: 10, //total page
            rowsPerPage: 10, //number each page
            currentPage: 1, //current page number
            transList:false,
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
        if(this.state.lang !== nextProps.intl.locale){
            this.setState({
                lang: nextProps.intl.locale
            })
        }
    }
    /**
     * onload , set page line
     * @param {int} num line
     */
    setRowsPerPage(num) {
        this.setState({
            rowsPerPage: num
        })
        this.getBlockList(this.state.currentPage, num)
        //console.log(num)
    }

    /**
     * Select page number
     */
    handleSelectPage(pagenum) {
        this.setState({
            currentPage: pagenum
        })
        this.getBlockList(pagenum, this.state.rowsPerPage)
        //console.log(pagenum)
    }

    /**
     * input in page and jump
     */
    onChangeInputPage(e) {
        var re = /^[0-9]+$/
        var pagenum = e.target.value      //get put in page num
        //如果输入的页码不为空,并且如果输入的页码不符合规范(不是正整数，或者大于最大页码)
        if (pagenum != "" && (!re.test(pagenum) || pagenum == 0 || pagenum > this.state.pageCount)) {
            $('#inputPageNum').val('');   //清空输入框的内容
        }
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
        this.getBlockList(pagenum, this.state.rowsPerPage)
        //console.log('jump')
    }

    /*
     * get block list
     * */
    getBlockList(pageNum,rowsPerPage){
        var self = this
        $.ajax({
            url: '/api/all_transactions/',
            type: 'get',
            dataType: 'json',
            data: {
                size:rowsPerPage,
                page:pageNum,
            },
            success: function (data) {
                if(data.code==200){
                    self.setState({
                        transList:data.return_data,
                        totalItemsCount: data.total_size,
                        pageCount: data.total_page,
                    })
                }
                // console.log(data);
            }
        })
    }
    componentWillMount(){
        this.getBlockList(this.state.currentPage,this.state.rowsPerPage);
    }

    render() {
        return (
            <div className="blockList-page">
                <div className="blocklist-container">
                    <SubNavbar match={this.state.subNavbarMatch}/>
                </div>
                { this.state.transList.length > 0 &&
                <div className="list-table-block">
                    <h3 className="list-title">
                        <i className="fa fa-handshake"></i>
                        <FormattedMessage id="transaction" tagName="span"/>
                    </h3>
                    <div className="block-table-list">
                        <div className="table-list">
                            <table>
                                <thead>
                                <tr>
                                    <FormattedMessage id="txHash" tagName="td"/>
                                    <FormattedMessage id="block" tagName="td"/>
                                    <td>From</td>
                                    <td className="td-trans-circle"><i className="fa fa-arrow-alt-circle-right"></i></td>
                                    <td>To</td>
                                    <FormattedMessage id="value" tagName="td"/>
                                    <FormattedMessage id="time" tagName="td"/>                                    
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.transList && this.state.transList.map(function(item,index){
                                        return (

                                            <tr key={index}>
                                                <td className="td-trans-txHash">
                                                    <Link to={"/translist/"+ item.tx_hash}>
                                                        <i className="fa fa-handshake"></i>
                                                        <span>{item.tx_hash}</span>
                                                    </Link>
                                                </td>
                                                <td className="td-trans-color">
                                                    <Link to={"/blocklist/"+ item.block}>
                                                        <span>{item.block}</span>
                                                    </Link>
                                                </td>
                                                <td className="td-trans-color">
                                                    <Link to={"/address/"+ item.from}>
                                                        <span>{item.from}</span>
                                                    </Link>
                                                </td>
                                                <td className="td-trans-circle"><i className="fa fa-arrow-alt-circle-right"></i></td>
                                                <td className="td-trans-color">
                                                    <Link to={"/address/"+ item.to}>
                                                        <span>{item.to}</span>
                                                    </Link>
                                                </td>
                                                <td>{item.value}</td>
                                                <td>{item.age}</td>
                                            </tr>

                                        )
                                    }.bind(this))
                                }
                                </tbody>
                            </table>
                            <CustomPagination
                                from={(this.state.currentPage - 1) * this.state.rowsPerPage}
                                to={this.state.currentPage * this.state.rowsPerPage }
                                totalItemsCount={this.state.totalItemsCount}
                                totalPagesCount={this.state.pageCount}
                                currentPage={this.state.currentPage}
                                onChangeRowsPerPage={(num) => this.setRowsPerPage(num)}
                                onSelectPage={(e) => this.handleSelectPage(e)}
                                onChangePageInput={(e) => this.onChangeInputPage(e)}
                                onPageInputKeyDown={(e) => this.jumpPageKeyDown(e)}
                                onClickJumpButton={() => this.handleJumpPage()}
                            />
                        </div>
                    </div>
                </div>
                }
                {
                    (this.state.transList.length == 0 || !this.state.transList.length) &&
                    <div className="nullData">
                        <FormattedMessage id="nullData" tagName="p"/>
                    </div>
                }
            </div>
        )
    }
}

/* Inject intl to NodeStatus props */
const propTypes = {
    intl: intlShape.isRequired,
};
TransactionList.propTypes = propTypes
export default injectIntl(TransactionList)