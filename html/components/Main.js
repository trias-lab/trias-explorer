import React from "react"
import { BrowserRouter as Router, Route, Link, NavLink, Switch, Redirect, withRouter } from 'react-router-dom'
// import ES6Promise from 'es6-promise'
// ES6Promise.polyfill() //关键代码,让ie识别promise对象!
import { addLocaleData, IntlProvider, FormattedMessage } from 'react-intl'; /* react-intl imports */
/* React Intl relies on locale data to support its plural and relative-time formatting features. */
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import zh_CN from "../locale/zh_CN"     // import defined messages in Chinese
import en_US from "../locale/en_US"     // import defined messages in English
/* Import basic support for another locale if needed */
addLocaleData([...en, ...zh]);  // load React Intl's locale data for multiple languages
import $ from 'jquery'

import ToggleList from './common/ToggleList'    //import drop-down list component
import Home from "./Home"
import Other from "./Other"
import Footer from "./common/Footer"
import BlockList from "./BlockList"
import BlockDetail from "./BlockDetail"
import TransactionList from "./TransactionList"
import TransactionDetail from "./TransactionDetail"
import Address from "./Address"
import NotFound from "./NotFound"
import StayTuned from "./StayTuned";

global.Intl = require('intl');  // for older browsers

/**
 * Scroll the window up on every navigation.
 * Documentaion: https://reacttraining.com/react-router/web/guides/scroll-restoration
 */
class ScrollToTop extends React.Component {
    componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
        window.scrollTo(0, 0)

        // if locaiton changes, clear search input
        if($('#searchPC').val()!==''){
            $('#searchPC').val('')
        }
        if($('#searchMobile').val()!==''){
            $('#searchMobile').val('')
        }
      }
    }
  
    render() {
      return this.props.children
    }
}

const ScrollToTopComponent = withRouter(ScrollToTop)

/**
 * Main component, containing routes configuration and navigation bar.
 */
