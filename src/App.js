import React, { Component } from "react";
import { bubbleChart, setupButtons } from "./bubble_chart";
import styled from "@emotion/styled";
import primaryDATA from "./data/2016_primary_json";
import { buildDataArray } from "./dataBuilder";
import "./styles/bubble_chart.css";

const Container = styled.div`
  width: ${({ width }) => width};
  max-width: var(--max-width);
  margin: auto;
`;

const Toolbar = styled.div`
  height: ${({ height }) => height};
  display: flex;
  justify-content: center;
  align-items: flex-start;
  .header-main {
    align-self: center;
    color: #999;
    width: 100%;
    font-size: 28px;
    text-align: right;
    margin: 0 auto;
    padding: 0 0.5em;
    font-weight: 300;
    max-width: var(--max-width);
  }
  @media (max-width: 768px) {
    .header-main {
      font-size: 16px;
    }
  }
`;

class App extends Component {
  state = {
    windowWidth: 0,
    windowHeight: 0
  };

  componentDidMount() {
    this.setState({
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight
    });

    // const dataAray = buildDataArray();
    // console.log(dataAray);
    // console.log(JSON.stringify(dataAray));
  }

  componentDidUpdate() {
    const { windowWidth, windowHeight } = this.state;
    const width = Math.min(windowWidth, 1600);
    const height =
      windowHeight > 375 ? windowHeight * 0.9 : windowHeight * 0.86;
    const mychart = bubbleChart(width, height);
    mychart.chart("#vis", primaryDATA);
    setupButtons(mychart);
  }

  render() {
    const { windowWidth, windowHeight } = this.state;
    const headerHeight = windowHeight > 375 ? "4vh" : "6vh";
    const footerHeight = windowHeight > 375 ? "6vh" : "8vh";

    return (
      <Container width={windowWidth}>
        <Toolbar height={headerHeight}>
          <h1 className="header-main">Liberal Radicalism</h1>
        </Toolbar>
        <div id="vis" ref={this.vis} />
        <Toolbar id="toolbar" height={footerHeight}>
          <a href="#" id="donation_all" className="button active">
            All Donations
          </a>
          <a href="#" id="donation_tiers" className="button">
            Donations By Tier
          </a>
        </Toolbar>
      </Container>
    );
  }
}

export default App;
