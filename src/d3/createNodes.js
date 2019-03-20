import totals from "../data/fakePrimaryData";
import chart from "./chart";
import {
  tierLevels,
  chartWidth,
  chartHeight,
  candidates,
  xScale
} from "./config";

export function createNodes(rawData) {
  const centerX = chartWidth / 2;
  const centerY = chartHeight / 2;

  const myNodes = rawData.map(function(d, i) {
    let a = Math.random() * 2 * Math.PI;
    let r = Math.sqrt(~~(Math.random() * chartHeight ** 2));

    return {
      id: i + "-donation",
      radius: chart.radiusScale(+d.amount),
      color: chart.fillColor(d.tier),
      name: d.name,
      text: tierLevels[d.tier].text,
      tier: d.tier,
      amount: d.amount,
      x: centerX + r * Math.cos(a),
      y: centerY + r * Math.sin(a)
    };
  });
  // console.log(myNodes);

  // Object.defineProperty(nodes, "all", {
  //   enumerable: false,
  //   value: function() {
  //     let newNodes = [];

  //     for (let key in nodes) {
  //       newNodes.push(...nodes[key]);
  //     }

  //     // sort them to prevent occlusion of smaller nodes.
  //     newNodes.sort(function(a, b) {
  //       return b.radius - a.radius;
  //     });

  //     return newNodes;
  //   }
  // });

  return myNodes.sort(function(a, b) {
    return b.radius - a.radius;
  });
}

export function addPubFundNodes() {
  let pubNodes = [];

  let tiers = { ...tierLevels };
  delete tiers.Totals;
  delete tiers.Amounts;

  for (let name in candidates) {
    for (let tier in tiers) {
      // matchedAmt is an assumed average donation size for each tier
      // or 1000 beyond the lower tiers
      let matchedAmt = tier === "_50Count" ? 50 : 200;

      let amount = totals[name][tier].count * matchedAmt;

      pubNodes.push({
        id: tier + "-pubfund",
        radius: chart.radiusScale(amount),
        name,
        color: "#f4d733",
        amount: amount,
        text: "Public Fund",
        tier: tier,
        x: chartWidth,
        y: chartHeight
      });
    }
  }

  chart.nodes.push(...pubNodes);
}
