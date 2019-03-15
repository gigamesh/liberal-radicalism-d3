import React, { Component } from "react";
import Chart from "./components/Chart";
import Modal from "./components/Modal";
import styled from "@emotion/styled";
import chart from "./d3/chart";
import { wait } from "./d3/config";
import chartData from "./data/2016_primary_json";
import { buildDataArray } from "./dataBuilder";
import "./styles/bubble_chart.css";
import Buttons from "./components/Buttons";

const MainTitle = styled.h1`
  position: absolute;
  top: 0;
  padding-left: 1rem;
  opacity: ${({ opacity }) => opacity};
  transition: 500ms ease-in-out;
`;

class App extends Component {
  state = {
    windowWidth: 0,
    windowHeight: 0,
    activeDonationBtn: "donation_all",
    currentView: 0,
    modalShowing: false,
    animDelay: 0
  };

  async componentDidMount() {
    // storing window dimensions in state to trigger update

    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });

    await wait(1200);

    this.setState({ modalShowing: true });

    // const dataAray = buildDataArray();
    // console.log(dataAray);
    // console.log(JSON.stringify(dataAray));
  }

  async componentDidUpdate() {
    const { currentView, activeDonationBtn, animDelay } = this.state;

    if (!animDelay) {
      chart.render(currentView, activeDonationBtn);
    } else {
      await wait(500);
      chart.render(currentView, activeDonationBtn);
    }
  }

  donationButtonHandler = e => {
    this.setState({ activeDonationBtn: e.target.id });
  };

  continueHandler = e => {
    const { currentView } = this.state;
    const newView = currentView + 1;
    this.setState({
      currentView: newView
    });

    if (newView === 2) {
      this.setState({
        animDelay: 1500,
        modalShowing: false,
        activeDonationBtn: "donation_tiers"
      });
    }
  };

  render() {
    const { windowHeight, currentView, modalShowing } = this.state;
    const footerHeight = windowHeight > 375 ? "6vh" : "8vh";
    console.log(currentView);
    return (
      <React.Fragment>
        {windowHeight > 375 && (
          <MainTitle className="header-main" opacity={currentView < 2 ? 0 : 1}>
            liberal radicalism
          </MainTitle>
        )}

        <Chart chartData={chartData} currentView={currentView} />

        <Buttons
          footerHeight={footerHeight}
          donationButtonHandler={this.donationButtonHandler}
          continueHandler={this.continueHandler}
          currentView={currentView}
        />
        <Modal
          in={modalShowing}
          currentView={currentView}
          continueHandler={this.continueHandler}
        />
        <button
          onClick={this.continueHandler}
          style={{ position: "absolute", left: 0, bottom: 0 }}
        >
          continue
        </button>
      </React.Fragment>
    );
  }
}

export default App;
