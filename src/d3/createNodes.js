import { scaleSqrt } from "d3-scale";
import chart from "./chart";
import { tierLevels, chartWidth, chartHeight } from "./config";

function createNodes(rawData) {
  const centerX = chartWidth / 2;
  const centerY = chartHeight / 2;

  const radiusScale = scaleSqrt()
    .domain([0, chart.maxAmount])
    .range([0, chartHeight * 0.022]);

  const myNodes = rawData.map(function(d, i) {
    let a = Math.random() * 2 * Math.PI;
    let r = Math.sqrt(~~(Math.random() * chartHeight ** 2));
    return {
      id: d.id,
      radius: radiusScale(+d.size),
      size: +d.size,
      name: d.name,
      text: tierLevels[d.tier].text,
      tier: d.tier,
      x: centerX + r * Math.cos(a),
      y: centerY + r * Math.sin(a)
    };
  });

  // sort them to prevent occlusion of smaller nodes.
  myNodes.sort(function(a, b) {
    return b.radius - a.radius;
  });

  return myNodes;
}

export default createNodes;
