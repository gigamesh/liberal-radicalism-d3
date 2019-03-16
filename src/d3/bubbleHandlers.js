import { forceX, forceY } from "d3-force";
import chart from "./chart";
import { select } from "d3-selection";
import {
  forceStrength,
  tierLevels,
  scaleMatrix,
  candidates,
  chartHeight,
  tierColumnWidth,
  wait
} from "./config";

export function groupAllBubbles(alpha, decay) {
  const { allForce } = chart;
  const centerY = chartHeight / 2;

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

export async function splitByDonation(delay = 0) {
  const { tierForce } = chart;
  await wait(delay);
  showTierLabels();

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
            return candidates[d.name].x;
          })
      );

    // @v4 We can reset the alpha value and restart the allForce
    tierForce[key].alpha(1).restart();
  }

  // allForce
  //   .velocityDecay(0.2)
  //   .force(
  //     "y",
  //     forceY()
  //       .strength(forceStrength)
  //       .y(d => {
  //         return tierLevels[d.tier].y;
  //       })
  //   )
  //   .force(
  //     "x",
  //     forceX()
  //       .strength(forceStrength)
  //       .x(d => {
  //         return candidates[d.name].x;
  //       })
  //   );

  // // @v4 We can reset the alpha value and restart the allForce
  // allForce.alpha(1).restart();
}

export function splitByCandidate() {
  const { candidateForce } = chart;

  for (let key in candidateForce) {
    candidateForce[key].velocityDecay(0.2).force(
      "x",
      forceX()
        .strength(0.07)
        .x(d => {
          return candidates[d.name].x;
        })
    );

    // @v4 We can reset the alpha value and restart the allForce
    candidateForce[key].alpha(1).restart();
  }
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
    .text(d => tierLevels[d].text)
    .each(function(d) {
      if (d === "Amounts") {
        select(this)
          .style("text-decoration", "underline")
          .style("font-weight", "bold");
      }
    });
}

export function showCandidates() {
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
