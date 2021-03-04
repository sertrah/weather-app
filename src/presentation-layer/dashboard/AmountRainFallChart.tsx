import React, { FunctionComponent } from "react"; // importing FunctionComponent
import { BarChart } from "application/components";

const AmountRainFallChart: FunctionComponent<{ weatherList: any }> = ({weatherList}) => (
  <section>
    <h2>AmountRainFallChart</h2>
    <BarChart
        width={500}
        height={300}
        data={weatherList}
        horizontalGuides={5}
        precision={1}
        verticalGuides={1}
      />
  </section>
);

export default AmountRainFallChart