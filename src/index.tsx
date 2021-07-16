import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./style.scss";

export default function Index() {
  return (
    <div className="container">
      <App />
    </div>
  );
}

ReactDOM.render(<Index />, document.getElementById("root"));
