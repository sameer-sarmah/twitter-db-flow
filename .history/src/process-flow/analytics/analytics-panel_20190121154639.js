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
    const trafficData = this.props.DataModel.trafficData;
    const categories = [];
    const title = "# of messages";
    const twitter = [];
    const db = [];
    trafficData.forEach(data => {
      if (data.name === "Twitter") {
        twitter.push(data.messages);
      } else if (data.name === "DB") {
        db.push(data.messages);
      }
      if (!categories.includes(data.month)) {
        categories.push(data.month);
      }
    });
    const series=[{name:"Twitter",data:twitter},{name:"DB",data:db}]
    return (
      <div className="performance-panel">
        <BarChart series={series} categories={categories} title={title} />
      </div>
    );
  }
}
