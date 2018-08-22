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

/**
 * Scroll the window up on every navigation.
 * Documentaion: https://reacttraining.com/react-router/web/guides/scroll-restoration
 */
class ScrollToTop extends React.Component {
    componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
        window.scrollTo(0, 0)
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
            lang: 'en'
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
        // $.ajax({
        //     url:"/api/language/language",
        //     type: "POST",
        //     dataType: "json",
        //     data:{
        //         language: lang === 'en'?1:0
        //     },
        //     success: function(data){
        //         console.log(data)
        //     }
        // })
    }

    /**
     * 移动端折叠所有下拉列表
     */
    hideAllDropdownList(){
        $(".navbar-menu-mobile").removeClass('open')
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
                                        <input type="text" className="ipt-search" placeholder={messages[this.state.lang].iptSearchPlaceholder}/>
                                        <input type="button" className="btn-search" value={messages[this.state.lang].btnSearch}/>
                                    </div>
                                    <ul className="navbar-menu-pc">
                                        <li>
                                            <a href="/" target="blank">
                                                <FormattedMessage id="wallet" />
                                            </a>
                                        </li>
                                        <li>
                                            <NavLink exact to="/blocklist">
                                                <FormattedMessage id="block" />
                                            </NavLink>
                                        </li>  
                                        <li>
                                            <a href="https://explorer.trias.one/" target="blank">
                                                <FormattedMessage id="monitor" />
                                            </a>
                                        </li>                                  
                                        <li className="lang">
                                        <ToggleList
                                            listID="langlist"
                                            itemsToSelect={this.languageList}
                                            name={<i className="fas fa-globe-americas"></i>} />
                                        </li>
                                    </ul>
                                    <div className="dropdown-list navbar-menu-mobile lang">
                                        <i className="fas fa-globe-americas"></i>
                                        <div className="dropdown-list-box">
                                            <a href="javascript:void(0)" onClick={()=>this.changeLanguage('zh')} className={this.state.lang==='zh'?'active':''}>
                                                <i className="fas fa-globe-americas"></i>
                                                中文
                                            </a>
                                            <a href="javascript:void(0)" onClick={()=>this.changeLanguage('en')} className={this.state.lang==='en'?'active':''}>
                                                <i className="fas fa-globe-americas"></i>
                                                English
                                            </a>                          
                                        </div>
                                    </div>
                                    <div className="dropdown-list navbar-menu-mobile">
                                        <div className="icon-bar"></div>
                                        <div className="icon-bar"></div>
                                        <div className="icon-bar"></div>
                                        <div className="dropdown-list-box">
                                            <a href="/" target="blank">
                                                <FormattedMessage id="wallet" />
                                            </a>
                                            <NavLink exact to="/blocklist">
                                                <FormattedMessage id="block" />
                                            </NavLink>
                                            <a href="https://explorer.trias.one/" target="blank">
                                                <FormattedMessage id="monitor" />
                                            </a>                       
                                        </div>
                                    </div>                
                                </div>                
                            </header>
                            <main>
                                <Switch>
                                    <Route exact path="/" component={Home} />
                                    <Route exact path="/address" component={Address} />
                                    <Route exact path="/translist" component={TransactionList} />
                                    <Route exact path="/translist/:transID" component={TransactionDetail} />
                                    <Route exact path="/blocklist" component={BlockList} />
                                    <Route exact path="/blocklist/:blockID" component={BlockDetail} />
                                    <Route exact path="/address/:addressID" component={Address} />
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




  