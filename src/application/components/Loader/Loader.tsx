import React, { FunctionComponent } from "react";

type CardProps = {
  text?: string;
};

const Loader: FunctionComponent<CardProps> = ({ text }) => (
  <div className="loader">
    <div className="loader--container">
      <div className="loader--item"></div>
      <p>{text}</p>
    </div>
  </div>
);

export default Loader;
