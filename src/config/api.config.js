/**
 * API Configuration
 * Centralized configuration for all API endpoints and keys
 */

// API Keys
export const API_KEYS = {
  openWeather: import.meta.env.VITE_OPENWEATHER_API_KEY,
  ipGeolocation: import.meta.env.VITE_IPGEOLOCATION_API_KEY,
  googleMaps: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
};

// API Domains
export const API_DOMAINS = {
  openWeather: import.meta.env.VITE_OPENWEATHER_DOMAIN,
  ipGeolocation: import.meta.env.VITE_IPGEOLOCATION_DOMAIN,
  openWeatherIcon: import.meta.env.VITE_OPENWEATHER_ICON_DOMAIN,
};

// OpenWeatherMap API Endpoints
export const openWeatherAPI = {
  /**
   * Search cities by name
   * @param {string} query - City name to search
   * @returns {string} API endpoint URL
   */
  searchCity: (query) => {
    // Có thể dùng proxy nếu muốn ẩn API key (optional)
    const isDevelopment = import.meta.env.DEV;
    return isDevelopment
      ? `${API_DOMAINS.openWeather}/find?q=${query}&appid=${API_KEYS.openWeather}`
      : `/api/weather?type=search&q=${query}`;
  },
  
  /**
   * Get weather forecast by coordinates
   * @param {number} lat - Latitude
   * @param {number} lon - Longitude
   * @returns {string} API endpoint URL
   */
  getForecast: (lat, lon) => {
    // Có thể dùng proxy nếu muốn ẩn API key (optional)
    const isDevelopment = import.meta.env.DEV;
    return isDevelopment
      ? `${API_DOMAINS.openWeather}/onecall?lat=${lat}&lon=${lon}&appid=${API_KEYS.openWeather}`
      : `/api/weather?type=forecast&lat=${lat}&lon=${lon}`;
  },
  
  /**
   * Get weather icon URL
   * @param {string} iconCode - Weather icon code (e.g., "10d")
   * @returns {string} Icon URL
   */
  getIconUrl: (iconCode) => 
    `${API_DOMAINS.openWeatherIcon}/img/wn/${iconCode}@2x.png`,
  
  /**
   * Get country flag URL
   * @param {string} countryCode - Country code (e.g., "vn")
   * @returns {string} Flag URL
   */
  getFlagUrl: (countryCode) => 
    `${API_DOMAINS.openWeatherIcon}/images/flags/${countryCode}.png`,
};

// IP Geolocation API Endpoints
export const ipGeolocationAPI = {
  /**
   * Get user's IP address
   * @returns {string} API endpoint URL
   */
  getIP: () => {
    // Sử dụng Vercel Serverless Function khi deploy
    const isDevelopment = import.meta.env.DEV;
    return isDevelopment 
      ? `${API_DOMAINS.ipGeolocation}/getip`
      : '/api/getip';
  },
  
  /**
   * Get location data by IP address
   * @param {string} ip - IP address
   * @returns {string} API endpoint URL
   */
  getLocationByIP: (ip) => {
    // Sử dụng Vercel Serverless Function khi deploy
    const isDevelopment = import.meta.env.DEV;
    return isDevelopment
      ? `${API_DOMAINS.ipGeolocation}/ipgeo?apiKey=${API_KEYS.ipGeolocation}&ip=${ip}`
      : `/api/ipgeo?ip=${ip}`;
  },
};

// Google Maps Configuration
export const googleMapsConfig = {
  apiKey: API_KEYS.googleMaps,
  /**
   * Get Google Maps script URL
   * @param {string} callback - Callback function name
   * @returns {string} Script URL
   */
  getScriptUrl: (callback = 'initMap') => 
    `https://maps.googleapis.com/maps/api/js?key=${API_KEYS.googleMaps}&callback=${callback}`,
};

// Temperature Conversion Utilities
export const temperatureUtils = {
  /**
   * Convert Kelvin to Celsius
   * @param {number} kelvin - Temperature in Kelvin
   * @returns {string} Temperature in Celsius (formatted)
   */
  kelvinToCelsius: (kelvin) => 
    kelvin ? (kelvin - 273.15).toFixed(1) : '--',
};

export default {
  openWeatherAPI,
  ipGeolocationAPI,
  googleMapsConfig,
  temperatureUtils,
};
