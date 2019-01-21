import PropTypes from 'prop-types';
import React from 'react';
import './processor-card.css';
import './connector-card.css';

export class ConnectorCard extends React.Component {


  render(){
    const throughputInMbps=this.props.throughputInMbps;
    const throughputInMsgCount=this.props.throughputInMsgCount;
    const latency = this.props.latency;
    const throughputDiv=(throughputInMbps && throughputInMsgCount) ?      
    <React.Fragment>
    <div className="text-grid-container">
    <div>Current</div>
    <div>{throughputInMbps} Mbps</div>
    <div>Throughput</div>
    <div>{throughputInMsgCount} Msg/s</div>
  </div>
  </React.Fragment> : <div className="text-grid-container"/>;

const latencyDiv=(latency) ? 
  <React.Fragment>
        <div className="text-grid-container">
          <div>Current</div>
          <div className="latency-grid-item">{latency} ms </div>
          <div>Latency</div>
        </div>
</React.Fragment> : <div className="text-grid-container"/>;
    return (
      <div className="icon-card-container" style={{borderWidth: "0px"}}>
      <div className="flex-col-card">
         {throughputDiv}
        <div className="arrow-container">
          <img src={require("./../images/arrow.svg")}/>
        </div>
        {latencyDiv}
      </div>
    </div>
      );
  }

}

ConnectorCard.propTypes = {
  throughputInMbps:PropTypes.string,
  throughputInMsgCount:PropTypes.number,
  latency:PropTypes.string
};
