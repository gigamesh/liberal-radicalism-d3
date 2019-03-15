import { rgb } from "d3-color";
// import { selection, select as d3Select } from 'd3-selection';
import "d3-transition";
import {
  candidates,
  screenWidth,
  screenHeight,
  chartWidth,
  chartHeight
} from "./config";
import { groupBubbles, toggleDonationGroups } from "./bubbleHandlers";
import chart from "./chart";

function render(currentView, activeDonationBtn, animDelay) {
  this.svg.attr("width", chartWidth).attr("height", chartHeight);

  this.bubbles = this.allBubblesGroup
    .selectAll("circle")
    .data(this.nodes, function(d) {
      return d.id;
    });

  const bubblesE = this.bubbles
    .enter()
    .append("circle")
    .attr("r", 0)
    .attr("fill", function(d) {
      return chart.fillColor(+d.size);
    })
    .attr("stroke", function(d) {
      return rgb(chart.fillColor(+d.size)).darker([3]);
    })
    .attr("stroke-width", 0.5);

  this.bubbles = this.bubbles.merge(bubblesE);

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
    case 1:
      this.svg.classed("downscale", true);
      // this.svg.style("transition", "transform 500ms ease-in-out");

      break;
    case 2:
      this.svg.classed("left-side", true);
      showCandidates();
      toggleDonationGroups(activeDonationBtn, animDelay);
      break;
    default:
  }
}

function showCandidates() {
  // Add the candidate names
  let names = Object.keys(candidates);

  const candidateTitle = chart.svg.selectAll(".candidate").data(names);

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
      if (screenWidth < 600) {
        return d.match(/[^ ]* (.*)/)[1];
      } else return d;
    });
}

export default render;