export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: 'en',
        }
    }

    /**
     * Change language
     * @param {String} lang new language
     */
    changeLanguage(lang) {
        this.setState({
            lang: lang
        })
    }

    componentDidMount() {
        var self = this
        // Bind search event of search input for mobile devices
        $('#formSearch').bind('search', function (ele) {
            self.search()
            $('#searchMobile').blur();  // blur the input to let keyboard hide
        });
    }

    /**
     * Search transaction/block/address by txHash/block hash/address
     */
    search(){
        var self = this
        let keyword = ''
        if($('.mobile').css('display') === 'none'){
            keyword = $('#searchPC').val()
        }else{
            keyword = $('#searchMobile').val()
        }

        if(keyword){
            $.ajax({
                url: '/api/search',
                type: 'get',
                dataType: 'json',
                data: {
                    key: keyword
                },
                success: function (data) {
                    if(data.code==200){
                        if(data.data_type==="address"){
                            self.setState({
                                redirect:<Redirect to={"/address/"+data.address} />
                            },()=>{
                                self.setState({
                                    redirect: null
                                })
                            })
                        }else if(data.data_type==="transaction"){
                            self.setState({
                                redirect:<Redirect to={"/translist/"+data.tx_hash} />
                            },()=>{
                                self.setState({
                                    redirect: null
                                })
                            })
                        }else if(data.data_type==="block"){
                            self.setState({
                                redirect:<Redirect to={"/blocklist/"+data.block_hash} />
                            },()=>{
                                self.setState({
                                    redirect: null
                                })
                            })
                        }
                    }else{
                        self.setState({
                            redirect:<Redirect to={"/notfound/"+keyword} />
                        },()=>{
                            self.setState({
                                redirect: null
                            })
                        })
                    }                
                }
            })
        }        
    }

    /**
     * Keydown event handler for the search input
     * @param {*} e 
     */
    handleKeyDown(e){
        if (e.keyCode === 13) {           // Enter key
            this.search()
        }
    }

    /**
     * Check input of saerch keyword
     * @param {Object} e 
     */
    checkSearchKeyword(e){
        // replace all characters that is not a word character.
        var keyword = e.target.value.replace(/[\W]/g,'')
        $(e.target).val(keyword)
    }

    render() {
        let messages = {}
        messages['en'] = en_US;
        messages['zh'] = zh_CN;

        this.languageList = [{
            ele: <span onClick={()=>this.changeLanguage('zh')} className={this.state.lang==='zh'?'active':''}>
                <i className="fas fa-globe-americas"></i>
                中文
            </span>
        }, {
            ele: <span  onClick={()=>this.changeLanguage('en')} className={this.state.lang==='en'?'active':''}>
                <i className="fas fa-globe-americas"></i>
                English
            </span>
        }]

        this.navlistMobile = [{
            ele: <a href="https://www.trias.one/" target="blank"><FormattedMessage id="triasProject" /></a>
        },{
            ele:  <Link to="/stayTuned"><FormattedMessage id="wallet" /></Link>
        }, {
            ele:  <Link to="/blocklist"><FormattedMessage id="block" /></Link>
        },{
            ele: <a href="https://monitor.trias.one/" target="blank"><FormattedMessage id="monitor" /></a>
        }]

        return (
            <IntlProvider locale={this.state.lang} messages={messages[this.state.lang]}>
                <Router>
                    <ScrollToTopComponent>
                        <div>
                            <header className="header">
                                <div>
                                    <div className="logo">
                                        <Link to="/">
                                            <img src={require("../img/logo.png")} alt="" />
                                        </Link>
                                    </div>
                                    <div className="btn-group">
                                        <input id="searchPC" type="text" maxLength="42" className="ipt-search" 
                                            placeholder={messages[this.state.lang].iptSearchPlaceholder}
                                            onKeyDown={(e) => this.handleKeyDown(e)}
                                            onKeyUp={(e) => this.checkSearchKeyword(e)}/>
                                        <input type="button" className="btn-search" value={messages[this.state.lang].btnSearch} 
                                            onClick={this.search.bind(this)} />
                                    </div>
                                    <ul className="navbar-menu-pc">
                                        <li>
                                            <a href="https://www.trias.one/" target="blank">
                                                <FormattedMessage id="triasProject" />
                                            </a>
                                        </li>
                                        <li>
                                            <Link to="/stayTuned">
                                                <FormattedMessage id="wallet" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/blocklist">
                                                <FormattedMessage id="block" />
                                            </Link>
                                        </li>  
                                        <li>
                                            <a href="https://monitor.trias.one/" target="blank">
                                                <FormattedMessage id="monitor" />
                                            </a>
                                        </li>                                  
                                        <li>
                                        <ToggleList
                                            className="lang"
                                            listID="langlist"
                                            itemsToSelect={this.languageList}
                                            name={<span><i className="fas fa-globe-americas"></i><i className="fas fa-angle-down"></i></span>} />
                                        </li>
                                    </ul>
                                    <ToggleList
                                        className="lang mobile"
                                        listID="langlistMobile"
                                        itemsToSelect={this.languageList}
                                        name={<i className="fas fa-globe-americas"></i>} />
                                    <ToggleList
                                        className="navlist mobile"
                                        listID="navlistMobile"
                                        itemsToSelect={this.navlistMobile}
                                        name={<span>
                                                <div className="icon-bar"></div>
                                                <div className="icon-bar"></div>
                                                <div className="icon-bar"></div>
                                            </span>} 
                                        />
                                </div>
                                <form action="" id="formSearch" className="mobile">
                                    {/* disable refresh of  whole page */}
                                    <input type="text" name="test" style={{display:'none'}}/>
                                    <input id="searchMobile" type="search" maxLength="42" className="ipt-search" 
                                        placeholder={messages[this.state.lang].iptSearchPlaceholder}
                                        onKeyUp={(e) => this.checkSearchKeyword(e)} />
                                    <span className="search-icon"><i className="fas fa-search"></i></span>
                                    {this.state.redirect}
                                </form>                                              
                            </header>
                            <main>
                                <Switch>
                                    <Route exact path="/" component={Home} />
                                    <Route exact path="/translist" component={TransactionList} />
                                    <Route exact path="/translist/:transID" component={TransactionDetail} />
                                    <Route exact path="/blocklist" component={BlockList} />
                                    <Route exact path="/blocklist/:blockID" component={BlockDetail} />
                                    <Route exact path="/address/:addressID" component={Address} />
                                    <Route exact path="/notfound/:keyword" component={NotFound} />
                                    <Route exact path="/stayTuned" component={StayTuned} />
                                    <Redirect to="/"/> {/* if no routes above is matched */}
                                </Switch>                            
                            </main>
                            <Footer/>
                        </div>
                    </ScrollToTopComponent>
                </Router>
            </IntlProvider>
        )
    }
}




  