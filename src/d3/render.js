import { rgb } from "d3-color";
import { scaleString, fillColor, candidates } from "./config";
import { groupBubbles } from "./bubbleHandlers";
import simulation from "./simulation";

function render() {
  this.bubbles = this.allBubblesGroup
    .attr("transform", scaleString(1.7))
    .selectAll("circle")
    .data(this.nodes, function(d) {
      return d.id;
    });

  // Create new circle elements each with class `bubble`.
  // There will be one circle.bubble for each object in the nodes array.
  // Initially, their radius (r attribute) will be 0.
  // @v4 Selections are immutable, so lets capture the
  //  enter selection to apply our transtition to below.
  const bubblesE = this.bubbles
    .enter()
    .append("circle")
    .attr("r", 0)
    .attr("fill", function(d) {
      return fillColor(+d.size);
    })
    .attr("stroke", function(d) {
      return rgb(fillColor(+d.size)).darker([3]);
    })
    .attr("stroke-width", 0.5);

  // @v4 Merge the original empty selection and the enter selection
  this.bubbles = this.bubbles.merge(bubblesE);

  // Fancy transition to make bubbles appear, ending with the
  // correct radius
  this.bubbles
    .transition()
    .duration(1200)
    .attr("r", function(d) {
      return d.radius;
    });

  // console.log(bubbles);
  simulation.nodes(this.nodes);

  // Add the candidate names
  const candidateTitleData = Object.keys(candidates);
  const candidateTitle = this.svg
    .selectAll(".candidate")
    .data(candidateTitleData);

  candidateTitle
    .enter()
    .append("text")
    .attr("class", "candidate")
    .attr("x", function(d) {
      return candidates[d].x;
    })
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .text(function(d) {
      return d;
    });

  // Set initial layout to single group.
  groupBubbles(0.5, 0.17);
}

export default render;
