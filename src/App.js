import React, { Component } from "react";
import Chart from "./components/Chart";
import Modal from "./components/Modal";
import SideBox from "./components/SideBox";
import LandscapeMessage from "./components/LandscapeMessage";
import chart from "./d3/chart";
import { debounce, checkLandscape } from "./helpers/helpers";
import { wait } from "./d3/config";
import chartData from "./data/2016_primary_json";
import { buildDataArray } from "./dataBuilder";
import "./styles/bubble_chart.css";

const initState = {
  activeDonationBtn: false,
  currentView: 0,
  modalShowing: false,
  animDelay: 0,
  landscape: true,
  chartLoaded: false,
  sideBoxShowing: false,
  fundsActive: false
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
    this.setState({ activeDonationBtn: !this.state.activeDonationBtn });
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
        activeDonationBtn: false,
        sideBoxShowing: true
      });
    }
    if (newView > 2) {
      window.scrollTo(0, 0);
    }

    if (newView !== 4 && newView < 6) {
      this.setState({ fundsActive: false });
    }
  };

  backHandler = () => {
    if (this.state.currentView < 3) return;
    this.setState({
      currentView: this.state.currentView - 1
    });
  };

  publicFundHandler = () => {
    this.setState({ fundsActive: true });
  };

  render() {
    const {
      currentView,
      landscape,
      modalShowing,
      sideBoxShowing,
      activeDonationBtn,
      fundsActive
    } = this.state;

    console.log("currentView: ", currentView);
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
          backHandler={this.backHandler}
          sideBoxShowing={sideBoxShowing}
          currentView={currentView}
          donationButtonHandler={this.donationButtonHandler}
          activeDonationBtn={activeDonationBtn}
          publicFundHandler={this.publicFundHandler}
          fundsActive={fundsActive}
        />
        {/* <button
          onClick={this.continueHandler}
          style={{ position: "absolute", right: 0, bottom: 0 }}
        >
          continue
        </button> */}
      </React.Fragment>
    );
  }
}

export default App;
