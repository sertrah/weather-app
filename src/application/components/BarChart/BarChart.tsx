import React, { FunctionComponent } from "react";

const colorList = [
  "var(--niceColor)",
  "var(--primary)",
  "var(--primary-dark)",
  "var(--secundary)",
  "var(--niceColor)",
  "var(--secundary-dark)",
  "var(--primary)",
];
const Axis: FunctionComponent<{ points: string }> = ({ points }) => (
  <polyline fill="none" stroke="#ccc" strokeWidth=".5" points={points} />
);

const calcValues = (
  data: { amount: number; day: number }[],
  maximumYFromData: number
): { position: { x: number; y: number }; height: number }[] => {
  return data.map((x) => {
    const position = {
      x: (x.day + 1) * 43,
      y: maximumYFromData - x.amount + 2,
    };
    const height = x.amount;
    return { position, height };
  });
};
type BarChartProps = {
  data: { amount: number; day: number }[];
  height: number;
  width: number;
  horizontalGuides: number;
  verticalGuides: number | null;
  precision?: number;
};
const BarChart: FunctionComponent<BarChartProps> = ({
  data,
  height,
  width,
  horizontalGuides: numberOfHorizontalGuides,
  precision,
}) => {
  const FONT_SIZE = width / 50;
  const maximumYFromData = Math.max(...data.map((e) => e.amount));
  const digits: number =
    parseFloat(maximumYFromData.toString()).toFixed(precision).length + 1;

  const padding = (FONT_SIZE + digits) * 3;
  const chartHeight = height - padding * 2;

  const dataRecords = calcValues(data, height - 50);

  const XAxis = () => (
    <Axis
      points={`${padding},${height - padding} ${width - padding},${
        height - padding
      }`}
    />
  );

  const YAxis = () => (
    <Axis points={`${padding},${padding} ${padding},${height - padding}`} />
  );

  const HorizontalGuides: FunctionComponent = () => {
    const startX = padding;
    const endX = width - padding;

    return (
      <>
        {new Array(numberOfHorizontalGuides).fill(0).map((_, index) => {
          const ratio = (index + 1) / numberOfHorizontalGuides;

          const yCoordinate = chartHeight - chartHeight * ratio + padding;

          return (
            <React.Fragment key={index}>
              <polyline
                fill="none"
                stroke={"#ccc"}
                strokeWidth=".5"
                points={`${startX},${yCoordinate} ${endX},${yCoordinate}`}
              />
            </React.Fragment>
          );
        })}{" "}
      </>
    );
  };

  const LabelsXAxis: FunctionComponent = () => {
    const y = height - padding + FONT_SIZE * 2;
    let flag = 40;
    return (
      <>
        {data.map((element, index) => {
          const x = (element.day + 1) * 30 + flag;
          flag += 15;
          return (
            <text
              key={index}
              x={x}
              y={y}
              style={{
                fill: "#808080",
                fontSize: FONT_SIZE,
                fontFamily: "Helvetica",
              }}
            >
              {element.day}
            </text>
          );
        })}{" "}
      </>
    );
  };

  const LabelsYAxis: FunctionComponent = () => {
    const PARTS = numberOfHorizontalGuides;
    return (
      <>
        {" "}
        {new Array(PARTS + 1).fill(0).map((_, index) => {
          const x = FONT_SIZE;
          const ratio = index / numberOfHorizontalGuides;

          const yCoordinate =
            chartHeight - chartHeight * ratio + padding + FONT_SIZE / 2;
          return (
            <text
              key={index}
              x={x}
              y={yCoordinate}
              style={{
                fill: "#808080",
                fontSize: FONT_SIZE,
                fontFamily: "Helvetica",
              }}
            >
              {parseFloat(
                `${(maximumYFromData + 50) * (index / PARTS)}`
              ).toFixed(precision)}
            </text>
          );
        })}
      </>
    );
  };

  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <XAxis />
      <LabelsXAxis />
      <YAxis />
      <LabelsYAxis />

      <HorizontalGuides />

      {dataRecords.map((record, i) => {
        return (
          <rect
            width="43"
            x={record.position.x}
            y={record.position.y}
            key={`barchart-${i}`}
            height={record.height}
            style={{
              fill: colorList[i],
            }}
          />
        );
      })}
    </svg>
  );
};

BarChart.defaultProps = {
  height: 200,
  width: 500,
  horizontalGuides: 4,
  verticalGuides: null,
  precision: 2,
};

export default BarChart;
