import React, { Component } from "react";
import styled from "@emotion/styled";
import chart from "../d3/chart";

const ChartContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95vw;
  margin: 0 auto;
  height: 100vh;
  z-index: -1;
`;

export default class Chart extends Component {
  componentDidMount() {
    chart.init("#vis", this.props.chartData);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <ChartContainer id="vis" />;
  }
}
