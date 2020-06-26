import { forceX, forceY } from "d3-force";
import { easePolyOut } from "d3-ease";
import { interpolateNumber } from "d3-interpolate";
import chart from "./chart";
import { select } from "d3-selection";
import {
  forceStrength,
  tierLevels,
  candidates,
  xScale,
  chartHeight,
  legendWidth,
  topPad,
  chartWidth,
} from "./config";

export function groupAllBubbles(alpha, decay) {
  const { allForce } = chart;
  const centerY = chartHeight / 2;

  hideTierLabels();

  allForce
    .velocityDecay(decay)
    .force("y", forceY().strength(forceStrength).y(centerY));

  allForce.alpha(alpha).restart();
}

export async function splitByDonation() {
  const { tierForce, nodes } = chart;

  for (let key in tierForce) {
    const nodeGroup = nodes.filter((node) => {
      return key === node.tier;
    });
    tierForce[key].nodes(nodeGroup);

    tierForce[key]
      .velocityDecay(0.25)
      .force(
        "y",
        forceY()
          .strength(forceStrength)
          .y((d) => {
            return tierLevels[d.tier].y;
          })
      )
      .force(
        "x",
        forceX()
          .strength(forceStrength)
          .x((d) => {
            return xScale(d.name);
          })
      );

    tierForce[key].alpha(1).restart();
  }
}

export function splitByCandidate(
  { alpha, decay, strength } = { alpha: 1, decay: 0.25, strength: 0.07 }
) {
  const { candidateForce, nodes } = chart;

  for (let key in candidateForce) {
    const nodeGroup = nodes.filter((node) => {
      return key === node.name;
    });
    candidateForce[key].nodes(nodeGroup);

    candidateForce[key]
      .velocityDecay(decay)
      .force(
        "x",
        forceX()
          .strength(strength)
          .x((d) => {
            return xScale(d.name);
          })
      )
      .force(
        "y",
        forceY()
          .strength(strength)
          .y(chartHeight * 0.5)
      );
    candidateForce[key].alpha(alpha).restart();
  }
}

export function clearPubFunds() {}

export function stopSplitByCandidate() {
  const { candidateForce } = chart;
  for (let key in candidateForce) {
    candidateForce[key].stop();
  }
}

export function stopSplitByDonation() {
  const { tierForce } = chart;
  for (let key in tierForce) {
    tierForce[key].stop();
  }
}

export function showTotals(key) {
  const names = Object.keys(candidates);

  console.log("showTotals called");

  const totalText = chart.svg.selectAll(".money-totals").data(names);
  totalText
    .enter()
    .append("text")
    .attr("class", "money-totals")
    .attr("opacity", 0)
    .attr("y", tierLevels.Totals.y)
    .attr("x", (name) => xScale(name))
    .attr("text-anchor", "middle")
    .text((name) => {
      return `$${candidates[name][key].toLocaleString()}`;
    })
    .transition()
    .duration(300)
    .attr("opacity", 1);
}

export function initTierLabels() {
  let tierLabels = Object.keys(tierLevels);

  const tierTitle = chart.svg.selectAll(".tier-label").data(tierLabels);

  tierTitle
    .enter()
    .append("text")
    .attr("class", "tier-label")
    .attr("y", (key) => tierLevels[key].y)
    .attr("x", 0)
    .attr("text-anchor", "end")
    .text((d) => tierLevels[d].text)
    .each(function (d) {
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

export function hideTierLabels(speed = 500) {
  chart.svg
    .selectAll(".tier-label")
    .transition()
    .ease(easePolyOut)
    .duration(speed)
    .attr("x", 0);
}

export function showTierLabels(speed = 500) {
  const tierTitle = chart.svg.selectAll(".tier-label");

  tierTitle
    .transition()
    .ease(easePolyOut)
    .duration(speed)
    .attr("x", legendWidth);
}

export function moveCandidatesAndTotals(speed = 500) {
  const candidateTitles = chart.svg.selectAll(".candidate, .money-totals");

  candidateTitles
    .transition()
    .duration(speed)
    .ease(easePolyOut)
    .attr("x", function (d) {
      return xScale(d);
    });
}

export function resetTotals() {
  const totalText = chart.svg.selectAll(".money-totals");

  totalText.text((name) => {
    return `$${candidates[name].donationSum.toLocaleString()}`;
  });
}

export function updateTotals(key) {
  const totalText = chart.svg.selectAll(".money-totals");

  totalText.each(function (d) {
    select(this)
      .transition()
      .tween("text", function () {
        let total = select(this);
        let start, end;
        total.text((name) => {
          start = candidates[name].donationSum;
          end = candidates[name][key];
        });

        const interpolator = interpolateNumber(start, end);
        return function (t) {
          total.text("$" + Math.round(interpolator(t)).toLocaleString());
        };
      })
      .duration(2000);
  });
}

export function showCandidates() {
  let names = Object.keys(candidates);
  const candidateTitles = chart.svg.selectAll(".candidate").data(names);

  candidateTitles
    .enter()
    .append("text")
    .attr("class", "candidate")
    .attr("opacity", 0)
    .attr("x", function (d) {
      return xScale(d);
    })
    .attr("y", topPad)
    .attr("text-anchor", "middle")
    .text(function (d) {
      return d;
    })
    .transition()
    .duration(300)
    .attr("opacity", 1);

  chart.candidatesShowing = true;
}

export function toggleDonationGroups(activeDonationBtn, delay) {
  if (activeDonationBtn === "donation_tiers") {
    splitByDonation(delay);
  } else {
    groupAllBubbles(1, 0.12);
  }
}
