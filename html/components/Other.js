import React from "react"
import $ from 'jquery'
import {injectIntl, intlShape, FormattedMessage } from 'react-intl'; /* react-intl imports */

/* Component for node status page */
class Other extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: this.props.intl.locale
        }
    }

    render() {
        return (
            <div className="other-page">
                Some other page
            </div>
        )
    }
}
/* Inject intl to Home props */
const propTypes = {
    intl: intlShape.isRequired,
};
Other.propTypes = propTypes
export default injectIntl(Other)