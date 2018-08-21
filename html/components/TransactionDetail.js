import React from "react"
import $ from 'jquery'
import {injectIntl, intlShape, FormattedMessage } from 'react-intl'; /* react-intl imports */

export default class TransactionDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transID: this.props.match.params.transID
        }
    }

    render() {
        return (
            <div className="trans-detail-container">
            TransactionDetail: {this.state.transID}
            </div>
        )
    }
}