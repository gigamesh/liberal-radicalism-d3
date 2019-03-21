/*
 * Code adapted from:
 * http://vallandingham.me/gates_bubbles/
 *
 */
import { select } from "d3-selection";
import { scaleOrdinal, scaleSqrt } from "d3-scale";
import { createNodes, createPubFundNodes } from "./createNodes";
import {
  initSimulation,
  initTierSimulations,
  initCandidateSimulations
} from "./simulation";
import { maxAmount, donationColors, chartWidth, chartHeight } from "./config";
import render from "./render";

const chart = {
  init: function(domNode, rawData) {
    this.maxAmount = maxAmount(rawData);
    this.radiusScale = scaleSqrt()
      .domain([0, this.maxAmount])
      .range([0, chartHeight * 0.05]);

    this.fillColor = scaleOrdinal()
      .domain([
        "_500kCount",
        "_50kCount",
        "_5kCount",
        "_2kCount",
        "_1kCount",
        "_500Count",
        "_200Count",
        "_50Count"
      ])
      .range(donationColors);

    this.allForce = initSimulation();
    this.tierForce = initTierSimulations();
    this.candidateForce = initCandidateSimulations();

    this.svg = select(domNode)
      .append("svg")
      .attr("width", chartWidth)
      .attr("height", chartHeight);

    this.nodes = createNodes(rawData);
    this.pubFundNodes = createPubFundNodes();

    this.allBubblesGroup = this.svg.append("g");
    // .attr("transform", scaleMatrix(2));

    this.bubbles = null;
    this.pubFundsActive = false;
    this.donationsGrouped = true;
    this.candidatesShowing = false;
    this.currentView = -1;
  },
  render
};

export default chart;
