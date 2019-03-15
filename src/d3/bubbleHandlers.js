import { forceX, forceY } from "d3-force";
import chart from "./chart";
import {
  forceStrength,
  tierLevels,
  scaleMatrix,
  candidates,
  chartHeight,
  tierColumnWidth,
  wait
} from "./config";

export function groupBubbles(alpha, decay) {
  const centerY = chartHeight / 2;

  hideTierLabels();

  chart.simulation.velocityDecay(decay).force(
    "y",
    forceY()
      .strength(forceStrength)
      .y(centerY)
  );

  // @v4 We can reset the alpha value and restart the simulation
  chart.simulation.alpha(alpha).restart();
}

export async function splitBubbles(delay = 0) {
  await wait(delay);
  console.log("after waiting");
  showTierLabels();
  chart.allBubblesGroup
    .transition()
    .duration(200)
    .attr("transform", scaleMatrix(1));

  chart.simulation
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
  chart.simulation.alpha(1).restart();
}

export function hideTierLabels() {
  chart.svg.selectAll(".tier-label").remove();
}

export function showTierLabels() {
  let tierLabels = Object.keys(tierLevels);

  const tierTitle = chart.svg.selectAll(".tier-label").data(tierLabels);

  tierTitle
    .enter()
    .append("text")
    .attr("class", "tier-label")
    .attr("y", key => tierLevels[key].y)
    .attr("x", tierColumnWidth)
    .attr("text-anchor", "end")
    .text(d => tierLevels[d].text);
}

export function toggleDonationGroups(activeDonationBtn, delay) {
  if (activeDonationBtn === "donation_tiers") {
    splitBubbles(delay);
  } else {
    groupBubbles(1, 0.12);
  }
}
