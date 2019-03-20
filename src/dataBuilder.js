import totals from "./data/fakePrimaryData";

/// bundling the smaller amounts as to not create too many DOM elements
// imperfect solution until I learn to combine D3 with canvas

const radiusRatios = {
  _50Count: {
    size: 2500
  },
  _200Count: {
    size: 2400
  },
  _500Count: {
    size: 2500
  },
  _1kCount: {
    size: 3000
  },
  _2kCount: {
    size: 4000
  },
  _5kCount: {
    size: 5000
  },
  _50kCount: {
    size: 50000
  },
  _500kCount: {
    size: 500000
  }
};

export const buildDataArray = () => {
  const dataArray = [];

  for (let name in totals) {
    let candidate = totals[name];
    let dollarSum = 0;
    let howMany = 0;
    let count = 1;

    for (let prop in candidate) {
      console.log(prop);
      if (prop !== "name") {
        dollarSum = dollarSum + candidate[prop].value * candidate[prop].count;
      }

      switch (prop) {
        case "_50Count":
          count = 50;
          howMany = Math.round(candidate[prop].count / count);
          break;
        case "_200Count":
          count = 12;
          howMany = Math.round(candidate[prop].count / count);
          break;
        case "_500Count":
          count = 5;
          howMany = Math.round(candidate[prop].count / count);
          break;
        case "_1kCount":
          count = 3;
          howMany = Math.round(candidate[prop].count / count);
          break;
        case "_2kCount":
          count = 2;
          howMany = Math.round(candidate[prop].count / count);
          break;
        default:
          count = 1;
          howMany = candidate[prop].count;
      }

      for (let i = 0; i < howMany; i++) {
        dataArray.push({
          name,
          tier: prop,
          amount: radiusRatios[prop].size,
          sqrt: Math.sqrt(candidate[prop].value),
          count
        });
      }
    }

    console.log(name, dollarSum);
  }

  // console.log(count);
  return dataArray;
};
