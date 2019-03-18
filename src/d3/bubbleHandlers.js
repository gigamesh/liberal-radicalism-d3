import { forceX, forceY } from "d3-force";
import chart from "./chart";
import { select } from "d3-selection";
import {
  forceStrength,
  tierLevels,
  candidates,
  xScale,
  chartHeight,
  legendWidth,
  wait,
  chartWidth
} from "./config";

export function groupAllBubbles(alpha, decay) {
  const { allForce } = chart;
  const centerY = chartHeight / 2;
  console.log("group called");

  hideTierLabels();

  // for (let key in tierForce) {
  //   tierForce[key].velocityDecay(decay).force(
  //     "y",
  //     forceY()
  //       .strength(forceStrength)
  //       .y(centerY)
  //   );
  //   tierForce[key].alpha(alpha).restart();
  // }

  allForce.velocityDecay(decay).force(
    "y",
    forceY()
      .strength(forceStrength)
      .y(centerY)
  );

  allForce.alpha(alpha).restart();
}

export async function splitByDonation() {
  const { tierForce } = chart;

  for (let key in tierForce) {
    tierForce[key]
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
            return xScale(d.name);
          })
      );

    tierForce[key].alpha(1).restart();

    showTierLabels();
    showTotals();
  }
}

export function splitByCandidate() {
  const { candidateForce } = chart;

  for (let key in candidateForce) {
    candidateForce[key]
      .velocityDecay(0.25)
      .force(
        "x",
        forceX()
          .strength(forceStrength)
          .x(d => {
            return xScale(d.name);
          })
      )
      .force(
        "y",
        forceY()
          .strength(forceStrength)
          .y(chartHeight * 0.5)
      );
    candidateForce[key].alpha(1).restart();
  }
}

export function stopSplitByCandidate() {
  const { candidateForce } = chart;
  for (let key in candidateForce) {
    candidateForce[key].stop();
  }
}

function showTotals() {
  const totalText = chart.svg
    .selectAll(".money-totals")
    .data(Object.keys(candidates));

  totalText
    .enter()
    .append("text")
    .attr("class", "money-totals")
    .attr("y", tierLevels.Totals.y)
    .attr("x", name => xScale(name))
    .attr("text-anchor", "middle")
    .text(name => {
      return `$${candidates[name].donationSum.toLocaleString()}`;
    });
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
    .attr("x", legendWidth)
    .attr("text-anchor", "end")
    .text(d => tierLevels[d].text)
    .each(function(d) {
      if (d === "Amounts") {
        select(this)
          .style("text-decoration", "underline")
          .style("font-weight", "bold");
      }
      if (d === "Totals") {
        select(this).style("font-weight", "bold");
      }
    });
}

export function moveCandidateTitles() {
  let names = Object.keys(candidates);
  const candidateTitles = chart.svg.selectAll(".candidate").data(names);

  candidateTitles
    .transition()
    .duration(700)
    .attr("x", function(d) {
      return xScale(d);
    });
}

export function showCandidates() {
  let names = Object.keys(candidates);
  const candidateTitles = chart.svg.selectAll(".candidate").data(names);

  candidateTitles
    .enter()
    .append("text")
    .attr("class", "candidate")
    .attr("x", function(d) {
      return xScale(d);
    })
    .attr("y", chartHeight * 0.04)
    .attr("text-anchor", "middle")
    .text(function(d) {
      return d;
    });
}

export function toggleDonationGroups(activeDonationBtn, delay) {
  if (activeDonationBtn === "donation_tiers") {
    splitByDonation(delay);
  } else {
    groupAllBubbles(1, 0.12);
  }
}
