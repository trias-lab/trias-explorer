import React from "react"
import $ from "jquery";
/**
 * Custom drop-down list component.
 * Usage:
 * <DropdownList
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
 * - itemsToSelect: a list containing options for this drop-down list. 
 *      (ex. [{name:'主机名',value:'clientname'},{name:'文件哈希',value:'filedata'},...])
 *      - ele: element shows in the drop-down list
 * 
 * - name
 */
export default class DropdownList extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            itemsToSelect:this.props.itemsToSelect,     // list containing options for this drop-down list. 
            name:this.props.name,
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
                $('#' + self.props.listID + ' .item-selected>a>i:last-child').toggleClass('fa-angle-down').toggleClass('fa-angle-up')
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
        if(this.props.itemsToSelect != nextProps.itemsToSelect){
            this.setState({
                itemsToSelect:nextProps.itemsToSelect,
                name: nextProps.name
            }) 
        }            
    }

    /**
     * Collapse or expand the drop-down list
     */
    changeListState(){
        $('#' + this.props.listID + ' .item-selected>a>i:last-child').toggleClass('fa-angle-down').toggleClass('fa-angle-up')
        this.setState({
            showListBlock:!this.state.showListBlock
        })
    }

    /**
     * handler for the change of selected item
     * @param {Object} item 
     */
    selectItem(item){
        this.changeListState() // collapse the drop-down list
    }

    render(){
        var self = this
        var listToShow = this.state.itemsToSelect && this.state.itemsToSelect.map(function(item,index){
            return (<li 
                key={'select-item-'+index}
                >
                    {item.ele}
                </li>)
            }
        );
        return (
        <div className="my-dropdown-list" id={this.props.listID}>
            <div className="item-selected">
                <a onClick={this.changeListState.bind(this)}>{this.state.name}<i className="fas fa-angle-down"></i></a>
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