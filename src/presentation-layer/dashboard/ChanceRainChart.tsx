import React, { FunctionComponent } from "react"; // importing FunctionComponent
import { LineChart } from "application/components";

const ChanceRainChart: FunctionComponent<{ weatherList: any }> = ({
  weatherList,
}) => {
  return (
    <article>
      <h2>Chance Rain Chart</h2>
      <LineChart
        width={500}
        height={300}
        data={weatherList}
        horizontalGuides={6}
        precision={1}
        verticalGuides={3}
      />
    </article>
  );
};

export default ChanceRainChart;
