import React, { FC, SetStateAction, Dispatch } from "react";

import "./rangeSlider.scss";

type RangeSliderProps = {
  title?: string;
  max: number;
  min: number;
  value: number;
  onChange: Dispatch<SetStateAction<number>>;
};
const RangeSlider: FC<RangeSliderProps> = ({ title, max, min, value, onChange, ...props }) => {
    const width = 200;
    const labelPosition = Number(((value - min) * 98) / (max - min));
    return (
        <div className="rangeSlider" style={{width}}>
          {title && <p className="rangeSlider--text">{title}</p>}
          {value && <p className="rangeSlider--label" style={{left: `calc(${labelPosition}% + (${2 - labelPosition * 0.15}px))`}} >{value}</p>}
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            className="rangeSlider--input"
            onChange={(event)=> onChange(+event.target.value)}
            {...props}
          />
        </div>
      )
};

export default RangeSlider;
