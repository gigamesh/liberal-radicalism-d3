import React, { Component } from "react";
import Chart from "./components/Chart";
import Modal from "./components/Modal";
import SideBox from "./components/SideBox";
import LandscapeMessage from "./components/LandscapeMessage";
import styled from "@emotion/styled";
import chart from "./d3/chart";
import { debounce, checkLandscape } from "./helpers/helpers";
import { wait } from "./d3/config";
import chartData from "./data/2016_primary_json";
import { buildDataArray } from "./dataBuilder";
import "./styles/bubble_chart.css";
import Buttons from "./components/Buttons";

const initState = {
  activeDonationBtn: "donation_all",
  currentView: 0,
  modalShowing: false,
  animDelay: 0,
  landscape: true,
  chartLoaded: false,
  sideBoxShowing: false
};

class App extends Component {
  state = { ...initState };

  async componentDidMount() {
    this.checkOrientation();

    window.addEventListener("resize", debounce(this.checkOrientation, 100));

    await wait(1200);

    this.setState({ modalShowing: true });

    // const dataArray = buildDataArray();
    // console.log(dataArray);
    // console.log(JSON.stringify(dataArray));
  }

  checkOrientation = () => {
    const landscape = checkLandscape();

    this.setState({ landscape });
  };

  async componentDidUpdate(prevProps, prevState) {
    const { currentView, activeDonationBtn, animDelay, landscape } = this.state;

    if (!landscape) return;
    if (landscape && !prevState.landscape) {
      window.location.reload();
    }

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
        activeDonationBtn: "donation_tiers",
        sideBoxShowing: true
      });
    }
    if (newView > 2) {
      window.scrollTo(0, 0);
    }
  };

  render() {
    const { currentView, landscape, modalShowing, sideBoxShowing } = this.state;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    // console.log(
    //   "windowWidth: ",
    //   windowWidth,
    //   "currentView: ",
    //   currentView,
    //   "modalShowing: ",
    //   modalShowing
    // );
    return !landscape ? (
      <LandscapeMessage />
    ) : (
      <React.Fragment>
        <Chart chartData={chartData} currentView={currentView} />
        <Modal
          in={modalShowing}
          currentView={currentView}
          continueHandler={this.continueHandler}
        />
        <SideBox
          continueHandler={this.continueHandler}
          sideBoxShowing={sideBoxShowing}
          currentView={currentView}
          donationButtonHandler={this.donationButtonHandler}
        />
        <button
          onClick={this.continueHandler}
          style={{ position: "absolute", right: 0, bottom: 0 }}
        >
          continue
        </button>
      </React.Fragment>
    );
  }
}

export default App;
