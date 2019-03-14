/*
 * Code adapted from:
 * http://vallandingham.me/gates_bubbles/
 *
 */
import { select } from "d3-selection";
import { scaleOrdinal } from "d3-scale";
import createNodes from "./createNodes";
import initSimulation from "./simulation";
import { maxAmount, donationColors } from "./config";
import render from "./render";

const chart = {
  init: function(domNode, rawData) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.maxAmount = maxAmount(rawData);
    this.fillColor = scaleOrdinal()
      .domain([2700, 2000, 1000, 500, 200, 50])
      .range(donationColors);
    this.simulation = initSimulation();
    this.domNode = domNode;
    this.nodes = createNodes(rawData);
    this.chartContext = select(this.domNode);
    this.allBubblesGroup = this.chartContext.append("g");
    this.bubbles = null;

    console.log(this.maxAmount);
    this.render(0);
  },
  render
};

export default chart;
