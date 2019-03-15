import { scaleLinear } from "d3-scale";
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
export const chartWidth = Math.min(screenWidth * 0.65, 1400);
export const chartHeight = screenHeight * 0.8;
export const tierColumnWidth = Math.max(chartWidth * 0.15, 110);
export const topPad = chartHeight * 0.22;
export const bottomPad = chartHeight * 0.12;

// Locations to move bubbles towards, depending
// on which view mode is selected.
export const center = { x: screenWidth / 2, y: screenHeight / 2 };
export const chartCenter = {
  x: (chartWidth - tierColumnWidth) / 2 + tierColumnWidth,
  y: chartHeight / 2
};

export const candidates = {
  "Bernie Sanders": { x: chartCenter.x - (chartWidth - tierColumnWidth) / 3 },
  "Hillary Clinton": { x: chartCenter.x },
  "Martin O'Malley": { x: chartCenter.x + (chartWidth - tierColumnWidth) / 3 }
};

export const tierLevels = {
  twoThouToLimitAmount: {
    text: "$2k - $2,700 (limit)"
  },
  oneThouTo2000Amount: {
    text: "$1k - $1999.99"
  },
  fiveHundredTo1000Amount: {
    text: "$500 - 999.99"
  },
  twoHundredTo500Amount: {
    text: "$200 - 499.99"
  },
  fiftyTo200Amount: {
    text: "$50 - 199.99"
  },
  zeroTo50Amount: {
    text: "$0 - 49.99"
  }
};

export const tierScale = scaleLinear()
  .domain([0, 5])
  .range([topPad, chartHeight - bottomPad]);

export const tierLevelKeys = Object.keys(tierLevels);
tierLevelKeys.forEach((k, i) => {
  tierLevels[k].y = tierScale(i);
});

// @v4 strength to apply to the position forces
export const forceStrength = 0.07;

export function charge(d) {
  return -Math.pow(d.radius, 2) * forceStrength;
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
