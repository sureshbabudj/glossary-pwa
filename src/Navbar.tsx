import React from "react";

interface Props {
  menus?: string[];
  onTabSelected?: (param: string) => void;
  selected?: string;
}

export const Navbar = ({ menus, onTabSelected, selected }: Props) => {
  function handleSelected(menu: string) {
    typeof onTabSelected === "function" && onTabSelected(menu);
  }
  return (
    <div className="nav-bar">
      <h1>Glossary</h1>
      <nav>
        <ul>
          {menus &&
            menus.map((menu, i) => (
              <li
                className={menu === selected ? "active" : ""}
                key={i}
                onClick={() => handleSelected(menu)}
              >
                {menu}
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
};
