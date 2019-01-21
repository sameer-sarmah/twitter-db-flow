import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactHighcharts from "react-highcharts";
import "./analytics-panel.css";


export class BarChart extends Component {


  render() {
    const config = {
      chart: {
        type: "column",
        width: 300
      },
      title: {
        text: ""
      },
      xAxis: {
        categories: [],
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: ""
        }
      },
      credits: {
        enabled: false
       },
       "legend": {
        symbolRadius: 0,
        squareSymbol: true,
       },
      series: [],
      colors: ["#2373E4", "#FF800E"]
    };
    const series = this.props.series;
    config.series = series;
    config.title.text = this.props.title;
    config.yAxis.title.text = this.props.title;
    config.xAxis.categories= this.props.categories;
    return (
      <React.Fragment>
        <ReactHighcharts
          config={config}
        />
      </React.Fragment>
    );
  }
}
BarChart.propTypes = {
  title: PropTypes.string.isRequired,
  series: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
};
