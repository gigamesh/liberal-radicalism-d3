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
  updateTotals,
  clearPubFunds,
  resetTotals
} from "./nodeHandlers";
import chart from "./chart";
import { addPubFundNodes } from "./createNodes";

function render({ currentView, donationsGrouped, animDelay }) {
  this.donationsGrouped = donationsGrouped;

  switch (currentView) {
    case 0:
      view0();
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
    case 5:
      view5();
      break;
    default:
  }
}

function view0() {
  chart.allForce.nodes(chart.nodes);
  groupAllBubbles(1, 0.4);
  initialRenderTransition();
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

  toggleCheck();

  updateAndMerge();
}

function view4() {
  toggleCheck();
  if (chart.pubFundsActive) return;

  //create public funding nodes
  addPubFundNodes();

  restartForces();

  updateTotals("normalMatchSum");

  updateAndMerge();
  chart.pubFundsActive = true;
}

function view5() {
  toggleCheck();
  if (!chart.pubFundsActive) return;

  resetTotals();

  //clear public fund nodes
  chart.nodes = chart.nodes.filter(node => {
    return node.text !== "Public Fund";
  });

  restartForces(chart.nodes);

  chart.bubbles
    .data(chart.nodes)
    .exit()
    .remove();

  chart.pubFundsActive = false;
}

function toggleCheck() {
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
}

function restartForces() {
  let reheatedNodes = chart.nodes;

  if (chart.donationsGrouped) {
    // restart force simulatoin for each group
    for (let key in chart.tierForce) {
      const nodeGroup = reheatedNodes.filter(node => {
        return key === node.tier;
      });

      chart.tierForce[key].velocityDecay(0.28);
      chart.tierForce[key].nodes(nodeGroup);
      chart.tierForce[key].alpha(1).restart();
    }
  } else {
    for (let name in chart.candidateForce) {
      const nodeGroup = reheatedNodes.filter(node => {
        return name === node.name;
      });

      chart.candidateForce[name].velocityDecay(0.28);
      chart.candidateForce[name].nodes(nodeGroup);
      chart.candidateForce[name].alpha(1).restart();
    }
  }
  chart.nodes = reheatedNodes;
}

export function updateAndMerge() {
  // console.log(chart.nodes.splice(chart.nodes.length - 10));
  const bubbles = chart.allBubblesGroup
    .selectAll("circle")
    .data(chart.nodes, function(d) {
      return d.id;
    });

  const bubblesE = bubbles
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

  chart.bubbles = bubbles.merge(bubblesE);
}

function initialRenderTransition() {
  const bubbles = chart.allBubblesGroup
    .selectAll("circle")
    .data(chart.nodes, function(d) {
      return d.id;
    });

  const bubblesE = bubbles
    .enter()
    .append("circle")
    .attr("r", 0)
    .attr("fill", d => d.color)
    .attr("stroke", function(d) {
      return rgb(d.color).darker([3]);
    })
    .attr("stroke-width", 0.25);

  chart.bubbles = bubbles.merge(bubblesE);

  chart.bubbles
    .transition()
    .duration(1200)
    .attr("r", function(d) {
      return d.radius;
    });
}

export default render;
