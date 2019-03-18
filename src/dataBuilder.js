import { totals } from "./data/fakePrimaryData";

/// bundling the smaller amounts as to not create too many DOM elements
// imperfect solution until I learn to combine D3 with canvas

const radiusRatios = {
  _50Count: {
    ratio: 2500
  },
  _200Count: {
    ratio: 5000
  },
  _500Count: {
    ratio: 5000
  },
  _1kCount: {
    ratio: 5000
  },
  _2kCount: {
    ratio: 6000
  },
  _5kCount: {
    ratio: 5000
  },
  _50kCount: {
    ratio: 50000
  },
  _500kCount: {
    ratio: 500000
  }
};

export const buildDataArray = () => {
  const dataArray = [];
  let count = 0;

  totals.forEach(candidate => {
    for (let prop in candidate) {
      switch (prop) {
        case "_50Count":
          count = Math.round(candidate[prop][1] / 50);
          break;
        case "_200Count":
          count = Math.round(candidate[prop][1] / 25);
          break;
        case "_500Count":
          count = Math.round(candidate[prop][1] / 10);
          break;
        case "_1kCount":
          count = Math.round(candidate[prop][1] / 5);
          break;
        case "_2kCount":
          count = Math.round(candidate[prop][1] / 3);
          break;
        default:
          count = candidate[prop][1];
      }

      for (let i = 0; i < count; i++) {
        dataArray.push({
          name: candidate.name,
          tier: prop,
          size: radiusRatios[prop].size
        });
      }
    }
  });

  // console.log(count);
  return dataArray;
};
