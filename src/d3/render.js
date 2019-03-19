import { rgb } from "d3-color";
import { forceManyBody } from "d3-force";
import "d3-transition";
import {
  screenWidth,
  screenHeight,
  chartWidth,
  chartHeight,
  xScale,
  legendWidth,
  getCharge,
  forceStrength
} from "./config";
import {
  groupAllBubbles,
  showCandidates,
  splitByCandidate,
  splitByDonation,
  showTotals,
  moveTitlesAndTotals,
  stopSplitByCandidate
} from "./nodeHandlers";
import chart from "./chart";
import { createPubFundNodes } from "./createNodes";

function render({ currentView, activeDonationBtn, animDelay }) {
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
    case 4:
      view4();
    default:
  }

  updateAndMerge();
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

  for (let key in candidateForce) {
    const nodeGroup = nodes.sortedArray().filter(node => {
      return key === node.name;
    });
    candidateForce[key].nodes(nodeGroup);
  }

  splitByCandidate();
  showTotals("donationSum");
}

function view3() {
  const { tierForce, nodes } = chart;
  stopSplitByCandidate();

  for (let key in tierForce) {
    const nodeGroup = nodes.sortedArray().filter(node => {
      return key === node.tier;
    });
    tierForce[key].nodes(nodeGroup);
  }
  xScale.range([legendWidth * 1.5, chartWidth]);
  splitByDonation();
  moveTitlesAndTotals();
}

function view4() {
  //create public funding nodes
  const pubFundNodes = createPubFundNodes();

  //add them to existing nodes
  const allNodes = chart.nodes.sortedArray(pubFundNodes);
  // console.log(allNodes);

  // restart force simulatoin for each group
  for (let key in chart.tierForce) {
    const nodeGroup = allNodes.filter(node => {
      return key === node.tier;
    });

    chart.tierForce[key].velocityDecay(0.28);
    chart.tierForce[key].nodes(nodeGroup);
    chart.tierForce[key].alpha(1).restart();
  }
}

export function updateAndMerge() {
  chart.bubbles = chart.allBubblesGroup
    .selectAll("circle")
    .data(chart.nodes.sortedArray(), function(d) {
      return d.id;
    });

  console.log(chart.nodes.sortedArray());
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
