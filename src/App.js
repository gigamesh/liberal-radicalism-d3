import React, { Component } from "react";
import { bubbleChart, setupButtons } from "./bubble_chart";
import file from "./data/gates_money.csv";
import { totals } from "./data/2016_primary_data";
import * as d3 from "d3";
import "./styles/App.css";
import "./styles/bubble_chart.css";

function numberWithCommas(x) {
  return x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class App extends Component {
  componentDidMount() {
    d3.csv(file)
      .then(data => {
        const mychart = bubbleChart(this.vis);
        mychart.chart("#vis", data);

        setupButtons(mychart);
      })
      .catch(console.log);

    // const dataAray = this.buildDataArray();
  }

  buildDataArray = () => {
    let count = 0;
    const dataArray = [];

    totals.forEach(candidate => {
      for (let prop in candidate) {
        if (
          /amount/i.test(prop) &&
          candidate[prop] &&
          !isNaN(candidate[prop])
        ) {
          let num = Math.round(candidate[prop] / 1000000);

          for (let i = 0; i < num; i++) {
            dataArray.push({
              id: count,
              name: candidate.name,
              tier: prop
            });
            count++;
          }
        }
      }
    });

    console.log(count);
    return dataArray;
  };

  render() {
    return (
      <div className="container">
        <h1 className="header-main">Liberal Radicalism</h1>
        <div id="toolbar">
          <a href="#" id="donation_all" className="button active">
            All Donations
          </a>
          <a href="#" id="donation_tiers" className="button">
            Donations By Tier
          </a>
        </div>
        <div id="vis" ref={el => (this.vis = el)} />
      </div>
    );
  }
}

export default App;
