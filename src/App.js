import React, { Component } from "react";
import "./App.css";

// const KEY = "d6mY22OiqYwdUPIGhf9ZIZH6gnOeLI8MTWET8EEK";
const ROOT_URL = `https://api.open.fec.gov/v1/`;

const CANDIDATES = [
  { name: "Bernie Sanders", candidate_id: "P60007168", cmte_id: "C00577130" },
  { name: "Hillary Clinton", candidate_id: "P00003392", cmte_id: "C00575795" },
  { name: "Martin O'Malley", candidate_id: "P60007671", cmte_id: "C00578658" },
  { name: "Lincoln Chafee", candidate_id: "P60008075", cmte_id: "C00579706" },
  { name: "Jim Webb", candidate_id: "P60008885", cmte_id: "C00581215" }
];

function numberWithCommas(x) {
  return x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class App extends Component {
  state = {
    candidates: CANDIDATES
  };

  componentDidMount() {
    const { candidates } = this.state;

    const candidatePromises = candidates.map(candidate => {
      return fetch(
        `${ROOT_URL}committee/${
          candidate.cmte_id
        }/schedules/schedule_a/by_size/?page=1&cycle=2016&sort_null_only=false&sort_nulls_last=false&api_key=${KEY}&sort_hide_null=false&per_page=20&size=0&size=200&size=500&size=1000&size=2000`
      ).then(res => res.json());
    });

    Promise.all(candidatePromises).then(data => {
      const updatedCandidates = candidates.map((candidate, i) => {
        data[i].results.sort((a, b) => a.size - b.size);

        const contributions = data[i].results.map(item => {
          switch (item.size) {
            case 0:
              item.size = "$200 and under";
              break;
            case 200:
              item.size = "$200.01 - $499.99";
              break;
            case 500:
              item.size = "$500 - $999.99";
              break;
            case 1000:
              item.size = "$1000 - $1999.99";
              break;
            default:
              item.size = "$2000 +";
          }
          return item;
        });

        return {
          ...candidate,
          contributions
        };
      });
      this.setState({ candidates: updatedCandidates });
    });
  }

  render() {
    const { candidates } = this.state;

    return (
      <div className="App">
        {candidates.map(candidate => (
          <div className="candidate-wrapper" key={candidate.name}>
            <h1>{candidate.name}</h1>
            <div className="grid">
              <div className="cell">
                <strong className="column-header">Size</strong>
              </div>
              <div className="cell">
                <strong className="column-header">Count</strong>
              </div>
              <div className="cell">
                <strong className="column-header">Total</strong>
              </div>
              {candidate.contributions &&
                candidate.contributions.map((item, i) => (
                  <React.Fragment key={i}>
                    <div className="cell">{numberWithCommas(item.size)}</div>
                    <div className="cell">{numberWithCommas(item.count)}</div>
                    <div className="cell">${numberWithCommas(item.total)}</div>
                  </React.Fragment>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
