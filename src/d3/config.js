import { scaleLinear, scaleOrdinal } from "d3-scale";
import { schemeGreens } from "d3-scale-chromatic";
import { max } from "d3-array";

export const screenWidth = window.innerWidth;
export const screenHeight = window.innerHeight;

export const chartWidth = screenWidth * (2 / 3);
export const chartHeight = screenHeight * 0.9;
export const chartPad = chartHeight * 0.2;

// Locations to move bubbles towards, depending
// on which view mode is selected.
export const center = { x: chartWidth / 2, y: chartHeight / 2 };

export const candidates = {
  "Bernie Sanders": { x: center.x - chartWidth / 4 },
  "Hillary Clinton": { x: center.x },
  "Martin O'Malley": { x: center.x + chartWidth / 4 }
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

export const colors = {
  bubbles: ["#5a823d", "#a3bc85", "#e7f7d4"]
};

export const tierScale = scaleLinear()
  .domain([0, 5])
  .range([0, chartHeight - chartPad * 2]);

export const tierLevelKeys = Object.keys(tierLevels);
tierLevelKeys.forEach((k, i) => {
  tierLevels[k].y = tierScale(i) + chartPad;
});

// @v4 strength to apply to the position forces
export const forceStrength = 0.03;

export function charge(d) {
  return -Math.pow(d.radius, 2) * forceStrength;
}

export function maxAmount(data) {
  return max(data, function(d) {
    return +d.size;
  });
}

export function scaleString(s) {
  return `matrix(${s}, 0, 0, ${s}, ${center.x - s * center.x}, ${center.y -
    s * center.y})`;
}

export const fillColor = scaleOrdinal().range(schemeGreens[6]);
