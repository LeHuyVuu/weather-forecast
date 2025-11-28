import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  FaCloud,
  FaCloudRain,
  FaWind,
  FaTint,
  FaAngleDoubleRight,
  FaSun,
} from "react-icons/fa";
import { sLocation } from "../../../context/store";
import "./weatherAnimations.css";
import React from "react";
import { Link } from "react-router-dom";
// const sLocationData = sLocation.use();
// kiểm tra xem một phần tử có nằm trong phạm vi nhìn thấy của màn hình hay không
const useIsInViewport = (ref) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  //   const humidityData = sLocationData.daily.map(day => day.pop);


  useEffect(() => {
    if (!ref.current) return;


    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.1 }
    );


    observer.observe(ref.current);


    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);


  return isIntersecting;
};


// Progress component with memo to prevent re-renders
const Progress = React.memo(({ value, className }) => {
  return (
    <div className={`h-1 rounded-full overflow-hidden ${className}`}>
      <div className="h-full bg-teal-400" style={{ width: `${value}%` }}></div>
    </div>
  );
});
Progress.displayName = "Progress";


// Weather info item component
const WeatherInfoItem = React.memo(({ icon: Icon, label }) => (
  <div className="flex items-center weather-info-item">
    <Icon className="text-white mr-3 opacity-80" />
    <span className="font-light">{label}</span>
  </div>
));
WeatherInfoItem.displayName = "WeatherInfoItem";


// Day tab component
const DayTab = React.memo(({ day, weekday, isSelected, position, onClick }) => {
  let tabClass = "";
  if (position === "before-selected") tabClass = "tab-before-selected";
  if (position === "after-selected") tabClass = "tab-after-selected";


  return (
    <div
      className={`relative w-full ${tabClass} day-tab ${
        isSelected ? "day-tab-active" : "bg-white opacity-60"
      }`}
    >
      <button
        className={`w-full text-left py-5 px-4 ${
          isSelected ? "bg-white text-black active" : "bg-white text-gray-600"
        } relative z-10 transition-all duration-300`}
        onClick={onClick}
        style={{ boxShadow: isSelected ? "" : "inset -10px 0 20px 5px #aaa" }}
      >
        <div className="text-sm font-medium">{day}</div>
        <div
          className={`text-xs mt-1 ${
            isSelected ? "text-gray-600" : "text-gray-500"
          }`}
        >
          {weekday}
        </div>
      </button>
    </div>
  );
});
DayTab.displayName = "DayTab";


// Time slider component
const TimeSlider = React.memo(
  ({ timeOptions, selectedTime, setSelectedTime }) => {
    // console.log("selected time", selectedTime);
    // console.log("timeOptions", timeOptions);
    // console.log("setSelectedTime", setSelectedTime);


    // Use refs and state that are properly referenced in JSX
    const sliderRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);


    // Get slider value based on selected time
    const getSliderValue = useCallback(() => {
      const index = timeOptions.indexOf(selectedTime);
      return index >= 0 ? (index / (timeOptions.length - 1)) * 100 : 50;
    }, [selectedTime, timeOptions]);


    // Handler for time slider change
    const handleTimeSliderChange = useCallback(
      (e) => {
        const value = parseInt(e.target.value);
        const index = Math.round((value / 100) * (timeOptions.length - 1));
        setSelectedTime(timeOptions[index]);
      },
      [timeOptions, setSelectedTime]
    );


    // Handle mouse down event
    const handleMouseDown = useCallback(() => {
      setIsDragging(true);
    }, []);


    // Handle mouse move event
    const handleMouseMove = useCallback(
      (e) => {
        if (!isDragging || !sliderRef.current) return;


        const sliderRect = sliderRef.current.getBoundingClientRect();
        const sliderWidth = sliderRect.width;


        // Calculate relative mouse position
        let offsetX = e.clientX - sliderRect.left;
        offsetX = Math.max(0, Math.min(offsetX, sliderWidth));


        // Convert position to percentage
        const percent = (offsetX / sliderWidth) * 100;


        // Update time value
        const index = Math.round((percent / 100) * (timeOptions.length - 1));
        setSelectedTime(timeOptions[index]);
      },
      [isDragging, timeOptions, setSelectedTime]
    );


    // Handle mouse up event
    const handleMouseUp = useCallback(() => {
      setIsDragging(false);
    }, []);


    // Add global event listeners for mouse drag
    useEffect(() => {
      if (isDragging) {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      }


      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }, [isDragging, handleMouseMove, handleMouseUp]);


    return (
      <div className="w-full py-4">
        <div className="relative">
          {/* Time labels */}
          <div className="flex justify-between text-xs text-white mt-2">
            {timeOptions.map((time, i) => (
              <div
                key={i}
                className={`${
                  selectedTime === time
                    ? "text-white opacity-100"
                    : "text-white/60"
                } transition-all duration-300 ${
                  isDragging ? "cursor-grabbing" : ""
                }`}
              >
                {time}
              </div>
            ))}
          </div>


          {/* Progress bar with thumb */}
          <div className="relative mt-4" ref={sliderRef}>
            <Progress value={getSliderValue()} className="bg-white/10" />


            {/* Thumb positioned over the progress bar */}
            <div
              className="slider-thumb absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md cursor-grab active:cursor-grabbing"
              style={{ left: `${getSliderValue()}%` }}
              onMouseDown={handleMouseDown}
            ></div>


            {/* Invisible range input for functionality */}
            <input
              type="range"
              min="0"
              max="100"
              value={getSliderValue()}
              onChange={handleTimeSliderChange}
              className="absolute inset-0 w-full h-8 opacity-0 cursor-pointer z-10"
            />
          </div>
        </div>
      </div>
    );
  }
);
TimeSlider.displayName = "TimeSlider";


