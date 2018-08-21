/**
 * 
 * Address Page
 * 
 */
import React from "react"
import $ from "jquery"
import { Link } from 'react-router-dom'
import CustomPagination from "./common/CustomPagination"
import {injectIntl, intlShape, FormattedMessage } from 'react-intl'; /* react-intl imports */
export default class BlockInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addressID: this.props.match.params.addressID,
            nodeSearchKey: '',//节点列表搜索关键字
            totalItemsCount: 100,
            pageCount: 10,
            tradeList: [],
            rowsPerPage: 10,
            currentPage: 1,
            infoList: [],
            // nodeid: this.props.location.state.nodeid,
            // blockid: this.props.match.params.blockid,
        }
    }

    componentDidMount() {
        this.getList(this.state.currentPage, this.state.rowsPerPage);
        this.getInfo();
    }

    /**
     * Before a mounted component receives new props, reset some state.
     * If block is changed, reset the state blockid and get new data
     * @param {Object} nextProps new props
     */
    // componentWillReceiveProps(nextProps){
    //     if(this.props.match.params.blockid !== nextProps.match.params.blockid){   // if blockid changed.
    //         this.setState({
    //             blockid: nextProps.match.params.blockid
    //         },()=>{
    //             this.getList(this.state.currentPage, this.state.rowsPerPage);
    //             this.getInfo()
    //         })            
    //     }
    // }

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
                // self.setState({
                //     tradeList: data.data,
                //     totalItemsCount: data.total_item,
                //     pageCount: data.total_page,
                // })

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

    /**
     * 跳转输入框的onChange监听
     */
    onChangeInputPage(e) {
        var re = /^[0-9]+$/
        var pagenum = e.target.value      //获取输入的页码
        //如果输入的页码不为空,并且如果输入的页码不符合规范(不是正整数，或者大于最大页码)
        if (pagenum != "" && (!re.test(pagenum) || pagenum == 0 || pagenum > this.state.pageCount)) {
            $('#inputPageNum').val('');   //清空输入框的内容                       
        }
    }
    /**
     * 跳转输入框的按键事件监听
     * @return {[type]} [description]
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
        //console.log('jump')
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
                // self.setState({
                //     infoList: data.data,
                //     node_ip: data.block_title
                // })
                console.log(data);
            }
        })
    }
    render() {
        // var self = this
        // var cutomInfoHeader = this.state.infoList.map(item =>
        //     <div key={item[1]} className='cutomUglily-row'>
        //         <div className='cutomUglily-title'>{item[0]} </div>
        //         <div className='cutomUglily-content'>{item[1]}</div>
        //     </div>
        // )
        return (
            <div className='address-container'>
                <div className="page-content">
                </div>
            </div>
        )
    }
}