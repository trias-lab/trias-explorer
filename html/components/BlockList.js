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
                <div className="banner-top">
                    <h2>Blocks</h2>
                    <h3>
                        <a href="">Home</a>
                        <i className="fa fa-angle-right"></i>
                        <span>Blocks </span>
                    </h3>
                </div>

            </div>
        )
    }
}