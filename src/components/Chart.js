import React, { Component } from "react";
import chart from "../d3/chart";

export default class Chart extends Component {
  componentDidMount() {
    chart.init("#vis", this.props.chartData);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div id="vis" />;
  }
}
