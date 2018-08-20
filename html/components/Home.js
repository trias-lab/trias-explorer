import React from "react"
import $ from 'jquery'
import {injectIntl, intlShape, FormattedMessage } from 'react-intl'; /* react-intl imports */

/* Component for node status page */
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: this.props.intl.locale
        }
    }

    render() {
        return (
            <div className="home-page">
                <FormattedMessage id="home" tagName="h1" />
            </div>
        )
    }
}
/* Inject intl to Home props */
const propTypes = {
    intl: intlShape.isRequired,
};
Home.propTypes = propTypes
export default injectIntl(Home)