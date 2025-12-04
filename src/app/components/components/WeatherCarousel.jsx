import React, { useState, useEffect, useCallback } from "react";
import WeatherIcon from "./WeatherIcon";
import { weatherData } from "./WeatherData";
import CarouselStyles from "./CarouselStyles";
import axios from "axios";
import { sLocation } from "../../context/store";
import { sSelection } from "../../context/store";
import Loading from "../LoadingComponent/Loading";
import { openWeatherAPI, ipGeolocationAPI, temperatureUtils } from "../../../config/api.config";

// Import weather background images
import sunnyBg from "../../assets/carousel/sunny.avif";
import cloudyBg from "../../assets/carousel/cloudy.avif";
import rainnyBg from "../../assets/carousel/rainny.avif";

const WeatherCarousel = ({ onScrollWorldWeather, onScrollNews }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const convertKelvinToCelsius = useCallback((kelvin) => {
    return temperatureUtils.kelvinToCelsius(kelvin);
  }, []);

  // Function to get background image based on weather condition
  const getWeatherBackground = useCallback((weatherMain) => {
    if (!weatherMain) return sunnyBg; // Default to sunny
    
    const condition = weatherMain.toLowerCase();
    
    // Rain conditions
    if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('thunderstorm')) {
      return rainnyBg;
    }
    // Cloudy conditions
    else if (condition.includes('cloud') || condition.includes('mist') || condition.includes('fog') || condition.includes('haze')) {
      return cloudyBg;
    }
    // Clear/Sunny conditions
    else {
      return sunnyBg;
    }
  }, []);

  const formatTime = (timestamp) => {
    // Get the UTC timestamp
    const date = new Date(timestamp * 1000);
    
    // Apply the timezone offset from API
    const timezoneOffsetSeconds = sLocation.value.timezoneOffset || 0;
    const adjustedDate = new Date(date.getTime() + 
                               (timezoneOffsetSeconds * 1000) + 
                               (date.getTimezoneOffset() * 60 * 1000));
    
    const hours = adjustedDate.getHours();
    const minutes = adjustedDate.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;
  };

  const formatDate = (timestamp) => {
    // Get the UTC timestamp
    const date = new Date(timestamp * 1000);
    
    // Format the date in UTC
    const options = { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      timeZone: 'UTC'  // This forces the date to be displayed in UTC
    };
    
    return date.toLocaleDateString('en-US', options);
  };
  const getWeatherIcon = (iconCode) => {
    return (
      <img 
        src={openWeatherAPI.getIconUrl(iconCode)} 
        alt={`Weather condition: ${iconCode}`}
        width="100%" 
        height="100%"
        className="object-contain inline-block" 
      />
    );
  };
  
  useEffect(() => {
    const getIp = async () => {
      setIsLoading(true);
      try {
        // Get user IP address
        const ipResponse = await axios.get(ipGeolocationAPI.getIP());
        const userIp = ipResponse.data.ip;

        // Get location data from IP
        const locationResponse = await axios.get(
          ipGeolocationAPI.getLocationByIP(userIp)
        );
        console.log({locationResponse})
        const { latitude, longitude } = locationResponse.data;

        // Get weather data for the location
        const dataWeatherResponse = await axios.get(
          openWeatherAPI.getForecast(latitude, longitude)
        );
        console.log({dataWeatherResponse})

        sLocation.set((prev) => {
          prev.value.countryName = locationResponse.data.country_name;
          prev.value.lat = latitude;
          prev.value.lon = longitude;
          prev.value.timezone = dataWeatherResponse.data.timezone;
          prev.value.timezoneOffset = dataWeatherResponse.data.timezone_offset;
          prev.value.current = dataWeatherResponse.data.current;
          prev.value.hourly = dataWeatherResponse.data.hourly;
          prev.value.daily = dataWeatherResponse.data.daily;
          prev.value.code = locationResponse.data.country_code2;
          return prev;
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading weather data", error);
        
        // If IP Geolocation fails, use default location
        if (error.response?.status === 401) {
          console.warn('IP Geolocation API key invalid or missing. Using default location.');
          // Fetch weather for default location (Hanoi)
          try {
            const defaultWeatherResponse = await axios.get(
              openWeatherAPI.getForecast(21.0285, 105.8542)
            );
            
            sLocation.set((prev) => {
              prev.value.countryName = 'Vietnam';
              prev.value.lat = 21.0285;
              prev.value.lon = 105.8542;
              prev.value.timezone = defaultWeatherResponse.data.timezone;
              prev.value.timezoneOffset = defaultWeatherResponse.data.timezone_offset;
              prev.value.current = defaultWeatherResponse.data.current;
              prev.value.hourly = defaultWeatherResponse.data.hourly;
              prev.value.daily = defaultWeatherResponse.data.daily;
              prev.value.code = 'VN';
              return prev;
            });
          } catch (fallbackError) {
            console.error('Failed to load default weather data', fallbackError);
          }
        }
        
        setIsLoading(false);
      }
    };

    getIp();
  }, []);

  const currentWeather = weatherData[activeIndex];
  if (isLoading) return <Loading />;

  return (
    <>
     {/* <sLocation.DevTool name="sLocation" className="z-100 "/>
     <sSelection.DevTool name="sSelection" /> */}
      <div
        className={`w-full relative overflow-hidden shadow-2xl transition-shadow duration-300 slider ${!isTransitioning ? "active-slide" : ""}`}
        style={{ height: "100vh" }}
      >
        <div className="list">
          <div

            className={`item absolute inset-0 bg-cover bg-center transition-all duration-[1000ms] ease-in-out ${0 === activeIndex ? "active" : "opacity-0"}`}
            style={{

                backgroundImage: `url(${getWeatherBackground(sLocation.value.current?.weather?.[0]?.main)})`,
                filter: "brightness(0.8)", // Apply brightness filter
            }}
            
          >
            <div className="biggest h-screen px-32 pt-32 pb-10 flex flex-col lg:flex-row">

              {/* Left Side - Main Weather Info */}
              <div className="content-1 flex-1 flex flex-col justify-end text-white mb-6 sm:mb-8 lg:mb-0">
                {/* tên nước */}
                <div className="flex items-end gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <p className="uppercase tracking-[3px] xs:tracking-[5px] sm:tracking-[10px] md:tracking-[15px] text-sm xs:text-base sm:text-xl md:text-3xl lg:text-6xl font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    {sLocation.value.countryName}
                  </p>
                  <div className="relative mb-1 sm:mb-2 lg:mb-3 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded blur-sm group-hover:blur-md transition-all duration-300"></div>
                    <img 
                      className="relative w-6 h-4 sm:w-8 sm:h-6 md:w-10 md:h-7 lg:w-12 lg:h-8 object-cover rounded shadow-[0_2px_10px_rgba(0,0,0,0.5)] border-2 border-white/70 group-hover:border-white group-hover:shadow-[0_4px_20px_rgba(255,255,255,0.3)] group-hover:scale-105 transition-all duration-300" 
                      src={`https://flagcdn.com/w80/${sLocation.value.code.toLowerCase()}.png`}
                      alt={`${sLocation.value.countryName} flag`}
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* nhiệt độ */}
                <div className="flex gap-2 sm:gap-3 md:gap-6 mt-2 sm:mt-4">
                  <h2 className="text-[2.5rem] xs:text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[7rem] xl:text-[120px] m-0 leading-none mb-2 font-bold">
                    {convertKelvinToCelsius(sLocation.value.current?.temp)}°C
                  </h2>
                </div>
                
                {/* xác suất mưa */}
                {sLocation.value.hourly?.[0]?.pop > 0.2 && (
                  <p className="mt-2 sm:mt-3 md:mt-4 mb-2 sm:mb-3 md:mb-4 text-base sm:text-lg md:text-xl lg:text-2xl forecast-text text-white font-bold">
                    {`${sLocation.value.current?.weather?.[0]?.description} expected around ${formatTime(sLocation.value.hourly?.[0]?.dt)}`}
                  </p>
                )}
                
                {/* thời gian và ngày */}
                <p className="text-xs sm:text-sm md:text-base lg:text-lg flex items-center flex-wrap gap-1 sm:gap-2">
                  <span className="flex items-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z" />
                    </svg>
                    {formatTime(Date.now() / 1000)}
                  </span>
                  <span className="mx-1 sm:mx-2">|</span>
                  <span className="flex items-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1" />
                    </svg>
                    {formatDate(sLocation.value.current?.dt || Date.now() / 1000)}
                  </span>
                </p>
              </div>
              
              {/* Right Side - Forecast Cards */}
              <div className="content-2 w-full lg:w-1/2 flex flex-col justify-end gap-3 sm:gap-4 lg:gap-6">
                {/* Hourly Forecast Card */}
                <div className="content-2-1 text-white bg-black/20 backdrop-blur-sm rounded-xl p-2 sm:p-3 md:p-4">
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-2xl mb-1 sm:mb-2 md:mb-4">Hourly Forecast</h3>
                  <div className="w-full h-[1px] bg-white my-1 sm:my-2 md:my-4"></div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 sm:gap-2 md:gap-4">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex flex-col items-center">
                        <span className="text-xs sm:text-sm md:text-base lg:text-xl font-medium mb-0.5 sm:mb-1 text-center whitespace-nowrap ">
                          {i === 0
                            ? "Now"
                            : formatTime(sLocation.value.hourly?.[i]?.dt)}
                        </span>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mb-1 sm:mb-2">
                          {getWeatherIcon(sLocation.value.hourly?.[i]?.weather?.[0]?.icon || "01d")}
                        </div>
                        <span className="text-xs sm:text-sm md:text-lg lg:text-xl">
                          {convertKelvinToCelsius(
                            sLocation.value.hourly?.[i]?.temp
                          )}
                          °C
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="content-2-2 text-white bg-black/20 backdrop-blur-sm rounded-xl p-2 sm:p-3 md:p-4">
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-2xl mb-1 sm:mb-2 md:mb-4">5-Day Forecast</h3>
                  <div className="w-full h-[1px] bg-white my-1 sm:my-2 md:my-4"></div>

                  <div className=" items-center">
                    {sLocation.value.daily?.slice(0, 5).map((day, i) => (
                      <div key={i} className="flex items-center w-full sm:w-[100%] md:w-[100%] gap-1 p-3 xs:gap-2 sm:gap-4 md:gap-6 lg:gap-9">
                        <span className="text-xs sm:text-sm md:text-lg lg:text-xl w-8 xs:w-10 sm:w-12 md:w-16 text-white">
                          {i === 0
                            ? "Today"
                            : new Date(day.dt * 1000).toLocaleDateString(
                              "en-US",
                              { weekday: "short" }
                            )}
                        </span>

                        <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10">
                          {getWeatherIcon(day.weather[0]?.icon)}

                        </div>
                        <span className="text-xs sm:text-sm md:text-lg lg:text-xl w-6 xs:w-7 sm:w-8 md:w-10 inline-block mr-5">
                          {convertKelvinToCelsius(day.temp.min)}°C
                        </span>

                        <div className="flex-1 h-1 xs:h-1.5 sm:h-2 bg-gray-300/30 rounded-full">
                          <div
                            className="h-full rounded-full bg-blue-400 text-white text-[0px] xs:text-[8px] sm:text-xs flex items-center justify-center"
                            style={{
                              width: `${((day.temp.day - day.temp.min) / (day.temp.max - day.temp.min)) * 100}%`,
                            }}
                          >
                            <span className="">{(day.temp.day -273.15).toFixed(1)}°C</span>
                          </div>
                        </div>
                        <span className="text-xs sm:text-sm md:text-lg lg:text-xl w-6 xs:w-7 sm:w-8 md:w-10 text-right inline-block mr-5">
                          {convertKelvinToCelsius(day.temp.max)}°C
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <sLocation.DevTool name="sloca"/> */}

      <CarouselStyles />
    </>
  );
};

export default WeatherCarousel;