// Temperature display component
const TemperatureDisplay = React.memo(
  ({ temperature, description, isChanging }) => (
    <div
      className="mb-6 animate-appear"
      style={{ textShadow: "1px 1px 4px #555" }}
    >
      <div
        className={`flex items-baseline temperature-display ${
          isChanging ? "changing" : ""
        }`}
      >
        <span className="text-8xl leading-none font-semi-bold">
          {temperature}
        </span>
        <span className="text-4xl ml-1 font-semi-bold">°C</span>
      </div>
      <div className="mt-2 text-lg font-light tracking-wide">
        {description.toUpperCase()}
      </div>
    </div>
  )
);
TemperatureDisplay.displayName = "TemperatureDisplay";


// Cloud animation component
const CloudAnimation = React.memo(() => (
  <div className="absolute right-0 top-0 w-64 h-full overflow-hidden">
    <div className="absolute top-12 right-12 float-slow opacity-80">
      <FaCloud className="text-white text-5xl" />
    </div>
    <div className="absolute top-32 right-4 float-medium opacity-90">
      <FaCloud className="text-white text-6xl" />
    </div>
    <div className="absolute bottom-24 right-20 float-fast opacity-70">
      <FaCloud className="text-white text-4xl" />
    </div>
  </div>
));
CloudAnimation.displayName = "CloudAnimation";


//import { useState, useEffect, useMemo } from 'react';
//import { Bar } from 'react-chartjs-2';
//import { FaCloud, FaCloudRain, FaSnowflake, FaSun, FaTint, FaWind } from 'react-icons/fa';
//import { sLocation } from '../../../context/store';
// import HorizontalScroll from '../../../components/SrollComponent/HorizontalScroll';


