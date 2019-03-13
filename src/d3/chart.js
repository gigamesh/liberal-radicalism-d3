/*
 * Code adapted from:
 * http://vallandingham.me/gates_bubbles/
 *
 */
import { select } from "d3-selection";
import { chartWidth, chartHeight } from "./config";
import createNodes from "./createNodes";
import { toggleDisplay } from "./bubbleHandlers";
import render from "./render";

const chart = {
  init: function(domNode, rawData) {
    this.domNode = domNode;
    this.nodes = createNodes(rawData);
    this.svg = select(this.domNode)
      .append("svg")
      .attr("width", chartWidth)
      .attr("height", chartHeight);
    this.allBubblesGroup = this.svg.append("g");
    this.bubbles = null;
    this.toggleDisplay = toggleDisplay;
    this.render();
  },
  render
};

export default chart;
