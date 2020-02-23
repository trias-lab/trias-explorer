import React from "react"
import {FormattedMessage } from 'react-intl'; /* react-intl imports */

/**
 * Component for no result found page 
 */
export default class NotFound extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: this.props.match.params.keyword
        }
    }


    /**
     * Before a mounted component receives new props, reset some state.
     * Determine whether the 'match' is changed, then update states.
     * @param {Object} nextProps new props
     */
    componentWillReceiveProps(nextProps) {
        if(this.state.keyword !== nextProps.match.params.keyword){   // if url changes
            this.setState({
                keyword: nextProps.match.params.keyword
            })
        }
    }

    render() {
        return (
            <div className="notfound-page">
                <h1><i className="far fa-frown"></i></h1>
                <FormattedMessage id="notFoundMessage" tagName="h2" />
                <h3>{this.state.keyword}</h3>
                <FormattedMessage id="notFoundHint" tagName="h4" />
            </div>
        )
    }
}