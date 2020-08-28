import React from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader/root";

import VelopertReview from "./velopert";

const Hot = hot(VelopertReview);

ReactDOM.render(<Hot />, document.querySelector("#root"));
