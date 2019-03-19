import { forceSimulation, forceX, forceY, forceManyBody } from "d3-force";
import chart from "./chart";
import {
  forceStrength,
  getCharge,
  chartWidth,
  chartHeight,
  tierLevels,
  candidates
} from "./config";

// generates force simulator based on x & y position

export function initSimulation() {
  const sim = forceSimulation()
    .force(
      "x",
      forceX()
        .strength(forceStrength)
        .x(chartWidth / 2)
    )
    .force("charge", forceManyBody().strength(getCharge()))
    .on("tick", frame);

  // @v4 Force starts up automatically,
  //  which we don't want as there aren't any nodes yet.
  sim.stop();
  return sim;
}

export function initTierSimulations() {
  const simulations = { ...tierLevels };

  // these are just the x values & text for the legend
  delete simulations.Amounts;
  delete simulations.Totals;

  for (let key in simulations) {
    const sim = forceSimulation()
      .force(
        "x",
        forceX()
          .strength(forceStrength)
          .x(chartWidth / 2)
      )
      .force("charge", forceManyBody().strength(getCharge()))
      .on("tick", frame);

    // @v4 Force starts up automatically,
    //  which we don't want as there aren't any nodes yet.
    sim.stop();
    simulations[key] = sim;
  }
  return simulations;
}

export function initCandidateSimulations() {
  const simulations = { ...candidates };

  for (let key in simulations) {
    const sim = forceSimulation()
      .force(
        "y",
        forceY()
          .strength(forceStrength)
          .y(chartHeight / 2)
      )
      .force("charge", forceManyBody().strength(getCharge()))
      .on("tick", frame);

    // @v4 Force starts up automatically,
    //  which we don't want as there aren't any nodes yet.
    sim.stop();
    simulations[key] = sim;
  }

  return simulations;
}

function frame() {
  chart.bubbles
    .attr("cx", function(d) {
      return d.x;
    })
    .attr("cy", function(d) {
      return d.y;
    });
}
