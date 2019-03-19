import { rgb } from "d3-color";
import "d3-transition";
import { chartWidth, xScale, legendWidth } from "./config";
import {
  groupAllBubbles,
  showCandidates,
  splitByCandidate,
  splitByDonation,
  showTotals,
  moveTitlesAndTotals,
  stopSplitByCandidate,
  stopSplitByDonation,
  updateTotals
} from "./nodeHandlers";
import chart from "./chart";
import { createPubFundNodes } from "./createNodes";

function render({ currentView, donationsGrouped, animDelay }) {
  this.donationsGrouped = donationsGrouped;

  switch (currentView) {
    case 0:
      view0();
      initialRenderTransition();
      return;
    case 1:
      view1();
      break;
    case 2:
      view2();
      break;
    case 3:
      view3();
      break;
    case 4:
      view4();
      break;
    default:
  }
}

function view0() {
  chart.allForce.nodes(chart.nodes.sortedArray());
  groupAllBubbles(1, 0.4);
}

function view1() {}

function view2() {
  const { svg, candidateForce, nodes } = chart;

  svg.classed("downscale", true);
  svg.classed("left-side", true);

  xScale.padding(0.4).range([0, chartWidth]);

  showCandidates();

  splitByCandidate();
  showTotals("donationSum");
}

function view3() {
  stopSplitByCandidate();

  xScale.range([legendWidth * 1.5, chartWidth]);

  if (chart.donationsGrouped) {
    stopSplitByDonation();
    splitByCandidate(undefined, 0.23, 0.1);
    chart.donationsGrouped = false;
  } else {
    stopSplitByCandidate();
    splitByDonation();
    moveTitlesAndTotals();
    chart.donationsGrouped = true;
  }

  updateAndMerge();
}

function view4() {
  if (chart.donationsGrouped) {
    stopSplitByDonation();
    splitByCandidate(undefined, 0.23, 0.1);
    chart.donationsGrouped = false;
  } else {
    stopSplitByCandidate();
    splitByDonation();
    moveTitlesAndTotals();
    chart.donationsGrouped = true;
  }

  if (chart.pubFundsActive) return;

  //create public funding nodes
  const pubFundNodes = createPubFundNodes();

  //add them to existing nodes
  const allNodes = chart.nodes.sortedArray(pubFundNodes);

  if (chart.donationsGrouped) {
    // restart force simulatoin for each group
    for (let key in chart.tierForce) {
      const nodeGroup = allNodes.filter(node => {
        return key === node.tier;
      });

      chart.tierForce[key].velocityDecay(0.28);
      chart.tierForce[key].nodes(nodeGroup);
      chart.tierForce[key].alpha(1).restart();
    }
  } else {
    for (let name in chart.candidateForce) {
      const nodeGroup = allNodes.filter(node => {
        return name === node.name;
      });

      chart.candidateForce[name].velocityDecay(0.28);
      chart.candidateForce[name].nodes(nodeGroup);
      chart.candidateForce[name].alpha(1).restart();
    }
  }

  updateTotals("normalMatchSum");

  if (!chart.pubFundsActive) {
    updateAndMerge();
  }

  chart.pubFundsActive = true;
}

export function updateAndMerge() {
  chart.bubbles = chart.allBubblesGroup
    .selectAll("circle")
    .data(chart.nodes.sortedArray(), function(d) {
      return d.id;
    });
  // console.log("updateAndMerge...nodes: ", chart.nodes.sortedArray());

  const bubblesE = chart.bubbles
    .enter()
    .append("circle")
    .attr("r", function(d) {
      return d.radius;
    })
    .attr("fill", d => d.color)
    .attr("stroke", function(d) {
      return rgb(d.color).darker([3]);
    })
    .attr("stroke-width", 0.25);

  chart.bubbles = chart.bubbles.merge(bubblesE);
}

function initialRenderTransition() {
  chart.bubbles = chart.allBubblesGroup
    .selectAll("circle")
    .data(chart.nodes.sortedArray(), function(d) {
      return d.id;
    });

  const bubblesE = chart.bubbles
    .enter()
    .append("circle")
    .attr("r", 0)
    .attr("fill", d => d.color)
    .attr("stroke", function(d) {
      return rgb(d.color).darker([3]);
    })
    .attr("stroke-width", 0.25);

  chart.bubbles = chart.bubbles.merge(bubblesE);

  chart.bubbles
    .transition()
    .duration(1200)
    .attr("r", function(d) {
      return d.radius;
    });
}

export default render;
