import React, { Component } from "react";
import "./analytics-panel.css";
import { BarChart } from "./bar-chart";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";




@inject("DataModel")
@observer
export class AnalyticsPanel extends Component {
  static propTypes = {
    DataModel: PropTypes.any.isRequired
  };



  render() {
    const trafficData=this.props.DataModel.trafficData;
    const series=[];
    const categories=[];
    const title="# of messages"
    trafficData.forEach(data => {
      series.push(data.messages);
      categories.push(data.month);
    });
    return (
      <div className="performance-panel">
        <BarChart
          series={series}
          categories={categories}
          title={title}
        />
      </div>
    );
  }
}
