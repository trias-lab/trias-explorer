import React from "react";
import $ from "jquery";
import {Link} from 'react-router-dom';
import {injectIntl, intlShape, FormattedMessage } from 'react-intl'; /* react-intl imports */

/**
 * Common footer section.
 */
class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: this.props.intl.locale
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.state.lang !== nextProps.intl.locale){
            this.setState({
                lang: nextProps.intl.locale
            })
        }
    }

    componentDidMount(){
        $('.common-footer .toggle-button').click(function(){
            if($(this).find('.toggle-box').css('display') === 'none'){
                $('.toggle-box').hide();
                $(this).find('.toggle-box').toggle();
            }else{
                $('.toggle-box').hide();
            }
        })
    }
    

    render(){
        return (
        <div className="common-footer">
            <div className="contacts">
                <a target="blank" href="https://twitter.com/triaslab">
                    <span className="btn-icon">
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                    </span>
                </a>
                <a target="blank" href="https://medium.com/@Triaslab">
                    <span className="btn-icon">
                        <i className="fab fa-medium-m"></i>
                    </span>
                </a>
                <a className="wechat-button toggle-button" href="javascript:void(0)">
                    <span className="btn-icon">
                        <i className="fa fa-weixin" aria-hidden="true"></i>
                    </span>
                    <div className='qrcode toggle-box'>
                        <img src={require('../../img/wechat-qrcode.jpeg')} />
                    </div>
                </a>
                <a target="blank" href="https://www.reddit.com/r/Trias_Lab">
                    <span className="btn-icon">
                        <i className="fab fa-reddit-alien"></i>
                    </span>
                </a>
                <span className="telegram-button toggle-button">
                    <span className="btn-icon">
                        <i className="fab fa-telegram-plane"></i>
                    </span>
                    <div className='telegram-box toggle-box'>
                        <a target="blank" href="https://t.me/triaslab">Telegram-English</a>
                        <a target="blank" href="https://t.me/TriasChinese">Telegram-中文</a>
                        <a target="blank" href="https://t.me/TriasOfficial">Telegram-Channel</a>
                    </div>
                </span>
                <a target="blank" href="https://0.plus/sp/triaslab">
                    <span className="btn-icon logo-biyong">
                        <i className="fas fa-envelope" style={{color:'transparent'}}></i>
                    </span>
                </a>
                <a target="blank" href="https://github.com/trias-lab/Documentation">
                    <span className="btn-icon">
                        <i className="fa fa-github" aria-hidden="true"></i>
                    </span>
                </a>                
                <a className="email-button toggle-button">
                    <span className="btn-icon">
                        <i className="fas fa-envelope"></i>
                    </span>
                    <div className='email-box toggle-box'>
                        <FormattedMessage id="email" /> contact@trias.one
                    </div>
                </a>
            </div>
            <div className="info">
                <div className="center-box clearfix">
                    <div className="intro pull-left">
                        <img src={require('../../img/logo.png')} alt=""/>
                        <FormattedMessage id="footerIntro" tagName="p"/>
                    </div>
                    <div className="links pull-right">
                        <div className="docs">
                            <FormattedMessage id="blockchainExplorer" tagName="h2"/>
                            <div className="link">
                                <a href="/" target="blank">
                                    <FormattedMessage id="wallet" />
                                </a>
                            </div>
                            <div className="link">
                                <Link to="/blocklist">
                                    <FormattedMessage id="block" />
                                </Link>
                            </div>
                            <div className="link">
                                <a href="https://explorer.trias.one/" target="blank">
                                    <FormattedMessage id="monitor" />
                                </a>
                            </div>
                        </div>
                        {/* <div className="about-us"></div> */}
                    </div>
                </div>
                <div className="center-box clearfix">
                    <hr/>
                    <span className="pull-left">© 2018 Trias-lab Foundation. </span>
                    <span className="pull-right">All rights reserved.</span>
                </div> 
            </div>                   
        </div>
        )
    }
}

/* Inject intl to NodeStatus props */
const propTypes = {
    intl: intlShape.isRequired,
};
Footer.propTypes = propTypes
export default injectIntl(Footer)