export default function RightBar() {
  const contentRef = useRef(null);
  const isInViewport = useIsInViewport(contentRef);
  const [selectedDay, setSelectedDay] = useState([0]);
  const [selectedTime, setSelectedTime] = useState("");
  const [isChangingTemp, setIsChangingTemp] = useState(false);
  const prevDayRef = useRef(selectedDay);


  // Get forecast data from signify store
  const forecastData = sLocation.value;
  console.log("Forecast data:", forecastData);


  // Format time similar to chart component
  const formatTime = (timestamp) => {
    // Get the UTC timestamp
    const date = new Date(timestamp * 1000);
    // Apply the timezone offset from API
    const timezoneOffsetSeconds = forecastData.timezoneOffset || 0;
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
  const convertMillisecondsToDateTime = useCallback((milliseconds) => {
    // Get the UTC timestamp
    const date = new Date(milliseconds * 1000); // Convert from seconds to milliseconds
   
    // Apply the timezone offset from API to be consistent with formatTime
    const timezoneOffsetSeconds = forecastData.timezoneOffset || 0;
    const adjustedDate = new Date(
      date.getTime() +
        timezoneOffsetSeconds * 1000 +
        date.getTimezoneOffset() * 60 * 1000
    );
   
    return {
      day: adjustedDate.getDate(),
      month: adjustedDate.toLocaleString("en-US", { month: "short" }),
      weekday: adjustedDate.toLocaleString("en-US", { weekday: "long" }).toUpperCase(),
    };
  }, [forecastData.timezoneOffset]);


  // Calculate time options based on the actual daily data from API
  const timeOptions = useMemo(() => {
    // Use consistent time parts based on the actual JSON structure
    return ["Morning", "Day", "Evening", "Night"];
  }, []);


  // Store mapping between displayed time and daily data parts
  const timeDataMapping = useMemo(() => {
    if (!forecastData.daily || forecastData.daily.length === 0) {
      return {};
    }
 
    // Create a mapping between day and its data
    const mapping = {};
    forecastData.daily.slice(0, 7).forEach((dayData) => {
      const dateInfo = convertMillisecondsToDateTime(dayData.dt);
      const displayDay = `${dateInfo.month} ${dateInfo.day.toString().padStart(2, "0")}`;
     
      // For each day, store different temperature parts exactly as in the JSON
      mapping[displayDay] = {
        Morning: {
          ...dayData,
          temp: dayData.temp.morn,
          feels_like: dayData.feels_like.morn
        },
        Day: {
          ...dayData,
          temp: dayData.temp.day,
          feels_like: dayData.feels_like.day
        },
        Evening: {
          ...dayData,
          temp: dayData.temp.eve,
          feels_like: dayData.feels_like.eve
        },
        Night: {
          ...dayData,
          temp: dayData.temp.night,
          feels_like: dayData.feels_like.night
        }
      };
    });
  console.log(mapping)
    return mapping;
  }, [forecastData.daily, convertMillisecondsToDateTime]);


  // Function to convert Kelvin to Celsius
  const convertKelvinToCelsius = useCallback((kelvin) => {
    return kelvin ? (kelvin - 273.15).toFixed(0) : "--";
  }, []);


  // Helper function to convert milliseconds to a full date-time string
 
  // Generate days array from API data
  const days = useMemo(() => {
    if (!forecastData.daily || forecastData.daily.length === 0) {
      return [
        { day: "Feb 01", weekday: "MONDAY" },
        { day: "Feb 02", weekday: "TUESDAY" },
        { day: "Feb 03", weekday: "WEDNESDAY" },
        { day: "Feb 04", weekday: "THURSDAY" },
        { day: "Feb 05", weekday: "FRIDAY" },
      ];
    }
    // const labels = sLocationData.daily.slice(0,7).map(day => convertMillisecondsToDateTime(day.dt));
    // const barChartData = useMemo(() => {
    //     return {
    //         labels: labels,
    //         datasets: [
    //             {
    //                 label: 'Probability of Precipitation (%)',
    //                 data: humidityData, // Dữ liệu % mưa
    //                 backgroundColor: 'rgba(54, 162, 235, 0.5)',
    //                 borderColor: 'rgba(54, 162, 235, 1)',
    //                 borderWidth: 1,
    //             },
    //         ],
    //     };
    // }, []);


    return forecastData.daily.slice(0, 7).map((dayData) => {
      const dateInfo = convertMillisecondsToDateTime(dayData.dt);
      return {
        day: `${dateInfo.month} ${dateInfo.day.toString().padStart(2, "0")}`,
        weekday: dateInfo.weekday,
        timestamp: dayData.dt,
        data: dayData,
      };
    });
  }, [forecastData.daily, convertMillisecondsToDateTime]);


  // Set initial selectedDay from API data when component mounts
  useEffect(() => {
    if (days.length > 0 && days[0].day) {
      setSelectedDay(days[0]?.day); // Default to first day
    }
  }, [days]);


  // Set initial selected time from the first available time option
  useEffect(() => {
    if (timeOptions.length > 0 && !selectedTime) {
      setSelectedTime(timeOptions[0]);
    }
  }, [timeOptions, selectedTime]);


  // Effect to handle temperature animation when data changes
  useEffect(() => {
    if (prevDayRef.current !== selectedDay) {
      setIsChangingTemp(true);
      const timer = setTimeout(() => {
        setIsChangingTemp(false);
      }, 500);
      prevDayRef.current = selectedDay;
      return () => clearTimeout(timer);
    }
  }, [selectedDay]);


  // Get selected day data
  const getSelectedDayData = useCallback(() => {
    // console.log("days:", days);
    // console.log("selectedDay:", selectedDay);
    // convertMillisecondsToDateTime(days[0].timestamp);
    const selectedDayObj = days.find((d) => d.day === selectedDay);
    if (!selectedDayObj) return null;
    return selectedDayObj.data;
  }, [days, selectedDay]);


  // Update getSelectedTimeData to add console log for debugging
  const getSelectedTimeData = useCallback(() => {
    if (!selectedDay || !selectedTime || !timeDataMapping[selectedDay]) {
      console.log("No data found for:", { selectedDay, selectedTime, mapping: timeDataMapping });
      return null;
    }
   
    const data = timeDataMapping[selectedDay][selectedTime];
    console.log("Selected time data:", data);
    return data;
  }, [selectedDay, selectedTime, timeDataMapping]);


  // Get combined weather data (using only daily data now)
  const weatherData = useMemo(() => {
    const dayData = getSelectedDayData();
    const timeData = getSelectedTimeData();


    if (!dayData) {
      console.log("No day data found");
      return {
        temperature: "--",
        description: "No data available",
        precipitation: "0%",
        wind: "0 km/h",
        humidity: "0%",
        feelsLike: "--",
        pressure: "0 hPa",
        uvIndex: "0.0"
      };
    }


    console.log("Day data:", dayData);
    console.log("Selected time data:", timeData);


    // Use the specific time of day data if available, otherwise use day average
    const temp = timeData ? timeData.temp : dayData.temp.day;
    const weatherDesc = dayData.weather[0].description;
    const windSpeed = dayData.wind_speed;
    const precipitationValue = dayData.pop;
    const humidityValue = dayData.humidity;
    const feelsLike = timeData ? timeData.feels_like : dayData.feels_like.day;


    const result = {
      temperature: convertKelvinToCelsius(temp),
      description: weatherDesc,
      precipitation: `${Math.round(precipitationValue * 100)}%`,
      wind: `${Math.round(windSpeed * 3.6)} km/h`, // Convert m/s to km/h
      humidity: `${humidityValue}%`,
      feelsLike: convertKelvinToCelsius(feelsLike),
      pressure: `${dayData.pressure} hPa`,
      uvIndex: dayData.uvi.toFixed(1)
    };
   
    console.log("Processed weather data:", result);
    return result;
  }, [getSelectedDayData, getSelectedTimeData, convertKelvinToCelsius]);


  // Get todays actual date for the header
  // const formattedDate = useMemo(() => {
  //   const today = new Date();
  //   return `${today.toLocaleString("en-US", {
  //     month: "short",
  //   })} ${today.getDate().toString().padStart(2, "0")}, ${today.toLocaleString(
  //     "en-US",
  //     { weekday: "long" }
  //   )}`;
  // }, []);


  // Get location name
  // const locationName = sLocationData.countryName || "";


  // Function to determine the tab position relative to the selected tab
  const getTabPosition = useCallback(
    (index) => {
      const selectedIndex = days.findIndex((d) => d.day === selectedDay);
      if (index === selectedIndex) return "selected";
      if (index === selectedIndex - 1) return "before-selected";
      if (index === selectedIndex + 1) return "after-selected";
      return "normal";
    },
    [days, selectedDay]
  );


  // Handle day selection
  const handleDaySelect = useCallback((day) => {
    setSelectedDay(day);
  }, []);


  // Add a delayed rendering optimization
  const [isFullyRendered, setIsFullyRendered] = useState(false);


  useEffect(() => {
    if (isInViewport && !isFullyRendered) {
      // Delay full rendering for better performance
      const timer = setTimeout(() => {
        setIsFullyRendered(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isInViewport, isFullyRendered]);


  // Show feels like temperature below the main display
  const FeelsLikeDisplay = React.memo(({ feelsLike }) => (
    <div className="text-sm opacity-80 mb-4">
      Feels like {feelsLike}°C
    </div>
  ));
  FeelsLikeDisplay.displayName = "FeelsLikeDisplay";


  // Add a debug section at the bottom of the component to verify data is correct
  const DebugInfo = ({ isVisible, data }) => {
    if (!isVisible) return null;
   
    return (
      <div className="mt-4 p-2 bg-black/30 rounded text-xs text-white/70 font-mono">
        <div>Selected Day: {selectedDay}</div>
        <div>Selected Time: {selectedTime}</div>
        <div>Temperature: {data.temperature}°C (should be {convertKelvinToCelsius(getSelectedDayData()?.temp[selectedTime.toLowerCase()])}°C)</div>
        <div>Description: {data.description}</div>
        <div>Feels Like: {data.feelsLike}°C</div>
      </div>
    );
  };


  return (
    <>
      {/* Full app container with window chrome */}
      <div className="relative p-6 rounded-xl overflow-hidden shadow-2xl w-full flex flex-col rightcontent">
        {/* <div className=" py-3 bg-white/50 border border-gray-200 rounded-xl px-4 flex items-center">
          <div className="ml-8">
            <h2 className="text-lg font-semibold text-gray-800">
              {locationName}
            </h2>
            <p className="text-xs text-gray-500">{formattedDate}</p>
          </div>
        </div> */}


        {/* Weather forecast container */}
        <div
          className="flex relative rounded-tl-[12px] rounded-tr-[12px] overflow-hidden"
          ref={contentRef}
        >
          {/* Left sidebar with days */}
          <div className="overflow-visible z-20">
            {days.map((dayInfo, index) => {
              const position = getTabPosition(index);
              return (
                <DayTab
                  key={index}
                  day={dayInfo.day}
                  weekday={dayInfo.weekday}
                  isSelected={dayInfo.day === selectedDay}
                  position={position}
                  onClick={() => handleDaySelect(dayInfo.day)}
                />
              );
            })}
          </div>


          {/* Main purple content area */}
          <div
            className={`flex-1 bg-gradient-to-br from-gray-400 to-gray-300 animated-gradient relative overflow-hidden ${
              isFullyRendered ? "fully-rendered" : "pre-rendered"
            }`}
          >
            {/* Background circular gradients */}
            <div className="absolute bottom-0 left-40 w-96 h-96 rounded-full bg-gray-700/30 blur-xl transform translate-x-1/4 -translate-y-1/4"></div>
            <div className="absolute top-60 right-0  w-80 h-80 rounded-full bg-gray-600/30 blur-xl transform -translate-x-1/3 translate-y-1/4"></div>


            {/* Main content area */}
            <div className="p-8 text-white z-10 relative h-full flex flex-col justify-between pt-12">
              <div className="flex flex-col ">
                <TemperatureDisplay
                  temperature={weatherData.temperature}
                  description={weatherData.description}
                  isChanging={isChangingTemp}
                />
                <FeelsLikeDisplay feelsLike={weatherData.feelsLike} />


                <div className="flex flex-col space-y-2 mb-6">
                  <WeatherInfoItem
                    icon={FaCloudRain}
                    label={`${weatherData.precipitation} Precipitation`}
                  />
                  <WeatherInfoItem
                    icon={FaWind}
                    label={`${(weatherData.wind)} Wind`}
                  />
                  <WeatherInfoItem
                    icon={FaTint}
                    label={`${weatherData.humidity} Humidity`}
                  />
                  <WeatherInfoItem
                    icon={FaSun} // You'd need to import FaSun from react-icons/fa
                    label={` ${weatherData.uvIndex} UV Index`}
                  />
                </div>
              </div>
              <div>
                <div className="italic text-sm text-white opacity-80 font-light">
                  <q>
                    Life is not about waiting for the storm to pass, it is about
                    Learning To Dance In The Rain
                  </q>
                </div>


                {/* <TimeSlider
                  timeOptions={timeOptions}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                /> */}


                {/* <WeatherInfoItem
      icon={FaTint} // Choose appropriate icon
      label={`Feels like ${weatherData.feelsLike}°C`}
    /> */}
                {/* Add debug information - set to true during development, false in production */}
                {/* <DebugInfo isVisible={false} data={weatherData} /> */}
              </div>
            </div>


            {/* Cloud animation component - only render when in viewport */}
            {isInViewport && <CloudAnimation />}
          </div>
          {/* <Link
            to="/chart"
            className="chart-link-container flex flex-col items-center justify-center bg-gray-900 hover:bg-gray-200 transition-all duration-300 w-[60px] border-l border-gray-200"
          >
            <div className="chart-link-icon text-white text-2xl mb-2 transform transition-transform duration-300 hover:translate-x-1">
              <FaAngleDoubleRight />
            </div>
            <div className="chart-link-text text-xs font-medium text-white rotate-90 mt-2">
              CHART
            </div>
          </Link> */}
        </div>


        <Link
          to="/chart"
          className="bg-slate-300 bg-opacity-60 rounded-bl-[12px] rounded-br-[12px]"
        >
          <div className="detailrow my-[19px] flex justify-center items-center font-bold">
            <p>MORE DETAIL</p>
            <FaAngleDoubleRight />
          </div>
        </Link>
      </div>
    </>
  );
}



