import { scaleLinear } from "d3-scale";
import { max } from "d3-array";

export const donationColors = [
  "#D2F4B7",
  "#C4E7A8",
  "#B5D999",
  "#98BF7B",
  "#7BA45D",
  "#507C30"
];

export const screenWidth = window.innerWidth;
export const screenHeight = window.innerHeight;

export const chartWidth = screenWidth * (3 / 4);
export const chartHeight = chartWidth * 0.5;

// Locations to move bubbles towards, depending
// on which view mode is selected.
export const center = { x: screenWidth / 2, y: screenHeight / 2 };

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

export const tierScale = scaleLinear()
  .domain([0, 5])
  .range([0, chartHeight]);

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

export function scaleString(s) {
  return `matrix(${s}, 0, 0, ${s}, ${center.x - s * center.x}, ${center.y -
    s * center.y})`;
}

// function setDimensions(currentView){
//   if(currentView === 0){

//   }
// }
