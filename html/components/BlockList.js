import React from "react"
import $ from 'jquery'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'; /* react-intl imports */
import SubNavbar from "./common/SubNavbar"
import CustomPagination from "./common/CustomPagination"

/**
 * Component for block list
 */
export default class BlockList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subNavbarMatch: this.props.match,   // Route  match props
            totalItemsCount: 100, //total number = pageCount*rowsPerPage
            pageCount: 10, //total page
            rowsPerPage: 10, //number each page
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
    }

    /**
     * onload , set page line
     * @param {int} num line
     */
    setRowsPerPage(num) {
        this.setState({
            rowsPerPage: num,
            currentPage: 1
        })
        this.getBlockList(1, num)
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
     * enter page and jump
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

    /**
     * Get block list
     * @param {int} pageNum page number
     * @param {int} rowsPerPage number of items per page
     * @public
     */
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
                        pageCount: data.total_page,
                        totalItemsCount:data.total_size,
                    })
                }
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
                        <h3 className="list-title">
                            <i className="fa fa-cubes"></i>
                            <FormattedMessage id="latestBlocks" tagName="span"/>
                        </h3>
                        <div className="block-table-list">
                            <div className="table-list">
                                <table>
                                    <thead>
                                    <tr>
                                        <FormattedMessage id="height" tagName="td"/>
                                        <FormattedMessage id="txCount" tagName="td"/>
                                        <td><FormattedMessage id="size"/> (bytes)</td>
                                        <FormattedMessage id="avgFeePerTx" tagName="td"/>
                                        <FormattedMessage id="reward" tagName="td"/>
                                        <FormattedMessage id="time" tagName="td"/>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.blockList && this.state.blockList.map(function(item,index){
                                            return (

                                                <tr key={index}>
                                                    <td className="td-block-height">
                                                        <Link to={"/blocklist/"+ item.hash}><i className="fa fa-cube"></i>{item.number}</Link>
                                                    </td>
                                                    <td>{item.transactionsCount}</td>
                                                    <td>{item.size}</td>
                                                    <td className="td-block-fee"> <span> {item.avgFee}</span></td>
                                                    <td>{item.blockReward}</td>
                                                    <td>{item.time}</td>
                                                </tr>

                                            )
                                        }.bind(this))
                                    }
                                    </tbody>
                                </table>
                            </div>
                            <CustomPagination
                                from={(this.state.currentPage - 1) * this.state.rowsPerPage}
                                to={(this.state.currentPage-1)*this.state.rowsPerPage + (this.state.blockList?this.state.blockList.length:0)}
                                totalItemsCount={this.state.totalItemsCount}
                                totalPagesCount={this.state.pageCount}
                                currentPage={this.state.currentPage}
                                onChangeRowsPerPage={(num) => this.setRowsPerPage(num)}
                                onSelectPage={(num) => this.handleSelectPage(num)}
                                onPageInputKeyDown={(e) => this.jumpPageKeyDown(e)}
                            />
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