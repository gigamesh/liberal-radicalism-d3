import { forceSimulation, forceX, forceManyBody } from "d3-force";
import { forceCluster } from "d3-force-cluster";
import chart from "./chart";
import { forceStrength, charge, chartWidth, tierLevels } from "./config";

// generates force simulator based on x & y position

function initSimulation() {
  const sim = forceSimulation()
    .force(
      "x",
      forceX()
        .strength(forceStrength)
        .x(chartWidth / 2)
    )
    .force("charge", forceManyBody().strength(charge))
    .on("tick", frame);

  // @v4 Force starts up automatically,
  //  which we don't want as there aren't any nodes yet.
  sim.stop();
  return sim;
}

export function initSimulations() {
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
      .force("charge", forceManyBody().strength(charge))
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

export default initSimulation;
