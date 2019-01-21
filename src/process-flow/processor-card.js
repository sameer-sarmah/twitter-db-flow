import PropTypes from 'prop-types';
import React from 'react';
import './processor-card.css';


export class ProcessorCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isActive: false};
  }

  onMouseEnter(){
    this.setState({ isActive: true });
  }

  onMouseExit(){
    this.setState({ isActive: false });
  }

  render(){
    const icon=this.props.icon;
    const messageNumber=this.props.messageNumber;
    const tileCssClasses=['icon-card-container'];
    const isActive=this.state.isActive;
    if(isActive){
      tileCssClasses.push('icon-card-tile-active');
    }
    return (
      <div  className={tileCssClasses.join(' ')} onMouseEnter={this.onMouseEnter.bind(this)}
      onMouseLeave={this.onMouseExit.bind(this)}  onClick={this.props.onClick}>
      <div className="flex-col-card">
        <div className="content-block">  
          <img  src={icon} style={{height: "65%"}}/>
        </div>
        <div className="content-block">
          <div className="number-block">{messageNumber}</div>
          <div className="message-block">Messages</div>
        </div>
      </div>
      {}
    </div>
      );
  }

}

ProcessorCard.propTypes = {
  icon: PropTypes.string.isRequired,
  messageNumber:PropTypes.number.isRequired,
  onClick:PropTypes.func
};
