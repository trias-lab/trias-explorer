import React from "react"
import $ from 'jquery'
import {injectIntl, intlShape, FormattedMessage } from 'react-intl'; /* react-intl imports */
import SubNavbar from "./common/SubNavbar"

export default class BlockList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subNavbarMatch: this.props.match    // Route  match props
        }
    }

    
    componentWillReceiveProps(nextProps){
        if(this.state.subNavbarMatch.url !== nextProps.match.url){
            this.setState({
                subNavbarMatch: nextProps.match
            })
        }
    }

    render() {
        return (
            <div className="blocklist-container">
                <SubNavbar match={this.state.subNavbarMatch}/>
            </div>
        )
    }
}