import { rgb } from "d3-color";
// import { selection, select as d3Select } from 'd3-selection';
import "d3-transition";
import {
  screenWidth,
  screenHeight,
  chartWidth,
  chartHeight,
  xScale,
  legendWidth
} from "./config";
import {
  groupAllBubbles,
  showCandidates,
  splitByCandidate,
  splitByDonation,
  moveCandidateTitles,
  stopSplitByCandidate
} from "./bubbleHandlers";
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

  // views triggered by switch statement at the bottom
  const view0 = () => {
    this.allForce.nodes(this.nodes);
    groupAllBubbles(1, 0.4);
  };
  const view1 = () => {};
  const view2 = () => {
    this.svg.classed("downscale", true);
    this.svg.classed("left-side", true);
    showCandidates();

    for (let key in this.candidateForce) {
      const nodeGroup = this.nodes.filter(node => {
        return key === node.name;
      });
      this.candidateForce[key].nodes(nodeGroup);
    }

    splitByCandidate();
  };

  const view3 = () => {
    stopSplitByCandidate();

    for (let key in this.tierForce) {
      const nodeGroup = this.nodes.filter(node => {
        return key === node.tier;
      });
      this.tierForce[key].nodes(nodeGroup);
    }
    xScale.range([legendWidth * 1.5, chartWidth]);
    splitByDonation();
    moveCandidateTitles();
  };

  switch (currentView) {
    case 0:
      view0();
      break;
    case 1:
      view1();
      break;
    case 2:
      view2();
      break;
    case 3:
      view3();
      break;
    default:
  }
}

export default render;
