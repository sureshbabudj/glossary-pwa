import React, { ReactElement, useState } from "react";

interface Props {}

export default function Menubar({}: Props): ReactElement {
  const [active, setActive] = useState("home");
  return (
    <div className="menu-bar">
      <ul>
        <li onClick={() => setActive("home")}>
          <i className={`${active === "home" ? "fas" : "far"} fa-building`}></i>
        </li>
        <li onClick={() => setActive("history")}>
          <i
            className={`${active === "history" ? "fas" : "far"} fa-sticky-note`}
          ></i>
        </li>
        <li onClick={() => setActive("bookmark")}>
          <i
            className={`${active === "bookmark" ? "fas" : "far"} fa-bookmark`}
          ></i>
        </li>
        <li onClick={() => setActive("help")}>
          <i
            className={`${
              active === "help" ? "fas" : "far"
            } fa-question-circle`}
          ></i>
        </li>
      </ul>
    </div>
  );
}
