import React from "react"
import { BrowserRouter as Router, Route, Link, NavLink, Switch, Redirect} from 'react-router-dom'
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

import DropdownList from './common/DropdownList'    //import drop-down list component
import Home from "./Home"
import Other from "./Other"
import Footer from "./common/Footer"
import BlockList from "./BlockList"
import BlockDetail from "./BlockDetail"
import TransactionList from "./TransactionList"
import TransactionDetail from "./TransactionDetail"
import Address from "./Address"

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
                    <div>
                        <header className="header">
                            <div>
                                <div className="logo">
                                    <Link to="/">
                                        <img src={require("../img/logo.png")} alt="" />
                                    </Link>
                                </div>
                                <div className="btn-group">
                                    <input type="text" className="ipt-search"/>
                                    <input type="button" className="btn-search" value={this.state.lang==='zh'?"搜索":"Search"}/>
                                </div>
                                <ul className="navbar-menu-pc">
                                    <li>
                                        <NavLink exact to="/" activeClassName="active">
                                            <FormattedMessage id="home" />
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink exact to="/other" activeClassName="active">
                                            other
                                        </NavLink>
                                    </li>                                   
                                    <li className="lang">
                                    <DropdownList
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
                                        <NavLink exact to="/" onClick={()=> this.hideAllDropdownList()} >
                                            <FormattedMessage id="home" />
                                        </NavLink>
                                        <NavLink exact to="/other" onClick={()=> this.hideAllDropdownList()} >
                                            other
                                        </NavLink>                        
                                    </div>
                                </div>                
                            </div>                
                        </header>
                        <main>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/translist" component={TransactionList} />
                                <Route exact path="/translist/:transID" component={TransactionDetail} />
                                <Route exact path="/blocklist" component={BlockList} />
                                <Route exact path="/blocklist/:blockID" component={BlockDetail} />
                                <Route exact path="/address/:addressID" component={Address} />
                                <Redirect to="/" component={Home} /> {/* if no routes above is matched */}
                            </Switch>                            
                        </main>
                        <Footer/>
                    </div>
                </Router>
            </IntlProvider>
        )
    }
}