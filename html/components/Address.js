import React from "react"
import $ from 'jquery'
import {injectIntl, intlShape, FormattedMessage } from 'react-intl'; /* react-intl imports */

export default class Address extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transID: this.props.match.params.addressID
        }
    }

    render() {
        return (
            <div className="address-container">
            Address: {this.state.addressID}
            </div>
        )
    }
}