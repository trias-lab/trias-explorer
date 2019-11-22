import React from "react"
import $ from "jquery";
/**
 * Custom toggle list component.
 * Usage:
 * <ToggleList
 * listID="langlist"
 * itemsToSelect={[{
      ele: <span onClick={()=>this.changeLanguage('zh')}>中文</span>
    }, {
        ele: <span  onClick={()=>this.changeLanguage('en')}>English</span>
    }]}
 * name={<i className="fas fa-globe-americas"></i>} />
 *
 * Attributes:
 * - listID: id of the outer container
 * - itemsToSelect: a list of elements( ele: element shows in the drop-down list )
 * - name: shows in the toggle button
 */
export default class ToggleList extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            showListBlock:false    // whether to show options
        }
    }

    /**
     * After the component is mounted.
     * - Set listener to the click event of the document.
     */
    componentDidMount() {
        var self = this
        // Collapse drop-down list when the mouse clicks elsewhere
        $(document).bind('click',function(e){
            if(self.state.showListBlock){ // if the drop-down list is expanded
                var event = e || window.event;  // browser compatibility
                var elem = event.target || event.srcElement;
                // traversing the parent elements
                while (elem) {
                    if (elem.id && elem.id==self.props.listID){  // determine if the outer container is clicked
                        return;
                    }
                    elem = elem.parentNode;
                }
                // if there is a angle icon in the toggle button, toggle it up
                if($('#' + self.props.listID + ' .item-selected>a').find('.fa-angle-down').length >0){
                    $('#' + self.props.listID + ' .item-selected>a i.fa-angle-down').toggleClass('fa-angle-down').toggleClass('fa-angle-up')
                }
                self.setState({ // collapse drop-down list
                    showListBlock:false
                })
            }
        });
    }

    /**
     * Collapse or expand the drop-down list
     */
    changeListState(){
        // if there is a angle icon in the toggle button, toggle it up or down
        if($('#' + this.props.listID + ' .item-selected>a').find('.fa-angle-down').length >0){
            $('#' + this.props.listID + ' .item-selected>a i.fa-angle-down').toggleClass('fa-angle-down').toggleClass('fa-angle-up')
        }else if($('#' + this.props.listID + ' .item-selected>a').find('.fa-angle-up').length >0){
            $('#' + this.props.listID + ' .item-selected>a i.fa-angle-up').toggleClass('fa-angle-up').toggleClass('fa-angle-down')
        }
        this.setState({
            showListBlock:!this.state.showListBlock
        })
    }

    render(){
        const itemsToSelect = this.props.itemsToSelect     // list containing options for this drop-down list.
        const name = this.props.name

        var listToShow =itemsToSelect && itemsToSelect.map(function(item,index){
            return (<li key={'select-item-'+index}>
                        {item.ele}
                    </li>)
            }
        );

        return (
            <div className={"my-dropdown-list toggle-list "+ (this.props.className|| '')} id={this.props.listID}>
                <div className="item-selected">
                    <a onClick={this.changeListState.bind(this)}>{name}</a>
                </div>
                {/* Collapse or expand the drop-down list according to this.state.showListBlock; if there is no option, then always hide the option box. */}
                <div className={(this.state.showListBlock && listToShow.length>0)?"list-block":"hide list-block"} onClick={()=>{this.changeListState()}}>
                    <ul>
                        {listToShow}
                    </ul>
                </div>
            </div>
        )
    }
}