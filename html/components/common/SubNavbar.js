import React from "react";
import $ from "jquery";
import {NavLink} from 'react-router-dom';
import {injectIntl, intlShape, FormattedMessage } from 'react-intl'; /* react-intl imports */

/**
 * Common SubNavbar section above tables.
 * 
 * usage:
 * <SubNavbar match={this.state.match}/>
 * 
 * - match: pass this.props.match to SubNavbar component
 */
class SubNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: this.props.intl.locale, 
            messages: this.props.intl.messages,
            match: this.props.match,         
            subNavbarTitle: "",
            navList: [], // items in navigation bar
        }
    }

    /**
     * Before a mounted component receives new props, reset some state.
     * Determine whether the 'match' or 'lang' prop  is changed, then update the navigation bar based on the current URL.
     * @param {Object} nextProps new props
     */
    componentWillReceiveProps(nextProps) {
        if(this.state.match.url !== nextProps.match.url){   // if url changes
            this.setState({
                match: nextProps.match
            },()=>{ // update navbar
                this.setNavList()
            })
        }
        if(this.state.lang !== nextProps.intl.locale){  // if language changes
            this.setState({
                lang: nextProps.intl.locale,
                messages: nextProps.intl.messages
            },()=>{ // update navbar
                this.setNavList()
            })
        }        
    }

    componentDidMount(){
        this.setNavList()
    }
    
    /**
     * According to the 'match', update navbar
     */
    setNavList(){
        let messages = this.state.messages  // current react-intl messages
        let path = this.state.match.path    // reference to the 'path' of Routes configured in main.js
        let url = this.state.match.url      // current url
        let params = this.state.match.params // params passed in the url
        if(path === '/blocklist'){
            this.setState({
                navList: [
                    {name:messages.home, path:"/"},
                    {name:messages.blocks, path:url}
                ],
                subNavbarTitle: messages.blocks
            })
        }else if(path === '/blocklist/:blockID'){
            this.setState({
                navList: [
                    {name:messages.home,path:"/"},
                    {name:messages.blocks, path:"/blocklist"},
                    {name:messages.block+' '+params.blockID, path:url}
                ],
                subNavbarTitle: messages.block
            })
        }else if(path === '/translist'){
            this.setState({
                navList: [
                    {name:messages.home,path:"/"},
                    {name:messages.transactions, path:url}
                ],
                subNavbarTitle: messages.transactions
            })
        }else if(path === '/translist/:transID'){
            this.setState({
                navList: [
                    {name:messages.home,path:"/"},
                    {name:messages.transactions, path:'/translist'},
                    {name:messages.transaction+' '+params.transID, path:url}
                ],
                subNavbarTitle: messages.transaction
            })
        }else if(path === '/address/:addressID'){
            this.setState({
                navList: [
                    {name:messages.home,path:"/"},
                    {name:messages.address+' '+params.addressID, path:url}
                ],
                subNavbarTitle: messages.address
            })
        }
    }

    render(){
        
        return (
            <div className="sub-header">
                <div className="center-box">
                    {
                        this.state.subNavbarTitle && <h1>{this.state.subNavbarTitle}</h1>
                    }
                    <h2>
                        {this.state.navList.map(function(item,index){
                            if(index){
                                return (
                                <span key={"nav-"+index}>
                                    <span className="angle"><i className="fas fa-angle-right"></i></span>
                                    <NavLink exact to={item.path} activeClassName="active">{item.name}</NavLink>
                                </span>
                                )
                            }else{  //first nav
                                return (
                                <span key={"nav-"+index}>
                                    <NavLink exact to={item.path} activeClassName="active">{item.name}</NavLink>
                                </span>
                                )
                            }
                        })}
                    </h2>
                    {
                        this.state.match.path === '/address/:addressID' && 
                        <div className="address-qrcode"><img src="" alt=""/></div>
                    }
                </div>
            
        </div>
        )
    }
}

/* Inject intl to NodeStatus props */
const propTypes = {
    intl: intlShape.isRequired,
};
SubNavbar.propTypes = propTypes
export default injectIntl(SubNavbar)
