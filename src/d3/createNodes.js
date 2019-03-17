import { scaleSqrt } from "d3-scale";
import chart from "./chart";
import {
  tierLevels,
  chartWidth,
  chartHeight,
  candidates,
  xScale
} from "./config";

function createNodes(rawData) {
  const centerX = chartWidth / 2;
  const centerY = chartHeight / 2;

  // attaches x & y value for each cluster
  for (let key in tierLevels) {
    if (tierLevels[key].cluster) {
      for (let name in candidates) {
        tierLevels[key].cluster[name] = [xScale(name), tierLevels[key].y];
      }
    }
  }

  const radiusScale = scaleSqrt()
    .domain([0, chart.maxAmount])
    .range([0, chartHeight * 0.017]);

  // create public funding nodes
  const numOfNodes = 200;
  let pubArray = [];

  let tiers = { ...tierLevels };
  delete tiers.Totals;
  delete tiers.Amounts;

  for (let name in candidates) {
    let portion = Math.round(numOfNodes * candidates[name].normalRatio);
    // console.log(name, portion)
    for (let t in tiers) {
      let tierPortion = Math.round(portion / 6);

      for (let i = 0; i < tierPortion; i++) {
        pubArray.push({
          name,
          size: 500,
          text: "Public Fund",
          tier: t
        });
      }
    }
  }

  const allData = pubArray.concat(rawData);

  const myNodes = allData.map(function(d, i) {
    let a = Math.random() * 2 * Math.PI;
    let r = Math.sqrt(~~(Math.random() * chartHeight ** 2));
    return {
      id: i + "-donation",
      radius: radiusScale(+d.size),
      size: +d.size,
      color: d.text !== "Public Fund" ? chart.fillColor(+d.size) : "#fce079",
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
