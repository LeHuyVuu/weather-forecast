import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sLocation, sSelection } from "../../context/store";
import { worldWeatherData } from "./WeatherData";
const WorldWeather = ({ worldWeatherRef }) => {
  const [hoveredCountry, setHoveredCountry] = useState(null);
  return (
    <div
      ref={worldWeatherRef}
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white bg-opacity-80"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8 md:mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">
              World Weather Forecast
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm md:text-base font-medium">
              Explore weather conditions around the globe
            </p>
          </div>
          {/* <a
            href="#"
            className="mt-4 md:mt-0 group inline-flex items-center px-4 py-2 border border-blue-500 rounded-full text-sm font-medium text-blue-500 bg-white hover:bg-blue-500 hover:text-white transition-all duration-300"
          >
            MORE LOCATIONS
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a> */}
        </div>

        <div className="mb-6 sm:mb-8 relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-1">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl"></div>
          <div className="relative bg-white/90 backdrop-blur-md rounded-lg p-4 sm:p-6">
            <div className="flex items-center mb-2 sm:mb-4">
              <div className="bg-blue-100 rounded-full p-1.5 sm:p-2 mr-2 sm:mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-gray-700 text-sm sm:text-base font-medium">
                Select a country to view detailed weather information
              </p>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm ml-7 sm:ml-10">
              Our worldwide weather data is updated every 3 hours
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {worldWeatherData.map((country, index) => (
            <Link key={index} to={`/detail?search=${country.country}&lat=${country.lat}&lon=${country.lon}`}>
              <button
                className="group relative flex items-center justify-between w-full p-3 sm:p-4 md:p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden"
                onMouseEnter={() => setHoveredCountry(index)}
                onMouseLeave={() => setHoveredCountry(null)}
                onClick={() => {
                  sSelection.set(prev => {
                    prev.value.countryName = country.country;
                    prev.value.lat = country.lat;
                    prev.value.lon = country.lon;
                  });
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex items-center space-x-2 sm:space-x-3 relative z-10">
                  <span className=" sm:text-base text-gray-700 font-medium group-hover:text-blue-600 transition-colors duration-300">
                    {country.flag}
                  </span>
                  <span className="text-sm sm:text-base text-gray-700 font-medium group-hover:text-blue-600 transition-colors duration-300">
                    {country.country}
                  </span>
                </div>
                <div className="relative z-10 flex items-center">
                  <div
                    className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center bg-blue-100 group-hover:bg-blue-500 transition-colors duration-300 ${hoveredCountry === index ? "bg-blue-500" : ""}`}
                  >
                    <svg
                      className={`w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-gray-400 group-hover:text-white transition-colors duration-300 ${hoveredCountry === index ? "text-white" : ""}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div >
  );
};

export default WorldWeather;
