import React from "react"
import $ from 'jquery'
import { Link } from 'react-router-dom'
import {injectIntl, intlShape, FormattedMessage } from 'react-intl'; /* react-intl imports */
import SubNavbar from "./common/SubNavbar"
import CustomPagination from "./common/CustomPagination"
class BlockList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: this.props.intl.locale,
            subNavbarMatch: this.props.match,   // Route  match props
            totalItemsCount: 200, //total number = pageCount*rowsPerPage
            pageCount: 10, //total page
            rowsPerPage: 20, //number each page
            currentPage: 1, //current page number
            blockList:false,//init block list
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
            url: '/api/all_blocks/',
            type: 'get',
            dataType: 'json',
            data: {
                size:rowsPerPage,
                page:pageNum,
            },
            success: function (data) {
                if(data.code==200){
                    self.setState({
                        blockList:data.return_data,
                        totalItemsCount: self.state.rowsPerPage * data.total_page ,
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
                { this.state.blockList.length > 0 &&
                    <div className="list-table-block">
                        <h3 className="list-title"> <i className="fa fa-chart-pie"></i>block</h3>
                        <div className="block-table-list">
                            <div className="table-list">
                                <table>
                                    <thead>
                                    <tr>
                                        <td>height</td>
                                        <td>Tx Count</td>
                                        <td>Size (bytes)</td>
                                        <td>Avg Fee Per Tx</td>
                                        <td>Reward</td>
                                        <td>Time</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.blockList && this.state.blockList.map(function(item,index){
                                            return (

                                                <tr key={index}>
                                                    <td className="td-block-height">
                                                        <Link to={"/blocklist/:"+ item.block_hash}><i className="fa fa-chart-pie"></i>{item.height}</Link>
                                                    </td>
                                                    <td>{item.tx_count}</td>
                                                    <td>{item.size}</td>
                                                    <td className="td-block-fee"> <span> {item.avg_fee_per_tx}</span></td>
                                                    <td>{item.reward}</td>
                                                    <td>{item.time}</td>
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
                    (this.state.blockList.length == 0 || !this.state.blockList.length) &&
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
BlockList.propTypes = propTypes
export default injectIntl(BlockList)