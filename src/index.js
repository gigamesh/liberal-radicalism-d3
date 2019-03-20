import React from "react";
import ReactDOM from "react-dom";
// import { hot } from "react-hot-loader";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const root = document.getElementById("root");

// const HotApp = hot(module)(App);

ReactDOM.render(<App />, root);

// if (module.hot) {
//   module.hot.accept("./App", () => {
//     const NextApp = require("./App").default;
//     ReactDOM.render(<NextApp />, root);
//   });
// }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
