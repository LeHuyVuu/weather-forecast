import WeatherForecastChart from "../../components/WeatherForecastChart";

const WeatherForecastPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-32 ">
      <div className=" mx-auto">
        {/* <h1 className="text-3xl font-bold text-center mb-8">
          Weather Forecast
        </h1> */}
        <WeatherForecastChart />
      </div>
    </div>
  );
};

export default WeatherForecastPage;
