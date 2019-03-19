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

  // attaches x & y value for each cluster
  for (let key in tierLevels) {
    if (tierLevels[key].cluster) {
      for (let name in candidates) {
        tierLevels[key].cluster[name] = [xScale(name), tierLevels[key].y];
      }
    }
  }

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

  const candidateNodes = {};
  for (let name in candidates) {
    const nodes = myNodes.filter(node => {
      return node.name === name;
    });
    candidateNodes[name] = nodes;
  }

  Object.defineProperty(candidateNodes, "sortedArray", {
    enumerable: false,
    value: function(pubFundNodes) {
      const array = [];

      //store for later
      if (pubFundNodes) {
        chart.pubFundNodes = pubFundNodes;
      }

      //push on the public fund nodes if they exist
      if (chart.pubFundNodes) {
        array.push(...chart.pubFundNodes);
      }

      for (let name in candidates) {
        array.push(...candidateNodes[name]);
      }

      // sort them to prevent occlusion of smaller nodes.
      return array.sort(function(a, b) {
        return b.radius - a.radius;
      });
    }
  });

  return candidateNodes;
}

export function createPubFundNodes() {
  let pubNodes = [];

  let tiers = { ...tierLevels };
  delete tiers.Totals;
  delete tiers.Amounts;

  for (let name in chart.nodes) {
    for (let tier in tiers) {
      // matchedAmt is an assumed average donation size for each tier
      // or 1000 beyond the lower tiers
      let matchedAmt =
        tier === "_50Count"
          ? 35
          : tier === "_200Count"
          ? 125
          : tier === "_500Count"
          ? 350
          : tier === "_1kCount"
          ? 750
          : 1000;
      let amount = totals[name][tier].count * matchedAmt;

      // for (let i = 0; i < numOfNodes; i++) {
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
      // }
    }
  }
  return pubNodes;
}
