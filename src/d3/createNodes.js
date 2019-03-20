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

  return myNodes.sort(function(a, b) {
    return b.radius - a.radius;
  });
}

export function addPubFundNodes(mechanism = "normal") {
  let pubNodes = [];

  if (mechanism === "normal") {
    for (let name in totals) {
      for (let tier in totals[name]) {
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
  } else if (mechanism === "lr") {
    for (let name in totals) {
      const fund = 450000;
      const combinedLR =
        candidates.Bill.sumOfSqrts + candidates.Alice.sumOfSqrts;

      const totalLRRatio = candidates[name].sumOfSqrts / combinedLR;
      const dollarTotal = totalLRRatio * fund;

      const tiers = totals[name];
      for (let tier in tiers) {
        const { count, value } = totals[name][tier];

        const ratio = (count * Math.sqrt(value)) / candidates[name].sumOfSqrts;
        const amount = ratio * dollarTotal;

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
  }

  chart.nodes.push(...pubNodes);
}
