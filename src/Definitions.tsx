import React from "react";
import { Navbar } from "./Navbar";
import { Definitions } from "./types";

interface Props {
  definitions: Definitions;
  selected: string;
  onTabSelected: (param: string) => void;
}

function DefinitionsComp({ definitions, selected, onTabSelected }: Props) {
  return (
    <div className="definitions">
      <Navbar menus={definitions ? Object.keys(definitions) : []}
          selected={selected}
          onTabSelected={onTabSelected}
        />
      {definitions[selected] &&
        definitions[selected].map((def, i) => (
          <div key={i} className="definition">
            <p className="meaning">
              <i className="far fa-eye"></i>
              {def.definition}
            </p>
            {def.example && <p className="example">
              <i className="far fa-comment"></i>
              {def.example}
            </p>
            {def.image_url && (
              <img src={def.image_url} alt={`example for ${def.type}`} />
            )}
            {def.emoji && <p className="emoji">Emoji: {def.emoji}</p>}
          </div>
        ))}
    </div>
  );
}

export default DefinitionsComp;
