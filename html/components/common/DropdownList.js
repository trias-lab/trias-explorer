import React from "react"
import $ from "jquery";
import PropTypes from 'prop-types';

/**
 * Custom drop-down list component.
 * 
 * ### Example:
 * 
 * ```jsx
 * <DropdownList
 *  listID="id"
 *  itemsToSelect={this.searchTypes}
 *  onSelect={(value) => this.selectItem(value)}
 *  itemDefault={this.searchTypes[1]} />
 * ```
 */
export default class DropdownList extends React.Component {
    static propTypes = {
        /** Id of the outer container */
        listID: PropTypes.string,
        /** Index of first row in current page.
         * 
         * (ex. [{name:'主机名',value:'clientname'},{name:'文件哈希',value:'filedata'},...]).
         * 
         * - The name shows in the drop-down list.
         * - The value will be passed when related option is selected.
         */
        itemsToSelect: PropTypes.object,
        /** Index of last row in current page. */
        onSelect: PropTypes.func,
        /** Total number of items. */
        itemDefault: PropTypes.object
    }
    
    constructor(props) {
        super(props);
        this.state={
            itemsToSelect:this.props.itemsToSelect,     // list containing options for this drop-down list. 
            activeItem:this.props.itemDefault || this.props.itemsToSelect[0],     // current option. The first item of itemsToSelect by default.
            showListBlock:false,    // whether to show options
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
                self.setState({ // collapse drop-down list
                    showListBlock:false
                })
            }            
        }); 
    }
    
    /**
     * Before a mounted component receives new props, reset some state.
     * @param {Object} nextProps new props
     */
    componentWillReceiveProps (nextProps) {
        var self = this
        // if the prop will change
        if(JSON.stringify(this.props.itemsToSelect) != JSON.stringify(nextProps.itemsToSelect) ){
            this.setState({
                itemsToSelect:nextProps.itemsToSelect,
                activeItem: nextProps.itemsToSelect[self.state.itemsToSelect.indexOf(self.state.activeItem)]
            }) 
        }
        if(JSON.stringify(this.props.itemDefault) != JSON.stringify(nextProps.itemDefault)){
            this.setState({
                activeItem: nextProps.itemDefault || nextProps.itemsToSelect[0] 
            })
            this.props.onSelect(nextProps.itemDefault.value)  // invoke the handler and pass the value 
        }               
    }

    /**
     * Collapse or expand the drop-down list
     */
    changeListState(){
        $('#' + this.props.listID + ' .item-selected').blur()
        $('#' + this.props.listID + ' .select-img i').toggleClass('fa-angle-down').toggleClass('fa-angle-up')
        this.setState({
            showListBlock:!this.state.showListBlock
        })
    }

    /**
     * handler for the change of selected item
     * @param {Object} item 
     */
    selectItem(item){
        this.setState({
            activeItem: item            
        })
        this.changeListState() // collapse the drop-down list
        this.props.onSelect(item.value)
    }

    render(){
        var self = this
        var listToShow = this.state.itemsToSelect && this.state.itemsToSelect.map(function(item,index){
            return (
                <li 
                key={'select-item-'+index}
                className={JSON.stringify(item)==JSON.stringify(self.state.activeItem)?'active':''}
                onClick={self.selectItem.bind(self,item)}
                >
                    <span>{item.name}</span>
                </li>
            )}
        );
        return (
        <div className="my-dropdown-list" id={this.props.listID}>
            <div>
                <div className="select-img" onClick={this.changeListState.bind(this)}><i className="fas fa-angle-down"></i></div>
                <input
                    className="item-selected" 
                    type="text" 
                    readOnly
                    value={this.state.activeItem && this.state.activeItem.name} 
                    onClick={this.changeListState.bind(this)}
                />
            </div>
            {/* Collapse or expand the drop-down list according to this.state.showListBlock; if there is no option, then always hide the option box. */}
            <div className={(this.state.showListBlock && listToShow.length>0)?"list-block":"hide list-block"}>
                <ul>
                    {listToShow}
                </ul>
            </div>
        </div>
        )
    }
}