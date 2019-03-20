import React, { Component } from "react";
import Chart from "./components/Chart";
import Modal from "./components/Modal";
import SideBox from "./components/SideBox";
import LandscapeMessage from "./components/LandscapeMessage";
import chart from "./d3/chart";
import { debounce, checkLandscape } from "./helpers/helpers";
import { wait } from "./d3/config";
import chartData from "./data/fakePrimaryJSON";
// import { buildDataArray } from "./dataBuilder";
import "./styles/bubble_chart.css";

const initState = {
  donationsGrouped: true,
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
    // console.log(JSON.stringify(dataArray));
  }

  checkOrientation = () => {
    const landscape = checkLandscape();

    this.setState({ landscape });
  };

  async componentDidUpdate(prevProps, prevState) {
    const {
      currentView,
      donationsGrouped,
      animDelay,
      landscape,
      fundsActive
    } = this.state;
    if (!landscape) return;
    if (landscape && !prevState.landscape) {
      window.location.reload();
    }
    const config = { currentView, donationsGrouped, fundsActive };
    if (!animDelay) {
      chart.render(config);
    } else {
      await wait(animDelay);
      chart.render(config);
    }
  }

  donationToggler = e => {
    this.setState({ donationsGrouped: !this.state.donationsGrouped });
  };

  continueHandler = e => {
    const { currentView } = this.state;
    const newView = currentView + 1;
    this.setState({
      currentView: newView
    });

    if (newView === 2) {
      this.setState({
        animDelay: 0,
        modalShowing: false,
        donationsGrouped: false,
        sideBoxShowing: true
      });
    }
    if (newView > 2) {
      window.scrollTo(0, 0);
    }

    if (newView === 5) {
      this.setState({ fundsActive: false });
    }

    if (newView === 7) {
      this.setState({ modalShowing: true, fundsActive: false });
    }
  };

  backHandler = () => {
    if (this.state.currentView < 3) return;
    this.setState({
      currentView: this.state.currentView - 1
    });
  };

  publicFundHandler = () => {
    this.setState({
      fundsActive: true,
      currentView: this.state.currentView + 1
    });
  };

  render() {
    const {
      currentView,
      landscape,
      modalShowing,
      sideBoxShowing,
      donationsGrouped,
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
          donationToggler={this.donationToggler}
          donationsGrouped={donationsGrouped}
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
