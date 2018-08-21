import React from "react"
import $ from 'jquery'
import {injectIntl, intlShape, FormattedMessage } from 'react-intl'; /* react-intl imports */

export default class BlockList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="blocklist-container">
            BlockList
            </div>
        )
    }
}