import React, { Component } from "react";
import { bubbleChart, setupButtons } from "./d3/bubbleChart";
import Chart from "./components/Chart";
import chart from "./d3/chart";
import styled from "@emotion/styled";
import chartData from "./data/2016_primary_json";
import { buildDataArray } from "./dataBuilder";
import "./styles/bubble_chart.css";
import DonationsButtons from "./components/DonationsButtons";

const Container = styled.div`
  width: ${({ width }) => width};
  max-width: var(--max-width);
  margin: auto;
`;

class App extends Component {
  state = {
    windowWidth: 0,
    windowHeight: 0,
    activeDonationBtn: "donation_all"
  };

  componentDidMount() {
    // storing window dimensions in state to trigger update

    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });

    // const dataAray = buildDataArray();
    // console.log(dataAray);
    // console.log(JSON.stringify(dataAray));
  }

  componentDidUpdate() {
    const { windowWidth, windowHeight } = this.state;

    const width = Math.min(windowWidth, 1600);
    const height = windowHeight > 375 ? windowHeight * 0.9 : windowHeight;
  }

  donationButtonHandler = e => {
    chart.toggleDisplay(e.target.id);
  };

  render() {
    const { windowWidth, windowHeight } = this.state;
    const headerHeight = windowHeight > 375 ? "4vh" : "6vh";
    const footerHeight = windowHeight > 375 ? "6vh" : "8vh";

    return (
      <React.Fragment>
        <Container width={windowWidth}>
          <h1 className="header-main">liberal radicalism</h1>

          <Chart chartData={chartData} />
        </Container>
        <DonationsButtons
          footerHeight={footerHeight}
          donationButtonHandler={this.donationButtonHandler}
        />
      </React.Fragment>
    );
  }
}

export default App;
