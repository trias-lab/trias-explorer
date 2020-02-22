import React from "react"
import $ from 'jquery';
import { Pagination } from 'react-bootstrap';   // import Pagination component
import {injectIntl, intlShape, FormattedMessage } from 'react-intl'; /* react-intl imports */
import DropdownList from "./DropdownList";     // import custom drop-down list component
import PropTypes from 'prop-types';

/**
 * Custom pagination component.
 * Combined with pagenation component of React-Bootstrap.
 * 
 * ### Example:
 * ```js
 * <CustomPagination
 *  from={(this.currentPage-1)*this.state.rowsPerPage}
 *  to={this.currentPage*this.state.rowsPerPage}
 *  totalItemsCount={this.state.totalItemsCount}
 *  totalPagesCount={this.state.pageCount}
 *  currentPage={this.currentPage}
 *  onChangeRowsPerPage={(num)=>this.setRowsPerPage(num)}
 *  onSelectPage={(e)=>this.handleSelectPage(e)}
 *  onPageInputKeyDown={(e)=>this.jumpPageKeyDown(e)}
 *  onClickJumpButton={()=>this.handleJumpPage()}
 *  pageNumInputId="logsPage"
 *  dropdownListId="rowsPerPageList"
 *  rowsPerPageRange={[{name: '50 项/页',value: 50},
 *      {name: '100 项/页',value: 100},
 *      {name: '150 项/页',value: 150},
 *      {name: '200 项/页',value: 200}]}
 * />
 * ```
 */
class CustomPagination extends React.Component {
    static propTypes = {
        /** Inject intl to CustomPagination props */
        intl: intlShape.isRequired,
        /** Index of first row in current page */
        from: PropTypes.number,
        /** Index of last row in current page. */
        to: PropTypes.number,
        /** Total number of items. */
        totalItemsCount: PropTypes.number,
        /** Total number of pages. */
        totalPagesCount: PropTypes.number,
        /** Current page number */
        currentPage: PropTypes.number,
        /** Handler for the change of maximum number of rows per page. */
        onChangeRowsPerPage: PropTypes.func,
        /** Handler for the change of current page number by clicking buttons in the pagination. */
        onSelectPage: PropTypes.func,
        /** Event handler for the change event of the page number input area. */
        onPageInputKeyDown: PropTypes.func,
        /** Event handler for the keydown event of the page number input area. */
        onClickJumpButton: PropTypes.func,
        /** (Optional) Id of the page number `<input>`, required when there are multiple CustomPaginations in a page. */
        pageNumInputId: PropTypes.string,
        /** (Optional) Id of the DropdownList, required when there are multiple CustomPaginations or DropdownLists in a page. */
        dropdownListId: PropTypes.string,
        /** (Optional) Options for the drop-down list of the maximum number of rows per page*/
        rowsPerPageRange: PropTypes.object
    }

    static defaultProps = {
        from: 0,
        to: 0,
        totalItemsCount: 0,
        totalPagesCount: 0,
        currentPage: 0,
        pageNumInputId: 'inputPageNum',
        dropdownListId:'rows-per-page-list'
    }
    constructor(props) {
        super(props);
    }

    /**
     * qhen input value of page number changed, check the format
     */
    onChangeInputPage(e) {
        var re = /^[0-9]+$/
        var pagenum = e.target.value      //get put in page num
        // the value should be positive interger, and not exceed the maximum number of pages
        if (pagenum != "" && (!re.test(pagenum) || pagenum == 0 || pagenum > this.props.totalPagesCount)) {
            $('#'+this.props.pageNumInputId).val('');   // clear the input
        }
    }

    render(){
        const from = this.props.from || 0  // index of first row in current page, 0 by default
        const to = this.props.to || 0      // index of last row in current page, 0 by default
        const totalItemsCount = this.props.totalItemsCount || 0   // total number of items, 0 by default
        const totalPagesCount = this.props.totalPagesCount || 0   // total number of pages, 0 by default
        const currentPage = this.props.currentPage || 0           // current page number, 0 by default
        const pageNumInputId = this.props.pageNumInputId || "inputPageNum"        // id of the page number <input>, 'inputPageNum' by default
        const dropdownListId = this.props.dropdownListId || "rows-per-page-list"  // id of the DropdownList, 'rows-per-page-list' by default

        const locale = this.props.intl.locale // local language

        return (
            <div className="pagination-all clearfix">
                {/* select the maximum number of rows per page*/}
                <div className="rowsPerPage pc">
                    <DropdownList
                        listID={dropdownListId}
                        itemsToSelect={this.props.rowsPerPageRange || [
                            {
                                name: locale==='zh'?'10 项/页':'10 / page',
                                value: 10
                            }, {
                                name: locale==='zh'?'20 项/页':'20 / page',
                                value: 20
                            }, {
                                name: locale==='zh'?'30 项/页':'30 / page',
                                value: 30
                            }, {
                                name: locale==='zh'?'40 项/页':'40 / page',
                                value: 40
                            }, {
                                name: locale==='zh'?'50 项/页':'50 / page',
                                value: 50
                            },
                        ]}
                        onSelect={(item) => this.props.onChangeRowsPerPage(item)} />
                    <p className='itemsCount'>
                        <FormattedMessage id='paginationItemsCountP' values={{from: from, to: to, count: totalItemsCount}} />
                    </p>
                </div>
                <div className="pagination-right clearfix pc">
                    <Pagination
                        prev="Previous"
                        next="Next"
                        first={false}
                        last={false}
                        ellipsis={true}
                        boundaryLinks={true}
                        items={totalPagesCount}
                        maxButtons={3}
                        activePage={currentPage}
                        onSelect={this.props.onSelectPage.bind(this)} />
                </div>
                {/* For mobile devices */}
                <div className="clearfix mobile">
                    <input type="button"
                        disabled={currentPage<=1}
                        className="btn-prev"
                        onClick={() => this.props.onSelectPage(currentPage-1)}
                        value="Previous" />
                    {/* Use the key prop to force rendering of an entirely new input */}
                    <form action="javascript:return true;" id="pageNum" className="pageCount">
                        {/* disable refresh of  whole page */}
                        <input
                            className="pageNum"
                            id={pageNumInputId}
                            type="number"
                            key={currentPage}
                            defaultValue={currentPage}
                            onChange={this.onChangeInputPage.bind(this)}
                            onKeyDown={this.props.onPageInputKeyDown.bind(this)
                            }
                        />
                        <span className='totalPages'> of {totalPagesCount}</span>
                    </form>
                    <input type="button"
                        disabled={currentPage>=totalPagesCount}
                        className="btn-next"
                        onClick={() => this.props.onSelectPage(currentPage+1)}
                        value="Next"/>
                </div>
            </div>
        )
    }
}

export default injectIntl(CustomPagination)