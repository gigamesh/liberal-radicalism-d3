import { forceSimulation, forceX, forceManyBody } from "d3-force";
import { center, forceStrength, charge } from "./config";
import chart from "./chart";

// generates force simulator based on x & y position

const simulation = forceSimulation()
  .force(
    "x",
    forceX()
      .strength(forceStrength)
      .x(center.x)
  )
  .force("charge", forceManyBody().strength(charge))
  .on("tick", frame);

// @v4 Force starts up automatically,
//  which we don't want as there aren't any nodes yet.
simulation.stop();

function frame() {
  chart.bubbles
    .attr("cx", function(d) {
      return d.x;
    })
    .attr("cy", function(d) {
      return d.y;
    });
}

export default simulation;
