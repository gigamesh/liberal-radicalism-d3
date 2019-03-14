import { rgb } from "d3-color";
// import { selection, select as d3Select } from 'd3-selection';
import "d3-transition";
import {
  scaleString,
  candidates,
  screenWidth,
  screenHeight,
  chartWidth,
  chartHeight
} from "./config";
import { groupBubbles, toggleDonationGroups } from "./bubbleHandlers";
import chart from "./chart";

function render(currentView, activeDonationBtn) {
  // set dimensions of SVG based on current view
  if (currentView === 0) {
    this.width = screenWidth;
    this.height = screenHeight;
  } else {
    this.width = chartWidth;
    this.height = chartHeight;
  }

  this.chartContext.attr("width", this.width).attr("height", this.height);

  this.bubbles = this.allBubblesGroup
    .attr("transform", scaleString(2.2))
    .selectAll("circle")
    .data(this.nodes, function(d) {
      return d.id;
    });

  // Create new circle elements each with class `bubble`.
  // There will be one circle.bubble for each object in the nodes array.
  // Initially, their radius (r attribute) will be 0.
  // @v4 Selections are immutable, so lets capture the
  //  enter selection to apply our transtition to below.
  const bubblesE = this.bubbles
    .enter()
    .append("circle")
    .attr("r", 0)
    .attr("fill", function(d) {
      // console.log(d.radius, d.size);
      return chart.fillColor(+d.size);
    })
    .attr("stroke", function(d) {
      return rgb(chart.fillColor(+d.size)).darker([3]);
    })
    .attr("stroke-width", 0.5);

  // @v4 Merge the original empty selection and the enter selection
  this.bubbles = this.bubbles.merge(bubblesE);

  // Fancy transition to make bubbles appear, ending with the
  // correct radius
  this.bubbles
    .transition()
    .duration(1200)
    .attr("r", function(d) {
      return d.radius;
    });

  this.simulation.nodes(this.nodes);

  switch (currentView) {
    case 0:
      groupBubbles(1, 0.4);
      break;
    default:
      showCandidates();
      toggleDonationGroups(activeDonationBtn);
  }
}

function showCandidates() {
  // Add the candidate names
  const candidateTitleData = Object.keys(candidates);
  const candidateTitle = chart.chartContext
    .selectAll(".candidate")
    .data(candidateTitleData);

  candidateTitle
    .enter()
    .append("text")
    .attr("class", "candidate")
    .attr("x", function(d) {
      return candidates[d].x;
    })
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .text(function(d) {
      return d;
    });
}

export default render;
