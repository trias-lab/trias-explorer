import React from "react"
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'; /* react-intl imports */

/* Component for no result found page */
export default class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    /**
     * Before a mounted component receives new props, reset some state.
     * Determine whether the 'match' is changed, then update states.
     * @param {Object} nextProps new props
     */
    componentWillReceiveProps(nextProps) {
        if (this.state.keyword !== nextProps.match.params.keyword) {   // if url changes
            this.setState({
                keyword: nextProps.match.params.keyword
            })
        }
    }

    render() {
        return (
            <div className="article-page">
                <section className="clearfix">
                    <div className="col col-xs-12 col-sm-12 col-md-8 col-xl-8">

                        <div className="article-pull-left">content</div>
                    </div>

                    <div className="col col-xs-12 col-sm-12 col-md-4 col-xl-4">

                        <div className="article-pull-right">

                            <ul className="article-tit">
                                <li className='clearfix'>
                                    <div> Category</div>  <div> Recent events</div>
                                </li>
                                <li className='clearfix'>
                                    <div> Date</div>  <div> November 12, 2018</div>
                                </li>
                                <li className='clearfix'    >
                                    <div> Hashtags</div>  <div> Recent eventsRecent eventsRecent eventsRecent events</div>
                                </li>
                            </ul>

                            <div className="article-recent">
                                <p className='recent-tit'>Recent articles</p>

                                <ul>
                                    <li className="clearfix">
                                        <img className="recent-item-img" src={require('../img/logo_black@2x.png')} />
                                        <div className="recent-item-des">
                                            <span className="item-tit">
                                                Recent Events
                                            </span>
                                            <div className="item-content">
                                                Facebook test feature shows what you have in common with stranger…
                                            </div>
                                        </div>
                                    </li>

                                    <li className="clearfix">
                                        <img className="recent-item-img" src={require('../img/logo_black@2x.png')} />
                                        <div className="recent-item-des">
                                            <span className="item-tit">
                                                Recent Events
                                            </span>
                                            <div className="item-content">
                                                Facebook test feature shows what you have in common with stranger…
                                        </div>
                                        </div>
                                    </li>

                                </ul>
                            </div>

                            <div className="article-line">
                                <p><i className="fa fa-thumbs-up"></i> by Trias-lab Foundation</p>
                                <div className='thumbs-line'></div>

                            </div>
                        </div>
                    </div>
                </section>



                <section className="related-articles">

                    <p className='related-articles-tit'>Related articles </p>

                    <div className='related-articles-content clearfix '>

                        <div className="col col-xs-12 col-sm-12 col-md-4 col-xl-4">

                            <div className="article-warp">
                                <img src={require('../img/bg_footer.jpg')} />


                                <div className="article-warp-item">
                                    <span className="item-tit">
                                        Recent Events
                                    </span>
                                    <div className="item-content">
                                        Magic Leap wants to create art, not just technology
                                    </div>


                                    <div className="item-des clearfix">
                                        <div className="item-tag">
                                            <i className="fa fa-tags" aria-hidden="true"></i> #security  #finance  #industrySolution  #innovations

                                        </div>
                                        <div className="item-time">
                                            <i className="fa fa-keyboard-o" aria-hidden="true"></i> November 12, 2018

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col col-xs-12 col-sm-12 col-md-4 col-xl-4">

                            <div className="">content</div>
                        </div>
                        <div className="col col-xs-12 col-sm-12 col-md-4 col-xl-4">

                            <div className="">content</div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}