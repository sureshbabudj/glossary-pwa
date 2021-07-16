import React, { useState } from "react";
import DefinitionsComp from "./Definitions";
import Menubar from "./Menubar";
import { Navbar } from "./Navbar";
import { Definitions, Glossary } from "./types";

export default function App() {
  const [results, setResults] = useState<null | Definitions>(null);
  const [error, setError] = useState<string>("");
  const [selected, setSelected] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);

  async function fetchGlossary(word: string) {
    try {
      const response = await fetch(
        `https://owlbot.info/api/v4/dictionary/${word}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token e1044363a7ae02ca6da1ec9d5b2be687501ad0e6"
          }
        }
      );
      if (response.status >= 400) {
        throw new Error("Fetch Failed");
      }
      const glossary = await response.json();
      formatResults(glossary);
      setError("");
      setIsEmpty(false);
    } catch (error) {
      setResults(null);
      setError("The word is either invalid or not found in our DB");
      setIsEmpty(false);
    }
  }

  function formatResults(glossary: Glossary) {
    const types: Definitions = {};
    glossary.definitions.forEach((i) => {
      types[i.type] = types[i.type] || [];
      types[i.type].push(i);
    });
    setResults(types);
    setSelected(Object.keys(types)[0]);
  }

  let debouncer: ReturnType<typeof setTimeout>;

  function handleInputChange(e) {
    const word: string = e.target.value;
    if (debouncer) {
      clearTimeout(debouncer);
    }
    if (!word) {
      setError("");
      setResults(null);
      setIsEmpty(true);
      return;
    }
    debouncer = setTimeout(() => {
      fetchGlossary(word);
    }, 500);
  }

  function onTabSelected(e) {
    setSelected(e);
  }

  return (
    <>
      <div className="wrap">
        <Navbar
          menus={results ? Object.keys(results) : []}
          selected={selected}
          onTabSelected={onTabSelected}
        />
        <div className="main">
          <div className="search">
            <input
              className="search-input"
              type="text"
              placeholder="Enter Word"
              name="word"
              id="word"
              onChange={handleInputChange}
            />
            <div className="search-icon">
              <i className="fas fa-search"></i>
            </div>
          </div>

          {results && (
            <DefinitionsComp
              definitions={results}
              selected={selected}
              onTabSelected={onTabSelected}
            />
          )}

          {isEmpty && (
            <p className="welcome">
              Explore new words and it's meaning with Examples
            </p>
          )}

          {error && <p className="error">{error}</p>}
        </div>
      </div>
      <Menubar />
    </>
  );
}
