import { forceSimulation, forceX, forceManyBody } from "d3-force";
import chart from "./chart";
import { forceStrength, charge } from "./config";

// generates force simulator based on x & y position

function initSimulation() {
  const sim = forceSimulation()
    .force(
      "x",
      forceX()
        .strength(forceStrength)
        .x(chart.width / 2)
    )
    .force("charge", forceManyBody().strength(charge))
    .on("tick", frame);

  // @v4 Force starts up automatically,
  //  which we don't want as there aren't any nodes yet.
  sim.stop();
  return sim;
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
