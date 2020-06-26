import { rgb } from "d3-color";
import "d3-transition";
import {
  chartWidth,
  xScale,
  legendWidth,
  wait,
  bigGroupScaleFactor,
} from "./config";
import {
  groupAllBubbles,
  showCandidates,
  splitByCandidate,
  splitByDonation,
  showTotals,
  moveCandidatesAndTotals,
  stopSplitByCandidate,
  stopSplitByDonation,
  updateTotals,
  hideTierLabels,
  resetTotals,
  showTierLabels,
  initTierLabels,
} from "./nodeHandlers";
import chart from "./chart";
import { createPubFundNodes } from "./createNodes";

function render({ currentView, donationsGrouped }) {
  // if view hasn't changed, we just need to toggle the donations
  if (this.currentView === currentView) {
    groupNodes(donationsGrouped);
    return;
  }

  switch (currentView) {
    case 0:
      view0();
      return;
    case 2:
      view2(currentView > this.currentView);
      break;
    case 3:
      view3(donationsGrouped);
      break;
    case 4:
      view4();
      break;
    case 5:
      view5();
      break;
    case 6:
      view6();
      break;
    default:
  }

  // remember which view was just executed
  this.currentView = currentView;
}

async function view0() {
  chart.allForce.nodes(chart.nodes);
  groupAllBubbles(1, 0.4);
  initialRenderTransition();
}

async function view2(forward) {
  const { svg } = chart;
  stopForces();
  hideTierLabels();

  xScale.padding(0.4).range([0, chartWidth]);

  updateAndMerge();
  splitByCandidate();

  svg.classed("downscale", true);
  svg.classed("left-side", true);

  if (forward) {
    await wait(1500);
  }
  if (!chart.candidatesShowing) {
    showCandidates();
  } else {
    moveCandidatesAndTotals(300);
  }
  showTotals("donationSum");
  initTierLabels();
}

function view3(donationsGrouped) {
  if (chart.pubFundsActive) {
    resetToPreMatch();
  }

  stopForces();

  xScale.range([legendWidth * 1.5, chartWidth]);
  moveCandidatesAndTotals(600);
  showTierLabels();

  if (!donationsGrouped) {
    splitByDonation();
    chart.donationsGrouped = false;
  }
}

async function view4() {
  if (chart.pubFundsActive) return;
  stopForces();

  updateTotals("normalMatchSum");

  chart.nodes.push(...chart.pubFundNodes);
  restartForces();
  updateAndMerge();

  chart.pubFundsActive = true;
}

function view5() {
  if (!chart.pubFundsActive) return;

  resetToPreMatch();
}

async function view6() {
  if (chart.pubFundsActive) return;

  //create public funding nodes
  chart.nodes.push(...createPubFundNodes("lr"));

  updateTotals("lrMatchSum");

  stopForces();
  updateAndMerge();
  restartForces();
  chart.pubFundsActive = true;
}

function groupNodes(donationsGrouped) {
  if (donationsGrouped) {
    stopSplitByDonation();

    xScale.padding(0.4).range([0, chartWidth]);
    splitByCandidate(undefined, 0.23, 0.1);
    moveCandidatesAndTotals(300);
    hideTierLabels(300);
  } else {
    stopSplitByCandidate();

    xScale.range([legendWidth * 1.5, chartWidth]);
    splitByDonation();
    moveCandidatesAndTotals(700);
    showTierLabels(700);
  }
  chart.donationsGrouped = donationsGrouped;
}

function stopForces() {
  chart.allForce.stop();
  stopSplitByDonation();
  stopSplitByCandidate();
}

function restartForces() {
  let reheatedNodes = chart.nodes;

  if (!chart.donationsGrouped) {
    // restart force simulatoin for each group
    for (let key in chart.tierForce) {
      const nodeGroup = reheatedNodes.filter((node) => {
        return key === node.tier;
      });

      chart.tierForce[key].velocityDecay(0.28);
      chart.tierForce[key].nodes(nodeGroup);
      chart.tierForce[key].alpha(1).restart();
    }
  } else {
    for (let name in chart.candidateForce) {
      const nodeGroup = reheatedNodes.filter((node) => {
        return name === node.name;
      });

      chart.candidateForce[name].velocityDecay(0.28);
      chart.candidateForce[name].nodes(nodeGroup);
      chart.candidateForce[name].alpha(1).restart();
    }
  }

  chart.nodes = reheatedNodes;
}

function resetToPreMatch() {
  resetTotals();

  //clear public fund nodes
  chart.nodes = chart.nodes.filter((node) => {
    return node.text !== "Public Fund";
  });

  restartForces(chart.nodes);

  chart.bubbles.data(chart.nodes).exit().remove();

  chart.pubFundsActive = false;
}

export function updateAndMerge() {
  const bubbles = chart.allBubblesGroup
    .selectAll("circle")
    .data(chart.nodes, function (d) {
      return d.id;
    })
    .attr("r", (d) => d.radius);

  const bubblesE = bubbles
    .enter()
    .append("circle")
    .attr("r", (d) => d.radius)
    .attr("fill", (d) => d.color)
    .attr("stroke", function (d) {
      return rgb(d.color).darker([3]);
    })
    .attr("stroke-width", 0.25);

  chart.bubbles = bubbles.merge(bubblesE);
}

function initialRenderTransition() {
  const bubbles = chart.allBubblesGroup
    .selectAll("circle")
    .data(chart.nodes, function (d) {
      return d.id;
    });

  const bubblesE = bubbles
    .enter()
    .append("circle")
    .attr("r", 0)
    .attr("fill", (d) => d.color)
    .attr("stroke", function (d) {
      return rgb(d.color).darker([3]);
    })
    .attr("stroke-width", 0.25);

  chart.bubbles = bubbles.merge(bubblesE);

  chart.bubbles
    .transition()
    .duration(1200)
    .attr("r", function (d) {
      return d.radius;
    });
}

export default render;
