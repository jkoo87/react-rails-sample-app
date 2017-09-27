import React from "react";
import { Link } from "react-router-dom";
import css from "./index.scss";

export const AppHeader = () => {
  console.log(css);
  return (
    <div className={css.appHeaderDiv}>
      <Link to="/">
        <h1>React on Rails</h1>
      </Link>
    </div>
  );
};
