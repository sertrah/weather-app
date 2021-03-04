import React, { FunctionComponent, useState, useMemo } from "react";
import { useQuery } from "react-query";

import ChanceRainChart from "./ChanceRainChart";
import AmountRainFallChart from "./AmountRainFallChart";
import { RangeSlider, Container, Loader } from "application/components";
import { weatherService } from "infraestructure/services";
import { useNotification } from "application/hooks";

function chanceOfRain(pressure: number, temperature: number, amount: number) {
  var score =
    Math.log(amount + 1) * Math.log(pressure - 929) * Math.log(temperature - 9);
  var mean = Math.min(Math.max(score, 0), 100);
  var upper_bound = Math.min(1.5 * mean, 100);
  var lower_bound = Math.max(0.5 * mean, 0);
  return [lower_bound, mean, upper_bound];
}

const Dashboard: FunctionComponent = () => {
  const [pressure, setPressure] = useState(1030);
  const [temperature, setTemperature] = useState(30);
  const notify = useNotification();
 

  const { data: rainFallList, isLoading } = useQuery(
    "rainFallList",
    weatherService.getAll,
    {
      retry: 1,
      retryDelay: 3000,
      onError: (error)=> {
        notify.success({
          title: "Weather Service",
          message: error,
        });
      }
    }
  );
  const chanceOfRainCalculated = useMemo(() => {
    return (
      rainFallList &&
      rainFallList[0].days.map(({ amount, day }) => ({
        label: day,
        value: chanceOfRain(pressure, temperature, amount),
      }))
    );
  }, [pressure, temperature, rainFallList]);
  return (
    <Container>
      <h1>Adidas Technical Test</h1>
      {isLoading && <Loader />}
      <section className="dashboard__container">
        <RangeSlider
          title="Pressure [hPa]"
          max={1030}
          min={970}
          value={pressure}
          onChange={setPressure}
        />

        {chanceOfRainCalculated && (
          <ChanceRainChart weatherList={chanceOfRainCalculated} />
        )}
        <RangeSlider
          title="Temperature [°C]"
          max={35}
          min={10}
          value={temperature}
          onChange={setTemperature}
        />
        {rainFallList && (
          <AmountRainFallChart weatherList={rainFallList[0].days} />
        )}
      </section>
    </Container>
  );
};

export default Dashboard;
