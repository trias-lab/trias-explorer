import React from "react"
import $ from 'jquery'
import {injectIntl, intlShape, FormattedMessage } from 'react-intl'; /* react-intl imports */

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: this.props.intl.locale,
            blocksLatest:[]
        }
    }

    getLatestBlocks(){
        this.setState({
            blocksLatest:[{
                id:'#2983792',
                timestamp: '2018-08-17 19:11:19',
                size: '8493 B',
                reward: '12.93. BTC'
            },{
                id:'#2983792',
                timestamp: '2018-08-17 19:11:19',
                size: '8493 B',
                reward: '12.93. BTC'
            },{
                id:'#2983792',
                timestamp: '2018-08-17 19:11:19',
                size: '8493 B',
                reward: '12.93. BTC'
            },{
                id:'#2983792',
                timestamp: '2018-08-17 19:11:19',
                size: '8493 B',
                reward: '12.93. BTC'
            },{
                id:'#2983792',
                timestamp: '2018-08-17 19:11:19',
                size: '8493 B',
                reward: '12.93. BTC'
            },{
                id:'#2983792',
                timestamp: '2018-08-17 19:11:19',
                size: '8493 B',
                reward: '12.93. BTC'
            }]
        })
    }

    getLatestTrans(){
        this.setState({
            transLatest:[{
                id:'#OXABESG',
                timestamp: '2018-08-17 19:11:19',
                from: '0xcadhjkdsfiowe356',
                to: '0xcadhjkdsfiowe356'
            },{
                id:'#OXABESG',
                timestamp: '2018-08-17 19:11:19',
                from: '0xcadhjkdsfiowe356',
                to: '0xcadhjkdsfiowe356'
            },{
                id:'#OXABESG',
                timestamp: '2018-08-17 19:11:19',
                from: '0xcadhjkdsfiowe356',
                to: '0xcadhjkdsfiowe356'
            },{
                id:'#OXABESG',
                timestamp: '2018-08-17 19:11:19',
                from: '0xcadhjkdsfiowe356',
                to: '0xcadhjkdsfiowe356'
            },{
                id:'#OXABESG',
                timestamp: '2018-08-17 19:11:19',
                from: '0xcadhjkdsfiowe356',
                to: '0xcadhjkdsfiowe356'
            },{
                id:'#OXABESG',
                timestamp: '2018-08-17 19:11:19',
                from: '0xcadhjkdsfiowe356',
                to: '0xcadhjkdsfiowe356'
            },]
        })
    }

    componentDidMount(){
        this.getLatestBlocks()
        this.getLatestTrans()
    }

    render() {
        return (
            <div className="home-page">
                <section className="row text-center main-title ">
                    <FormattedMessage id="title" tagName="h1"/>
                    <p><i className="fas fa-thumbs-up"></i> by Trias-lab Foundation</p>
                </section>
                <section className="row">
                    <div className="col col-12 col-sm-12 col-md-6 col-xl-6">
                        <div id="lineChart1"></div>
                    </div>
                    <div className="col col-12 col-sm-12 col-md-6 col-xl-6">
                        <div id="lineChart2"></div>
                    </div>
                </section>
                <section className="row">
                    <div className="col col-12 col-sm-12 col-md-6 col-xl-6">
                    </div>
                    <div className="col col-12 col-sm-12 col-md-6 col-xl-6">
                    </div>
                </section>
                <section className="row">
                    <div className="col col-12 col-sm-12 col-md-6 col-xl-6 blocks-col latest-list">
                        <div className="list-head clearfix">
                            <img src="" alt="" className="pull-left"/>
                            <p>Latest Blocks</p>
                            <a href="/blocklist">View all <i className="fas fa-angle-right"></i></a>
                        </div>
                        <ul>
                            {
                                this.state.blocksLatest && this.state.blocksLatest.map(function(item,index){
                                    return (
                                        <li className="clearfix">
                                            <div className="name pull-left">
                                                <img src="" alt=""/><span>{item.id}</span>
                                            </div>  
                                            <div className="info">
                                                <p className="timestamp">{item.timestamp}</p>
                                                <p className="other">
                                                    <span>
                                                        <span className="key">Size:</span>
                                                        <span className="value">{item.size}</span>
                                                    </span>
                                                    <span>
                                                        <span className="key">Reward:</span>
                                                        <span className="value">{item.reward}</span>
                                                    </span>
                                                </p>
                                            </div>
                                        </li>
                                    )
                                })
                            }                    
                        </ul>
                    </div>
                    <div className="col col-12 col-sm-12 col-md-6 col-xl-6 trans-col latest-list">
                        <div className="list-head clearfix">
                            <img src="" alt="" className="pull-left"/>
                            <p>Latest Transactions</p>
                            <a href="/translist">View all <i className="fas fa-angle-right"></i></a>
                        </div>
                        <ul>
                            {
                                this.state.transLatest && this.state.transLatest.map(function(item,index){
                                    return (
                                        <li>
                                            <div className="name pull-left">
                                                <img src="" alt=""/><span>{item.id}</span>
                                            </div>                                            
                                            <div className="info">
                                                <p className="timestamp">{item.timestamp}</p>
                                                <p className="other">
                                                    <span>
                                                        <span className="key">From:</span>
                                                        <span className="value">{item.from}</span>
                                                    </span>
                                                    <span>
                                                        <span className="key">To:</span>
                                                        <span className="value">{item.to}</span>
                                                    </span>
                                                </p>
                                            </div>
                                        </li>
                                    )
                                })
                            }                    
                        </ul>
                    </div>
                </section>                
            </div>
        )
    }
}
/* Inject intl to Home props */
const propTypes = {
    intl: intlShape.isRequired,
};
Home.propTypes = propTypes
export default injectIntl(Home)