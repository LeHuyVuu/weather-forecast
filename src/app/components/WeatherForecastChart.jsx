import { useState, useEffect } from "react";

import { sLocation } from "../context/store";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler,
  LineController,
} from "chart.js";
import { Bar, Radar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler,
  LineController
);

const getWeatherIcon = (iconCode) => {
  return (
    <img
      src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
      alt={`Weather condition: ${iconCode}`}
      width="48"
      height="48"
      className="object-contain inline-block"
    />
  );
};

const formatTime = (timestamp) => {
  // Get the UTC timestamp
  const date = new Date(timestamp * 1000);
  // Apply the timezone offset from API
  const timezoneOffsetSeconds = sLocation.value.timezoneOffset || 0;
  const adjustedDate = new Date(
    date.getTime() +
      timezoneOffsetSeconds * 1000 +
      date.getTimezoneOffset() * 60 * 1000
  );
  const hours = adjustedDate.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  return `${formattedHours} ${ampm}`;
};

const kelvinToCelsius = (kelvin) => {
  return Math.round(kelvin - 273.15);
};

export const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000*60); // Update every minute

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = () => {
    // Get timezone offset from the API in seconds
    const timezoneOffsetSeconds = sLocation.value.timezoneOffset || 0;

    // Create a new date by adjusting for the timezone offset
    const utcTime = new Date(
      currentTime.getTime() +
        timezoneOffsetSeconds * 1000 +
        currentTime.getTimezoneOffset() * 60 * 1000
    );

    const hours = utcTime.getHours().toString().padStart(2, "0");
    const minutes = utcTime.getMinutes().toString().padStart(2, "0");
    // const seconds = utcTime.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div className="text-xl font-medium">{formatTime()}</div>
  );
};

