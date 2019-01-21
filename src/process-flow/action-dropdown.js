import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

export class ActionDropDown extends Component {
  constructor() {
    super();
    this.dropdown = React.createRef();
    this.actionSheet=React.createRef();
    this.state = {
      showMenu: false,
      placeAtBottom:true
    };
  }

  toggleDropDown() {
    const heightOfEachActionItem = 35;
    const numberOfActions = this.props.actions.length;
    const heightOfActionSheet = heightOfEachActionItem * numberOfActions;
    if (this.dropdown.current && this.dropdown.current.getBoundingClientRect()) {
        const top = this.dropdown.current.getBoundingClientRect().top;
        const docHeight = document.body.getBoundingClientRect().height;
        let placeAtBottom = true;
        if (docHeight < top + heightOfActionSheet + 10) {
            placeAtBottom = false;
        }
        this.setState({ showMenu: !this.state.showMenu, placeAtBottom: placeAtBottom});
    }

}

  render() {
    const showMenu=this.state.showMenu;
    const menuCssClasses=['action-items','flex-column-container'];
    if(showMenu){
      menuCssClasses.push('block-display');
      if(menuCssClasses.indexOf('none-display') > -1){
        const index=menuCssClasses.indexOf('none-display');
        menuCssClasses.splice(index,1);
      }
      if(this.state.placeAtBottom === false){
        menuCssClasses.push('bottom-40px');
      }
    }
    else{
      menuCssClasses.push('none-display');
      if(menuCssClasses.indexOf('block-display') > -1){
        const index=menuCssClasses.indexOf('block-display');
        menuCssClasses.splice(index,1);
      }
    }
    return (
      <div className="dropdown-action-menu" onClick={this.toggleDropDown.bind(this) } ref={this.dropdown}>
        <div className="action-button">
          <img className="button-icon" src="https://png.icons8.com/ios/50/000000/menu-2-filled.png" />
        </div>
        <div className={menuCssClasses.join(' ')}  ref={this.actionSheet}>
          <div className="action-item-container">
            {this.props.actions.map((action,index)=>{
              return (
                <div key={index}>
                  <img key={index} data-tip={action["name"]} className="block-display item-icon"
                    src={action.image} onClick={action.onClick}/>
                  <ReactTooltip place="right" type="light" effect="solid" getContent={(dataTip) => ` ${dataTip}`}/>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

ActionDropDown.propTypes = {
  actions: PropTypes.array.isRequired
};
