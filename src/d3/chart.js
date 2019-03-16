/*
 * Code adapted from:
 * http://vallandingham.me/gates_bubbles/
 *
 */
import { select } from "d3-selection";
import { scaleOrdinal } from "d3-scale";
import createNodes from "./createNodes";
import initSimulation, { initSimulations } from "./simulation";
import { maxAmount, donationColors } from "./config";
import render from "./render";

const chart = {
  init: function(domNode, rawData) {
    this.maxAmount = maxAmount(rawData);

    this.fillColor = scaleOrdinal()
      .domain([2700, 2000, 1000, 500, 200, 50])
      .range(donationColors.reverse());

    //working - DON'T REMOVE UNTIL NEW ONE IS WORKING!
    this.simulation = initSimulation();

    //new
    this.simulations = initSimulations();

    this.svg = select(domNode).append("svg");

    this.nodes = createNodes(rawData);

    this.allBubblesGroup = this.svg.append("g");
    // .attr("transform", scaleMatrix(2));

    this.bubbles = null;
  },
  render
};

export default chart;