const WeatherForecastChart = () => {
  const [weatherData, setWeatherData] = useState({
    hourly: [],
    activeHourlyTab: "combined",
  });

  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);
  const [radarChartData, setRadarChartData] = useState(null);
  const [radarChartOptions, setRadarChartOptions] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [selectedHour, setSelectedHour] = useState(null);
  const [currentConditions, setCurrentConditions] = useState(null);

  useEffect(() => {
    const forecastData = sLocation.value;
    console.log(forecastData);

    if (forecastData && forecastData.hourly) {
      // setLoading(true);

      // Process hourly data from the JSON
      const processedHourly = forecastData.hourly.slice(0, 24).map((hour) => {
        // Debugging the wind speed
        // console.log('Raw wind speed (m/s):', hour.wind_speed);
        // console.log('Converted wind speed (km/h):', hour.wind_speed * 3.6);
        // console.log('Rounded wind speed (km/h):', Math.round(hour.wind_speed * 3.6));
        const rain = hour.rain ? hour.rain["1h"] : 0;
        return {
          time: formatTime(hour.dt),
          timestamp: hour.dt,
          temp: kelvinToCelsius(hour.temp),
          precipitation: rain,
          wind: Math.round(hour.wind_speed * 3.6),
          pressure: hour.pressure,
          uvi: hour.uvi,
          dayNight: hour.weather[0].icon.includes("n") ? "night" : "day",
          icon: hour.weather[0].icon,
          condition: hour.weather[0].main.toLowerCase(),
          humidity: hour.humidity,
          feelsLike: kelvinToCelsius(hour.feels_like),
          dewPoint: kelvinToCelsius(hour.dew_point),
          clouds: hour.clouds,
          visibility: hour.visibility / 1000, // Convert to km
        };
      });

      setWeatherData({
        hourly: processedHourly,
        activeHourlyTab: "combined",
      });

      // Set the first hour as selected by default
      setSelectedHour(processedHourly[0]);

      // Set current conditions from first hour
      setCurrentConditions(processedHourly[0]);

      // Initialize charts
      updateChart(processedHourly, "combined");
      updateRadarChart(processedHourly[0]);

      // setLoading(false);
    }
  }, []);

  const updateRadarChart = (hourData) => {
    if (!hourData) return;

    const data = {
      labels: [
        "Temperature (°C)",
        "Humidity (%)",
        "Wind (km/h)",
        "UV Index",
        "Cloud Cover (%)",
        "Visibility (km)",
      ],
      datasets: [
        {
          label: "Weather Conditions",
          data: [
            hourData.temp, 
            hourData.humidity,
            hourData.wind, 
            hourData.uvi * 10, 
            hourData.clouds, 
            Math.min(hourData.visibility, 10),
          ],
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 2,
          pointBackgroundColor: "rgba(54, 162, 235, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(54, 162, 235, 1)",
        },
      ],
    };

    const options = {
      scales: {
        r: {
          angleLines: {
            display: true,
            color: "rgba(128, 128, 128, 0.2)",
          },
          suggestedMin: 0,
          suggestedMax: 100,
          ticks: {
            stepSize: 20,
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          },
          grid: {
            circular: true,
            color: "rgba(128, 128, 128, 0.2)",
          },
          pointLabels: {
            font: {
              size: 11,
            },
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: `Weather Conditions at ${hourData.time}`,
          font: {
            size: 14,
          },
        },
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = "";
              const value = context.raw;
              const index = context.dataIndex;

              if (index === 0) {
                label = `Temperature: ${value}°C`;
              } else if (index === 1) {
                label = `Humidity: ${value}%`;
              } else if (index === 2) {
                label = `Wind: ${value} km/h`;
              } else if (index === 3) {
                label = `UV Index: ${value / 10}`;
              } else if (index === 4) {
                label = `Cloud Cover: ${value}%`;
              } else if (index === 5) {
                label = `Visibility: ${value} km`;
              }

              return label;
            },
          },
        },
      },
    };

    setRadarChartData(data);
    setRadarChartOptions(options);
  };

  const updateChart = (hourlyData, tab) => {
    const labels = hourlyData.map((hour) => hour.time);

    let datasets = [];
    let options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: tab === "combined",
          position: "top",
        },
        tooltip: {
          enabled: true,
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed.y !== null) {
                label += context.parsed.y;
                if (
                  context.dataset.label === "Temperature (°C)" ||
                  context.dataset.label === "Feels Like (°C)"
                ) {
                  label += "°C";
                } else if (context.dataset.label === "Precipitation (mm)") {
                  label += " mm";
                } else if (context.dataset.label === "Wind (km/h)") {
                  label += " km/h";
                } else if (context.dataset.label === "Humidity (%)") {
                  label += "%";
                } else if (context.dataset.label === "Pressure (hPa)") {
                  label += " hPa";
                } else if (context.dataset.label === "UV Index") {
                  label += " UVI";
                }
              }
              return label;
            },
          },
        },
      },
      scales: {
        y: {
          display: true,
          grid: {
            color: "rgba(200, 200, 200, 0.2)",
          },
          ticks: {
            display: true,
          },
        },
        x: {
          display: true,
          grid: {
            display: false,
          },
        },
      },
      elements: {
        line: {
          tension: 0.4,
        },
        point: {
          radius: 0,
          hoverRadius: 5,
        },
      },
      interaction: {
        mode: "index",
        intersect: false,
      },
    };

    if (tab !== "combined") {
      if (tab === "temp") {
        datasets = [
          {
            type: "line",
            label: "Temperature (°C)",
            data: hourlyData.map((hour) => hour.temp),
            borderColor: "rgba(255, 189, 32, 0.8)",
            backgroundColor: function (context) {
              const chart = context.chart;
              const { ctx, chartArea } = chart;
              if (!chartArea) {
                return null;
              }
              const gradient = ctx.createLinearGradient(
                0,
                0,
                0,
                chartArea.bottom
              );
              gradient.addColorStop(0, "rgba(255, 189, 32, 0.6)");
              gradient.addColorStop(1, "rgba(255, 189, 32, 0.1)");
              return gradient;
            },
            borderWidth: 2,
            fill: true,
            yAxisID: "y",
          },
          {
            type: "line",
            label: "Feels Like (°C)",
            data: hourlyData.map((hour) => hour.feelsLike),
            borderColor: "rgba(255, 99, 132, 0.8)",
            backgroundColor: "transparent",
            borderWidth: 2,
            borderDash: [5, 5],
            fill: false,
            yAxisID: "y",
          },
        ];

        // Add custom options for temperature
        options.scales.y.title = {
          display: true,
          text: "Temperature (°C)",
        };
      } else if (tab === "precipitation") {
        datasets = [
          {
            type: "bar",
            label: "Precipitation (mm)",
            data: hourlyData.map((hour) => hour.precipitation),
            backgroundColor: "rgba(59, 130, 246, 0.7)",
            borderColor: "rgba(59, 130, 246, 1)",
            borderWidth: 1,
            borderRadius: 4,
            yAxisID: "y",
          },
        ];

        // Add custom options for precipitation
        options.scales.y.beginAtZero = true;
        options.scales.y.suggestedMax = 5;
        options.scales.y.title = {
          display: true,
          text: "Precipitation (mm)",
        };
      } else if (tab === "wind") {
        datasets = [
          {
            type: "line",
            label: "Wind (km/h)",
            data: hourlyData.map((hour) => hour.wind),
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 2,
            fill: true,
            yAxisID: "y",
          },
        ];

        // Add custom options for wind
        options.scales.y.title = {
          display: true,
          text: "Wind Speed (km/h)",
        };
      } else if (tab === "pressure") {
        datasets = [
          {
            type: "line",
            label: "Pressure (hPa)",
            data: hourlyData.map((hour) => hour.pressure),
            borderColor: "rgba(153, 102, 255, 1)",
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderWidth: 2,
            fill: true,
            yAxisID: "y",
          },
        ];

        // Add custom options for pressure
        options.scales.y.title = {
          display: true,
          text: "Pressure (hPa)",
        };
      } else if (tab === "uvi") {
        datasets = [
          {
            type: "line",
            label: "UV Index",
            data: hourlyData.map((hour) => hour.uvi),
            borderColor: "rgba(255, 159, 64, 1)",
            backgroundColor: "rgba(255, 159, 64, 0.2)",
            borderWidth: 2,
            fill: true,
            yAxisID: "y",
          },
        ];

        // Add custom options for UV index
        options.scales.y.beginAtZero = true;
        options.scales.y.suggestedMax = 12;
        options.scales.y.title = {
          display: true,
          text: "UV Index",
        };
      } else if (tab === "humidity") {
        datasets = [
          {
            type: "line",
            label: "Humidity (%)",
            data: hourlyData.map((hour) => hour.humidity),
            borderColor: "rgba(123, 104, 238, 1)",
            backgroundColor: "rgba(123, 104, 238, 0.2)",
            borderWidth: 2,
            fill: true,
            yAxisID: "y",
          },
        ];

        // Add custom options for humidity
        options.scales.y.beginAtZero = true;
        options.scales.y.suggestedMax = 100;
        options.scales.y.title = {
          display: true,
          text: "Humidity (%)",
        };
      }
    } else {
      // Combined chart with precipitation as bars and everything else as lines
      datasets = [
        {
          type: "bar",
          label: "Precipitation (mm)",
          data: hourlyData.map((hour) => hour.precipitation),
          backgroundColor: "rgba(59, 130, 246, 0.7)",
          borderColor: "rgba(59, 130, 246, 1)",
          borderWidth: 1,
          borderRadius: 4,
          yAxisID: "y1",
          order: 1,
        },
        {
          type: "line",
          label: "Temperature (°C)",
          data: hourlyData.map((hour) => hour.temp),
          borderColor: "rgba(255, 189, 32, 0.8)",
          backgroundColor: "transparent",
          borderWidth: 2,
          yAxisID: "y",
          order: 0,
        },
        {
          type: "line",
          label: "Feels Like (°C)",
          data: hourlyData.map((hour) => hour.feelsLike),
          borderColor: "rgba(255, 99, 132, 0.8)",
          backgroundColor: "transparent",
          borderWidth: 2,
          borderDash: [5, 5],
          yAxisID: "y",
          order: 0,
          hidden: false,
        },
        {
          type: "line",
          label: "Wind (km/h)",
          data: hourlyData.map((hour) => hour.wind),
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "transparent",
          borderWidth: 2,
          yAxisID: "y2",
          order: 0,
          hidden: false,
        },
        {
          type: "line",
          label: "Humidity (%)",
          data: hourlyData.map((hour) => hour.humidity),
          borderColor: "rgba(123, 104, 238, 1)",
          backgroundColor: "transparent",
          borderWidth: 2,
          yAxisID: "y3",
          order: 0,
          hidden: false,
        },
      ];

      const maxValues = {
        temperature: Math.max(...hourlyData.map((d) => d.temp)),
        precipitation: Math.max(...hourlyData.map((d) => d.precipitation)),
        wind: Math.max(...hourlyData.map((d) => d.wind)),
        humidity: Math.max(...hourlyData.map((d) => d.humidity)),
      };

      // Tự động điều chỉnh max để không bị dính mép
      const adjustMax = (value, buffer = 5) =>
        value === 0 ? buffer : value + buffer;

      // Update options for combined chart
      options.scales = {
        y: {
          // Nhiệt độ (°C)
          type: "linear",
          display: true,
          position: "left",
          title: {
            display: true,
            text: "Temperature (°C)",
            font: { weight: "bold" },
            color: "rgba(255, 189, 32, 0.8)",
          },
          grid: { color: "rgba(255, 189, 32, 0.2)" },
          suggestedMin: 0,
          suggestedMax: adjustMax(maxValues.temperature, 5), // Tăng thêm 5°C 
          ticks: { callback: (value) => value + "°C" },
        },

        y1: {
          // Lượng mưa (mm)
          type: "linear",
          display: true,
          position: "right",
          title: {
            display: true,
            text: "Precipitation (mm)",
            font: { weight: "bold" },
            color: "rgba(59, 130, 246, 0.8)",
          },
          grid: { drawOnChartArea: false },
          suggestedMin: 0,
          suggestedMax: adjustMax(maxValues.precipitation, 1), // Nếu mưa = 1mm thì tăng lên 6mm
          ticks: { callback: (value) => value + " mm" },
        },

        y2: {
          // Gió (km/h)
          type: "linear",
          display: true,
          position: "right",
          title: {
            display: true,
            text: "Wind (km/h)",
            font: { weight: "bold" },
            color: "rgba(75, 192, 192, 1)",
          },
          grid: { drawOnChartArea: false },
          suggestedMin: 0,
          suggestedMax: adjustMax(maxValues.wind, 1), // Nếu gió = 1 km/h thì tối thiểu là 6 km/h
          ticks: { callback: (value) => value + " km/h" },
        },

        y3: {
          // Độ ẩm (%)
          type: "linear",
          display: true,
          position: "right",
          title: {
            display: true,
            text: "Humidity (%)",
            font: { weight: "bold" },
            color: "rgba(123, 104, 238, 1)",
          },
          grid: { drawOnChartArea: false },
          suggestedMin: 0,
          suggestedMax: adjustMax(maxValues.humidity, 5), // Độ ẩm sẽ không bị quá sát 100%
          ticks: { callback: (value) => value + "%" },
        },

        x: {
          // Trục thời gian
          display: true,
          grid: { display: false },
        },
      };

    }

    setChartData({ labels, datasets });
    setChartOptions(options);
  };

  const handleHourSelect = (hour) => {
    setSelectedHour(hour);
    updateRadarChart(hour);
  };

  const handleTabChange = (tab) => {
    setWeatherData({ ...weatherData, activeHourlyTab: tab });
    updateChart(weatherData.hourly, tab);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-2 sm:p-4 pb-8">
      {/* <sSelection.DevTool name="sLocation" />
      <sLocation.DevTool name="sLocation" /> */}
      {/* Header with current conditions */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              Weather Forecast
            </h1>
            <div className="flex items-center">
              <p className="text-gray-500 text-sm mr-2 h-6" style={{ alignContent: 'end' }}>
                {sLocation.value.countryName || "Loading location..."}
              </p>
              <Clock />
            </div>
          </div>
          {currentConditions && (
            <div className="flex items-center bg-gray-300 px-4 py-2 rounded-lg">
              <div className="mr-3">
                {getWeatherIcon(currentConditions.icon)}
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {currentConditions.temp}°C
                </div>
                <div className="text-sm text-gray-600 capitalize text-end">
                  {currentConditions.condition}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center">
          <span className="text-gray-700 text-sm mr-2">
            {sLocation.value.timezone && (
              <span>
                {sLocation.value.timezone.replace("_", " ").replace("/", ", ")}
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 min-h-[500px]">
        {/* Weather summary cards in top row */}
        {weatherData.hourly.length > 0 && (
          <>
            <div className="bg-white p-3 rounded-lg shadow-sm flex flex-col justify-between">
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Temperature
              </h3>
              <div className="text-lg font-bold text-gray-800">
                {Math.min(...weatherData.hourly.map((h) => h.temp))}° -{" "}
                {Math.max(...weatherData.hourly.map((h) => h.temp))}°C
              </div>
              <div className="text-xs text-gray-500">
                Average:{" "}
                {Math.round(
                  weatherData.hourly.reduce((sum, h) => sum + h.temp, 0) /
                    weatherData.hourly.length
                )}
                °C
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg shadow-sm flex flex-col justify-between">
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Precipitation
              </h3>
              <div className="text-lg font-bold text-gray-800">
                {weatherData.hourly.some((h) => h.precipitation > 0)
                  ? `${Math.max(
                      ...weatherData.hourly.map((h) => h.precipitation)
                    )} mm`
                  : "None"}
              </div>
              <div className="text-xs text-gray-500">
                {weatherData.hourly.filter((h) => h.precipitation > 0).length}{" "}
                hours with rain
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg shadow-sm flex flex-col justify-between">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Wind</h3>
              <div className="text-lg font-bold text-gray-800">
                {Math.max(...weatherData.hourly.map((h) => h.wind))} km/h
              </div>
              <div className="text-xs text-gray-500">
                Average:{" "}
                {Math.round(
                  weatherData.hourly.reduce((sum, h) => sum + h.wind, 0) /
                    weatherData.hourly.length
                )}{" "}
                km/h
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg shadow-sm flex flex-col justify-between">
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Humidity
              </h3>
              <div className="text-lg font-bold text-gray-800">
                {Math.round(
                  weatherData.hourly.reduce((sum, h) => sum + h.humidity, 0) /
                    weatherData.hourly.length
                )}
                %
              </div>
              <div className="text-xs text-gray-500">
                Range: {Math.min(...weatherData.hourly.map((h) => h.humidity))}%
                - {Math.max(...weatherData.hourly.map((h) => h.humidity))}%
              </div>
            </div>
          </>
        )}

        {/* Large chart section - spans 3 columns */}
        <div className="md:col-span-3 bg-white p-1 rounded-lg shadow-sm min-h-[500px] flex flex-col">
        <div className="flex flex-wrap justify-between items-center mb-4">
  <h2 className="text-lg font-medium text-gray-700 mb-2 pl-2 md:mb-0">
    Hourly Forecast
  </h2>
  
  {/* Desktop and tablet view */}
  <div className="hidden sm:flex flex-wrap gap-2">
    <button
      className={`px-3 py-1 text-xs rounded-full transition-colors ${
        weatherData.activeHourlyTab === "combined"
          ? "bg-blue-500 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
      onClick={() => handleTabChange("combined")}
    >
      Combined
    </button>
    <button
      className={`px-3 py-1 text-xs rounded-full transition-colors ${
        weatherData.activeHourlyTab === "temp"
          ? "bg-blue-500 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
      onClick={() => handleTabChange("temp")}
    >
      Temperature
    </button>
    <button
      className={`px-3 py-1 text-xs rounded-full transition-colors ${
        weatherData.activeHourlyTab === "precipitation"
          ? "bg-blue-500 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
      onClick={() => handleTabChange("precipitation")}
    >
      Precipitation
    </button>
    <button
      className={`px-3 py-1 text-xs rounded-full transition-colors ${
        weatherData.activeHourlyTab === "wind"
          ? "bg-blue-500 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
      onClick={() => handleTabChange("wind")}
    >
      Wind
    </button>
    <button
      className={`px-3 py-1 text-xs rounded-full transition-colors ${
        weatherData.activeHourlyTab === "humidity"
          ? "bg-blue-500 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
      onClick={() => handleTabChange("humidity")}
    >
      Humidity
    </button>
    <button
      className={`px-3 py-1 text-xs rounded-full transition-colors ${
        weatherData.activeHourlyTab === "pressure"
          ? "bg-blue-500 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
      onClick={() => handleTabChange("pressure")}
    >
      Pressure
    </button>
    <button
      className={`px-3 py-1 text-xs rounded-full transition-colors ${
        weatherData.activeHourlyTab === "uvi"
          ? "bg-blue-500 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
      onClick={() => handleTabChange("uvi")}
    >
      UV Index
    </button>
  </div>

  {/* Mobile dropdown */}
  <div className="sm:hidden w-full">
    <select 
      className="w-full p-2 text-sm bg-gray-100 rounded-lg border border-gray-300"
      value={weatherData.activeHourlyTab}
      onChange={(e) => handleTabChange(e.target.value)}
    >
      <option value="combined">Combined</option>
      <option value="temp">Temperature</option>
      <option value="precipitation">Precipitation</option>
      <option value="wind">Wind</option>
      <option value="humidity">Humidity</option>
      <option value="pressure">Pressure</option>
      <option value="uvi">UV Index</option>
    </select>
  </div>
</div>

          {/* Main chart - takes most of the space */}
          <div className="flex-grow">
            {chartData && <Bar options={chartOptions} data={chartData} />}
          </div>

          {/* Time selector - simplified horizontal view */}
          <div className="mt-4 pt-4 border-t">
            <div className="flex overflow-x-auto">
              {weatherData.hourly.map((hour, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 flex flex-col items-center p-2 rounded-lg cursor-pointer mr-3 ${
                    selectedHour && selectedHour.timestamp === hour.timestamp
                      ? "bg-blue-100 border border-blue-300"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleHourSelect(hour)}
                >
                  <div className="text-xs font-medium text-gray-800">
                    {hour.time}
                  </div>
                  <div className="my-1">{getWeatherIcon(hour.icon)}</div>
                  <div className="text-xs text-gray-500">{hour.temp}°</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side panel with detailed hourly data */}
        <div className="bg-white p-4 rounded-lg shadow-sm min-h-[500px]">
          <h3 className="text-md font-medium text-gray-700 mb-3">
            {selectedHour
              ? `Details for ${selectedHour.time}
              `
              : "Hourly Details"}
          </h3>

          {selectedHour ? (
            <>
         

              <div className="space-y-2">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-sm text-gray-600">Feels Like</span>
                  <span className="text-sm font-medium">
                    {selectedHour.feelsLike}°C
                  </span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-sm text-gray-600">Humidity</span>
                  <span className="text-sm font-medium">
                    {selectedHour.humidity}%
                  </span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-sm text-gray-600">Wind</span>
                  <span className="text-sm font-medium">
                    {selectedHour.wind} km/h
                  </span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-sm text-gray-600">Precipitation</span>
                  <span className="text-sm font-medium">
                    {selectedHour.precipitation} mm
                  </span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-sm text-gray-600">UV Index</span>
                  <span className="text-sm font-medium">
                    {selectedHour.uvi}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-sm text-gray-600">Pressure</span>
                  <span className="text-sm font-medium">
                    {selectedHour.pressure} hPa
                  </span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-sm text-gray-600">Visibility</span>
                  <span className="text-sm font-medium">
                    {selectedHour.visibility} km
                  </span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-sm text-gray-600">Cloud Cover</span>
                  <span className="text-sm font-medium">
                    {selectedHour.clouds}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Dew Point</span>
                  <span className="text-sm font-medium">
                    {selectedHour.dewPoint}°C
                  </span>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {/* Mini radar chart at bottom of sidebar */}
          {radarChartData && selectedHour && (
            <div className="mt-4 pt-1 border-t-2">
              {/* <h4 className="text-sm font-medium text-gray-600 mb-2">
                Weather Conditions
              </h4> */}
              <div className="h-96 w-full">
                <Radar
                  data={radarChartData}
                  options={radarChartOptions}
                  className=""
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherForecastChart;
