import { totals } from "./data/2016_primary_data";
const windowHeight = document.documentElement.clientHeight;
const windowWidth = document.documentElement.clientWidth;

const max = 10000000;

const tierReference = {
  zeroTo50Amount: {
    ratio: 50 / 2700
  },
  fiftyTo200Amount: {
    ratio: 200 / 2700
  },
  twoHundredTo500Amount: {
    ratio: 500 / 2700
  },
  fiveHundredTo1000Amount: {
    ratio: 1000 / 2700
  },
  oneThouTo2000Amount: {
    ratio: 2000 / 2700
  },
  twoThouToLimitAmount: {
    ratio: 1
  }
};

export const buildDataArray = () => {
  let count = 0;
  const dataArray = [];

  totals.forEach(candidate => {
    for (let prop in candidate) {
      if (
        /amount/i.test(prop) &&
        !/grand/i.test(prop) &&
        candidate[prop] &&
        !isNaN(candidate[prop])
      ) {
        const amount = max * tierReference[prop].ratio;
        let num = Math.ceil(candidate[prop] / amount);
        // console.log(candidate.name, prop, num, amount);

        for (let i = 0; i < num; i++) {
          let a = Math.random() * 2 * Math.PI;
          let r = Math.sqrt(~~(Math.random() * windowHeight ** 2));

          dataArray.push({
            id: count,
            name: candidate.name,
            tier: prop,
            text: tierReference[prop].text,
            size: 2700 * tierReference[prop].ratio,
            amount: Math.round(amount / 100000) * 100000,
            initX: (windowWidth / 2) * Math.cos(a),
            initY: windowHeight / 2 + r * Math.sin(a)
          });
          count++;
        }
      }
    }
  });

  const cache = {};
  dataArray.forEach(o => {
    if (o.name === "Hillary Clinton" && !cache[o.tier]) {
      cache[o.tier] = 0;
    }
    cache[o.tier]++;
  });
  console.log(cache);

  // console.log(count);
  return dataArray;
};
