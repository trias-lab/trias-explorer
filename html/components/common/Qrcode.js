import React from "react";
import PropTypes from 'prop-types';

/**
 * Common Qrcode Component.
 *
 * ### Example:
 * 
 * ```js
 * <Qrcode id={index} text={i.input} size="70" />
 * ```
 *
 */
export default class Qrcode extends React.Component {
    static propTypes = {
        /** Id of the div element inside QrCode component */
        id: PropTypes.string,
        /** Text to convert */
        text: PropTypes.string,
        /** Size of qrcode image generated ( size x size ) */
        size : PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text,
            width : this.props.size,
            height : this.props.size,
        }
    }

    /**
     * Before a mounted component receives new props, reset some state.
     * Determine whether the 'text' prop  is changed, then update the qrcode based on the current address.
     * @param {Object} nextProps new props
     */
    componentWillReceiveProps(nextProps) {
        if(JSON.stringify(nextProps.text) != JSON.stringify(this.props.text)){   // if url changes
            this.setState({
                text: this.props.text,
                width : this.props.size,
                height : this.props.size,
            })
        }
    }

    componentDidMount(){
        var key = document.getElementById("qrcode"+this.props.id)
        new QRCode(key, {
            text: this.state.text,
            width : this.state.size,
            height : this.state.size,
            useSVG: true
        });

    }

    render(){
        return (
            <div className="qrcode-container">
                <div id={"qrcode"+ this.props.id} className="qr">
                </div>
            </div>
        )
    }
}
