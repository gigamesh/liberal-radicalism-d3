import { forceX, forceY } from "d3-force";
import simulation from "./simulation";
import chart from "./chart";
import {
  center,
  forceStrength,
  chartWidth,
  tierLevels,
  scaleString,
  candidates
} from "./config";

export function groupBubbles(alpha, decay) {
  hideTierLabels();

  simulation.velocityDecay(decay).force(
    "y",
    forceY()
      .strength(forceStrength)
      .y(center.y)
  );

  // @v4 We can reset the alpha value and restart the simulation
  simulation.alpha(alpha).restart();
}

export function splitBubbles() {
  showTierLabels();
  console.log("splitting");
  chart.allBubblesGroup
    .transition()
    .duration(200)
    .attr("transform", scaleString(1));

  simulation
    .velocityDecay(0.2)
    .force(
      "y",
      forceY()
        .strength(forceStrength)
        .y(d => {
          return tierLevels[d.tier].y;
        })
    )
    .force(
      "x",
      forceX()
        .strength(forceStrength)
        .x(d => {
          return candidates[d.name].x;
        })
    );

  // @v4 We can reset the alpha value and restart the simulation
  simulation.alpha(1).restart();
}

export function hideTierLabels() {
  chart.svg.selectAll(".tier-label").remove();
}

export function showTierLabels() {
  const tierLabels = Object.keys(tierLevels);
  const tierTitle = chart.svg.selectAll(".tier-label").data(tierLabels);
  const tierX = chartWidth * 0.15;

  tierTitle
    .enter()
    .append("text")
    .attr("class", "tier-label")
    .attr("y", key => tierLevels[key].y)
    .attr("x", tierX)
    .attr("text-anchor", "end")
    .text(d => tierLevels[d].text);
}

export function toggleDisplay(display) {
  if (display === "donation_tiers") {
    splitBubbles();
  } else {
    groupBubbles(1, 0.12);
  }
}
