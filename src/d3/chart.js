/*
 * Code adapted from:
 * http://vallandingham.me/gates_bubbles/
 *
 */
import { select } from "d3-selection";
import { scaleOrdinal } from "d3-scale";
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

    this.fillColor = scaleOrdinal()
      .domain([2700, 2000, 1000, 500, 200, 50])
      .range(donationColors.reverse());

    this.allForce = initSimulation();
    this.tierForce = initTierSimulations();
    this.candidateForce = initCandidateSimulations();

    this.svg = select(domNode)
      .append("svg")
      .attr("width", chartWidth)
      .attr("height", chartHeight);

    this.nodes = createNodes(rawData);

    this.allBubblesGroup = this.svg.append("g");
    // .attr("transform", scaleMatrix(2));

    this.bubbles = null;
  },
  render
};

export default chart;
