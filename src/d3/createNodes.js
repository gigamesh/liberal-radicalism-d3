import {
  maxAmount,
  chartHeight,
  screenHeight,
  tierLevels,
  center
} from "./config";

import { scaleSqrt } from "d3-scale";

function createNodes(rawData) {
  const max = maxAmount(rawData);

  const radiusScale = scaleSqrt()
    .domain([0, max])
    .range([0, chartHeight * 0.022]);

  const myNodes = rawData.map(function(d, i) {
    let a = Math.random() * 2 * Math.PI;
    let r = Math.sqrt(~~(Math.random() * screenHeight ** 2));
    return {
      id: d.id,
      radius: radiusScale(+d.size),
      size: +d.size,
      name: d.name,
      text: tierLevels[d.tier].text,
      tier: d.tier,
      x: center.x + r * Math.cos(a),
      y: center.y + r * Math.sin(a)
    };
  });

  // sort them to prevent occlusion of smaller nodes.
  myNodes.sort(function(a, b) {
    return b.radius - a.radius;
  });

  return myNodes;
}

export default createNodes;
