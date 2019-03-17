import { scaleLinear, scalePoint } from "d3-scale";
import chart from "./chart";
import { max } from "d3-array";

export const donationColors = [
  "#D2F4B7",
  "#C4E7A8",
  "#B5D999",
  "#98BF7B",
  "#7BA45D",
  "#507C30"
];

export const screenHeight = window.innerHeight;
export const screenWidth = window.innerWidth;
export const chartWidth = Math.min(screenWidth * 0.62, 1400);
export const chartHeight = screenHeight * 0.92;
export const legendWidth = Math.max(chartWidth * 0.18, 95);
export const topPad = chartHeight * 0.04;
export const bottomPad = chartHeight * 0.03;

// Locations to move bubbles towards, depending
// on which view mode is selected.
export const center = { x: screenWidth / 2, y: screenHeight / 2 };
export const chartCenter = {
  x: (chartWidth - legendWidth) / 2 + legendWidth,
  y: chartHeight / 2
};

export const combinedDollarSum = 447368608;

export const candidates = {
  Alice: {
    count: 403668,
    dollarSum: 19229039,
    normalRatio: 0.30993,
    lrRatio: 0.53435
  },
  Bill: {
    count: 43033136,
    dollarSum: 42005680,
    normalRatio: 0.67704,
    lrRatio: 0.46021
  },
  Carl: {
    count: 1050,
    dollarSum: 808276,
    normalRatio: 0.01302,
    lrRatio: 0.00543
  }
};

export const xScale = scalePoint()
  .padding(0.3)
  .domain(Object.keys(candidates))
  .range([0, chartWidth]);

export const tierLevels = {
  Amounts: {
    text: "Donation Ranges"
  },
  twoThouToLimitAmount: {
    text: "$2k - $2,700 (limit)",
    cluster: {}
  },
  oneThouTo2000Amount: {
    text: "$1k - $1999.99",
    cluster: {}
  },
  fiveHundredTo1000Amount: {
    text: "$500 - 999.99",
    cluster: {}
  },
  twoHundredTo500Amount: {
    text: "$200 - 499.99",
    cluster: {}
  },
  fiftyTo200Amount: {
    text: "$50 - 199.99",
    cluster: {}
  },
  zeroTo50Amount: {
    text: "$0 - 49.99",
    cluster: {}
  },
  Totals: {
    text: "TOTALS:"
  }
};

export const tierScale = scaleLinear()
  .domain([0, 7])
  .range([topPad, chartHeight - bottomPad]);

export const tierLevelKeys = Object.keys(tierLevels);
tierLevelKeys.forEach((k, i) => {
  tierLevels[k].y = tierScale(i);
});

export const forceStrength = 0.07;

export function getCharge(exponent = 1.8, force = forceStrength) {
  return d => -Math.pow(d.radius, exponent) * force;
}

export function maxAmount(data) {
  return max(data, function(d) {
    return +d.size;
  });
}

export function scaleMatrix(s) {
  let centerX = chartWidth / 2;
  let centerY = chartHeight / 2;

  return `matrix(${s}, 0, 0, ${s}, ${centerX - s * centerX}, ${centerY -
    s * centerY})`;
}

export function wait(delay) {
  return new Promise(res => {
    setTimeout(() => {
      res();
    }, delay);
  });
}
