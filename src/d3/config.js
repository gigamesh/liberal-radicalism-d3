import { scaleLinear, scalePoint } from "d3-scale";
import { max } from "d3-array";

export const donationColors = [
  "#B3D691",
  "#85C973",
  "#56BA5D",
  "#39AA61",
  "#1D9A6C",
  "#188977",
  "#137177",
  "#0E4D64",
  "#0A2F51"
];

export const screenHeight = window.innerHeight;
export const screenWidth = window.innerWidth;
export const chartWidth = Math.min(screenWidth * 0.55, 1400);
export const chartHeight = screenHeight * 0.92;
export const legendWidth = Math.max(chartWidth * 0.24, 120);
export const topPad = chartHeight * 0.05;
export const bottomPad = chartHeight * 0.02;

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
    count: 3648,
    donationSum: 688750,
    normalMatchSum: 1065400,
    sumOfSqrts: 40875.1802,
    lrMatchSum: 1107370.5
  },
  Bill: {
    count: 446,
    donationSum: 1055200,
    normalMatchSum: 1124600,
    sumOfSqrts: 11191.09141,
    lrMatchSum: 1086579.5
  }
};

export const tierLevels = {
  Amounts: {
    text: "Donation Ranges"
  },
  _500kCount: {
    text: "$50k-500k"
  },
  _50kCount: {
    text: "$5k - $50k"
  },
  _5kCount: {
    text: "$2k - $5k"
  },
  _2kCount: {
    text: "$1k - $2k"
  },
  _1kCount: {
    text: "$500 - $1k"
  },
  _500Count: {
    text: "$200 - $500"
  },
  _200Count: {
    text: "$50 - $200"
  },
  _50Count: {
    text: "$0 - $50"
  },
  Totals: {
    text: "TOTALS:"
  }
};

export const xScale = scalePoint()
  .padding(0.3)
  .domain(Object.keys(candidates))
  .range([0, chartWidth]);

export const tierScale = scaleLinear()
  .domain([0, 10])
  .range([topPad, chartHeight - bottomPad]);

export const tierLevelKeys = Object.keys(tierLevels);
tierLevelKeys.forEach((k, i) => {
  tierLevels[k].y = tierScale(i);
});

export const forceStrength = 0.07;

export function getCharge(exponent = 1.9, force = forceStrength) {
  return d => -Math.pow(d.radius, exponent) * force;
}

export function maxAmount(data) {
  return max(data, function(d) {
    return +d.amount;
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
