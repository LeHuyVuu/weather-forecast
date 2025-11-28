import React, { useEffect, useState } from 'react';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { useSearchParams } from 'react-router-dom';

import Space from '../../components/Earth/Space.jsx';
import LeftBar from './partials/LeftBar.jsx';
import RightBar from './partials/RightBar.jsx';
import useFetch from '../../hooks/useFetch.jsx';
import api from '../../../settings/api.jsx';
import { sLocation } from '../../context/store.js';

import './DetailWeather.css';
import axios from 'axios';
import Loading from '../../components/LoadingComponent/Loading.jsx';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DetailWeather() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(true); // New state for notification visibility
  
  const search = searchParams.get('search');
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const data = sLocation.use();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (data.countryName !== search) {
      const fetchWeatherData = async () => {
        try {
          const dataWeatherResponse = await axios.get(api.apiForecast(lat, lon), {
            signal: signal
          });

          console.log({ dataWeatherResponse });

          sLocation.set((prev) => {
            prev.value.countryName = search;
            prev.value.lat = lat;
            prev.value.lon = lon;
            prev.value.timezone = dataWeatherResponse.data.timezone;
            prev.value.timezoneOffset = dataWeatherResponse.data.timezone_offset;
            prev.value.current = dataWeatherResponse.data.current;
            prev.value.hourly = dataWeatherResponse.data.hourly;
            prev.value.daily = dataWeatherResponse.data.daily;
            return prev;
          });

          setIsLoading(false);
          setShowNotification(true); // Show notification when loading finishes
          timeout = setTimeout(() => {
            setShowNotification(false); // Hide notification after 4 seconds
          }, 3000);
        } catch (error) {
          setIsLoading(false);
        }
      };

      setIsLoading(true);
      fetchWeatherData();
    } else {
      setIsLoading(false);
    }

    return () => {
      controller.abort();
    };
  }, [lat, lon, search, data.countryName]);

  return (
    <div className="relative bg-cover bg-center min-h-screen" style={{ backgroundImage: 'url("https://images.pexels.com/photos/1146134/pexels-photo-1146134.jpeg?cs=srgb&dl=pexels-felixmittermeier-1146134.jpg&fm=jpg")' }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="mx-auto py-20 px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 contentcontainer">

          <LeftBar />
          <div className="flex justify-center items-center w-full z-1">
            <Space />
          </div>
          <RightBar />
          {showNotification && !isLoading && (
            <div className="fixed bottom-5 right-5 px-6 py-3 bg-green-500 text-white text-lg font-medium rounded-lg shadow-lg animate-pulse z-50 notification-enter">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Weather data for {sLocation.value.countryName} updated!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
