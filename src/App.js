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

  navigationHandler = e => {
    const { currentView } = this.state;
    const direction = e.target.id;
    const newView = direction === "fwd" ? currentView + 1 : currentView - 1;
    this.setState({
      currentView: newView
    });

    if (newView === 2) {
      this.setState({
        animDelay: 0,
        modalShowing: false,
        donationsGrouped: true,
        sideBoxShowing: true
      });
    }
    if (newView === 3) {
      this.setState({ donationsGrouped: false });
    }
    if (newView > 2) {
      // window.scrollTo(0, 0);
    }

    if (newView !== 4 || newView !== 6) {
      this.setState({ fundsActive: false });
    }

    if (newView === 8) {
      this.setState({ modalShowing: true });
    }
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
      fundsActive
    } = this.state;
    return !landscape ? (
      <LandscapeMessage />
    ) : (
      <React.Fragment>
        <Chart chartData={chartData} currentView={currentView} />
        <Modal
          in={modalShowing}
          currentView={currentView}
          navigationHandler={this.navigationHandler}
        />
        <SideBox
          navigationHandler={this.navigationHandler}
          sideBoxShowing={sideBoxShowing}
          currentView={currentView}
          donationToggler={this.donationToggler}
          publicFundHandler={this.publicFundHandler}
          fundsActive={fundsActive}
        />
      </React.Fragment>
    );
  }
}

export default App;
