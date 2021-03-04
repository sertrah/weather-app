import React, { FunctionComponent } from "react";

const STROKE = 1;

const Axis: FunctionComponent<{ points: string }> = ({ points }) => (
  <polyline fill="none" stroke="#ccc" strokeWidth=".5" points={points} />
);

const calcPoints = (
  data: { value: number[]; label: number }[],
  maximumXFromData: number,
  chartWidth: number,
  padding: number,
  chartHeight: number,
  maximumYFromData: number
) => (position: number): string => {
  return data
    .map((element) => {
      const x = ((element.label - 1) / maximumXFromData) * chartWidth + padding;
      const y =
        chartHeight -
        (element.value[position] / maximumYFromData) * chartHeight +
        padding;
      return `${x},${y}`;
    })
    .join(" ");
};
type LineChartProps = {
  data: { value: number[]; label: number }[];
  height: number;
  width: number;
  horizontalGuides: number;
  verticalGuides: number | null;
  precision?: number;
};
const LineChart: FunctionComponent<LineChartProps> = ({
  data,
  height,
  width,
  horizontalGuides: numberOfHorizontalGuides,
  verticalGuides: numberOfVerticalGuides,
  precision,
}) => {
  const FONT_SIZE = width / 50;
  const maximumYFromData = Math.max(...data.map((e) => Math.max(...e.value)));
  const maximumXFromData = Math.max(...data.map((e) => e.label));

  const digits: number =
    parseFloat(maximumYFromData.toString()).toFixed(precision).length + 1;

  const padding = (FONT_SIZE + digits) * 3;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const getPoints = calcPoints(data, maximumXFromData, chartWidth, padding, chartHeight, maximumYFromData)
  const points = getPoints(0)
  const points1 = getPoints(1)
  const points2 = getPoints(2)

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

  const VerticalGuides: FunctionComponent = () => {
    const guideCount: number = numberOfVerticalGuides || data.length - 1;

    const startY = padding;
    const endY = height - padding;

    return (
      <>
        {" "}
        {new Array(guideCount).fill(0).map((_, index) => {
          const ratio = (index + 1) / guideCount;

          const xCoordinate = padding + ratio * (width - padding * 2);

          return (
            <React.Fragment key={index}>
              <polyline
                fill="none"
                stroke="#ccc"
                strokeWidth=".5"
                points={`${xCoordinate},${startY} ${xCoordinate},${endY}`}
              />
            </React.Fragment>
          );
        })}{" "}
      </>
    );
  };

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
    return (
      <>
        {data.map((element, index) => {
          const x =
            ((element.label - 1)  / maximumXFromData) * chartWidth +
            padding -
            FONT_SIZE / 2;
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
              {element.label}
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
              {parseFloat(`${maximumYFromData * (index / PARTS)}`).toFixed(
                precision
              )}
            </text>
          );
        })}
      </>
    );
  };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      //style={{ border: "0.5px solid #ccc" }}
    >
      <XAxis />
      <LabelsXAxis />
      <YAxis />
      <LabelsYAxis />
      {numberOfVerticalGuides && <VerticalGuides />}
      <HorizontalGuides />

        <polyline
          fill="none"
          stroke="var(--primary)"
          strokeWidth={STROKE}
          points={points}
        />
        <polyline
          fill="none"
          stroke="var(--secundary)"
          strokeWidth={STROKE}
          points={points1}
        />
        <polyline
          fill="none"
          stroke="var(--niceColor)"
          strokeWidth={STROKE}
          points={points2}
        />
      
    </svg>
  );
};

LineChart.defaultProps = {
  height: 200,
  width: 500,
  horizontalGuides: 4,
  verticalGuides: null,
  precision: 2,
};

export default LineChart;
