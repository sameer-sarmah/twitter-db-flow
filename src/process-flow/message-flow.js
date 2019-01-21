import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import  "./message-flow.css";
import { TweetsPanel } from "./messages/messages-panel";
import { AnalyticsPanel } from "./analytics/analytics-panel";
import { ProcessorCard } from "./processor-card";
import { ConnectorCard } from "./connector-card";
import MessagesIcon from "./../images/message.svg";
import DBIcon from "./../images/database.svg";
import FilterIcon from "./../images/filter.svg";
import PropTypes from "prop-types";

import { trafficData } from "./mocks/traffic";
import { tweets } from "./mocks/incoming-tweets";
import { processflow } from "./mocks/process-flow";


const Tabs = Object.freeze({
  TweetsPanel: Symbol("TweetsPanel"),
  AnalyticsPanel: Symbol("AnalyticsPanel")
});

const NodeToIconMap = Object.freeze({
  source: MessagesIcon,
  target: DBIcon,
  filter: FilterIcon
});

@inject("DataModel")
@observer
export class MessageFlowComponent extends Component {
  static propTypes = {
    DataModel: PropTypes.any.isRequired
  };

  constructor(props) {
    super(props);
    this.tweetsNavItem = React.createRef();
    this.analyticsNavItem = React.createRef();
    this.state = { currentTab: Tabs.TweetsPanel ,currentTabProps:{}};
  }

  componentDidMount() {
    this.props.DataModel.setMessages(tweets);
    this.props.DataModel.setTrafficData(trafficData);
    this.props.DataModel.setProcessflow(processflow);
  }


  onNavItemSelected(selectedItem, props) {
  const isEmpty=(obj)=> {
      for(var key in obj) {
          if(obj.hasOwnProperty(key))
              return false;
      }
      return true;
  };
    this.removedActiveLinkClass();
    if(!props){
      props={};
    }
    switch (selectedItem) {
      case "Tweets": {
        this.tweetsNavItem.current.classList.add("navActiveLink");
        if(props && !isEmpty(props)){
          this.props.DataModel.setSelectedNode(props.nodeName);
          this.props.DataModel.setSearchText("");
        }
        else{
          this.props.DataModel.setSelectedNode("All");
        }
        this.setState({ currentTab: Tabs.TweetsPanel, currentTabProps: props });
        break;
      }

      case "Analytics": {
        this.analyticsNavItem.current.classList.add("navActiveLink");
        this.setState({ currentTab: Tabs.AnalyticsPanel ,currentTabProps:props});
        break;
      }

      default:
        console.log("default");
        break;
    }
    
  }

  removedActiveLinkClass() {

    if (this.tweetsNavItem.current.classList.contains("navActiveLink")) {
      this.tweetsNavItem.current.classList.remove("navActiveLink");
    }

    if (this.analyticsNavItem.current.classList.contains("navActiveLink")) {
      this.analyticsNavItem.current.classList.remove("navActiveLink");
    }

  }

  getCurrentTabComponent() {

    if(this.state.currentTab === Tabs.TweetsPanel){
      return (<TweetsPanel {...this.state.currentTabProps}/>);
    }
    else if(this.state.currentTab === Tabs.AnalyticsPanel){
      return (<AnalyticsPanel {...this.state.currentTabProps} />);
    }
  }

  

  findIconForNode(node) {
    if (node.type === "source" || node.type === "target" || node.type === "filter") {
      return NodeToIconMap[node.type];
    } 
  }


  createProcessorGraph() {
    const processflow= this.props.DataModel.processflow;
    const trafficData=this.props.DataModel.trafficData;
    if(!!trafficData && !!processflow){
      const nodes = processflow.nodes;
      const edges = processflow.edges;
      const graph = [];
  
      const sourceNode = nodes.find(node => {
        return node.type === "source";
      });
      const targetNode = nodes.find(node => {
        return node.type === "target";
      });
  
      const buildGraph = (currentNode, graph) => {
        const currentEdge = edges.find(edge => {
          return edge.from === currentNode.name;
        });
        const currentNodeIcon = this.findIconForNode(currentNode);

        const inputMessageNumber = 2143;
  
        graph.push(
          <ProcessorCard key={currentNode.id}
            icon={currentNodeIcon}
            messageNumber={inputMessageNumber}
            onClick={() => {
              this.onNavItemSelected("Tweets", { nodeName: currentNode.name });
            }}
          />
        );
  
      if(currentEdge){
  
        graph.push(
          <ConnectorCard key={currentEdge.name}/>
        );
        const nextNode=nodes.find(node => {
          return node.name === currentEdge.to;
        });
        if(nextNode){
          buildGraph(nextNode,graph);
        }
      }
  
        
      };
  
      buildGraph(sourceNode,graph);
      return graph;
    }
    
  }

  render() {
    const currentTab = this.getCurrentTabComponent();
    const panel = (
      <div className="monitoring-ui">
        <div
          className="dataflow-monitoring-container"
          style={{ marginLeft: "20px" }}
        >
        <div className="graph-container">
        {this.createProcessorGraph()}
        </div>
          
        </div>

        <div className="content-container">
        <div className="navbarContainer">
          <ul className="navigationBar">
            <li
              onClick={() => {
                this.onNavItemSelected("Tweets");
              }}
            >
              <div className="navLink">Tweets</div>
              <div ref={this.tweetsNavItem} className="underline-decoration navActiveLink" />
            </li>
            <li
              onClick={() => {
                this.onNavItemSelected("Analytics");
              }}
            >
              <div className="navLink">Analytics</div>
              <div
                ref={this.analyticsNavItem}
                className="underline-decoration"
              />
            </li>
          </ul>
        </div>
        <div className="panel-container" ref={this.panelContainer}>{currentTab}</div>
        </div>
      </div>
    );
    return panel;
  }
}
