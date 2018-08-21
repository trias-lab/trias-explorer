import React from "react"
import $ from 'jquery'
import {injectIntl, intlShape, FormattedMessage } from 'react-intl'; /* react-intl imports */

export default class BlockDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blockID: this.props.match.params.blockID
        }
    }

    render() {
        return (
            <div className="block-detail-container">
            BlockDetail: {this.state.blockID}
            </div>
        )
    }
}