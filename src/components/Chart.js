import React, { Component } from "react";
import styled from "@emotion/styled";
import chart from "../d3/chart";

const ChartContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  margin: 0 auto;
  height: 100vh;
  width: 100vw;
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
