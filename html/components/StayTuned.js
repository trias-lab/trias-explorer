import React from "react"
import {Link} from 'react-router-dom';
import {FormattedMessage } from 'react-intl'; /* react-intl imports */

/* Component for stay tuned page */
export default class StayTuned extends React.Component {
    constructor(props) {
        super(props);
    }

    goBack(){
        this.props.history.goBack()
    }

    render() {
        return (
            <div className="stay-tuned-page">
                <div className="center-box">
                    <FormattedMessage id="stayTunedTitle" tagName="h1" />
                    <FormattedMessage id="stayTunedHint" tagName="h2" /> 
                    <div className="btn-group">
                        <Link to="/"><FormattedMessage id="visitHomepage" /></Link>
                        <a href="javascript:void(0);" onClick={this.goBack.bind(this)}><FormattedMessage id="goBack" /> </a>
                    </div>
                </div>                
            </div>
        )
    }
}