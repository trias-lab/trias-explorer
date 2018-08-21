import React from "react"
import $ from 'jquery'
import {injectIntl, intlShape, FormattedMessage } from 'react-intl'; /* react-intl imports */
import SubNavbar from "./common/SubNavbar"

export default class BlockDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subNavbarMatch: this.props.match
        }
    }

    /**
     * Before a mounted component receives new props, reset some state.
     * Determine whether the location is changed, then update the navigation bar based on the current URL.
     * @param {Object} nextProps new props
     */
    componentWillReceiveProps(nextProps){
        if(this.state.subNavbarMatch.url !== nextProps.match.url){
            this.setState({
                subNavbarMatch: nextProps.match
            })
        }
    }

    render() {
        return (
            <div className="block-detail-container">
                <SubNavbar match={this.state.subNavbarMatch}/>                
            </div>
        )
    }
}