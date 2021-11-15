import React, { useContext } from "react";
import "./App.scss"
import DragColumns from "./components/DragColumns/dragColumns"
import { ThemeContext } from "./utilities/ThemeContext"

export default function App() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  return (
    <div className={`App ${darkMode ? "bg-dark" : "bg-light"}`}>
      <DragColumns />
    </div>
  );
}