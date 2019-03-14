import React, { Component } from "react";
import Chart from "./components/Chart";
import Modal from "./components/Modal";
import chart from "./d3/chart";
import chartData from "./data/2016_primary_json";
import { buildDataArray } from "./dataBuilder";
import "./styles/bubble_chart.css";
import Buttons from "./components/Buttons";

class App extends Component {
  state = {
    windowWidth: 0,
    windowHeight: 0,
    activeDonationBtn: "donation_all",
    currentView: 0,
    modalEnter: false
  };

  componentDidMount() {
    // storing window dimensions in state to trigger update

    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });

    setTimeout(() => {
      this.setState({ modalEnter: true });
    }, 1200);

    // const dataAray = buildDataArray();
    // console.log(dataAray);
    // console.log(JSON.stringify(dataAray));
  }

  componentDidUpdate() {
    const { currentView, activeDonationBtn } = this.state;

    chart.render(currentView, activeDonationBtn);
  }

  donationButtonHandler = e => {
    this.setState({ activeDonationBtn: e.target.id });
  };

  continueHandler = e => {
    console.log("continue clicked");
    this.setState({
      currentView: this.state.currentView + 1
    });
  };

  render() {
    const { windowHeight, currentView, modalEnter } = this.state;
    const footerHeight = windowHeight > 375 ? "6vh" : "8vh";
    console.log(modalEnter);
    return (
      <React.Fragment>
        <h1 className="header-main">liberal radicalism</h1>

        <Chart chartData={chartData} currentView={currentView} />

        <Buttons
          footerHeight={footerHeight}
          donationButtonHandler={this.donationButtonHandler}
          continueHandler={this.continueHandler}
          currentView={this.currentView}
        />
        <Modal
          in={modalEnter}
          currentView={currentView}
          continueHandler={this.continueHandler}
        />
      </React.Fragment>
    );
  }
}

export default App;
