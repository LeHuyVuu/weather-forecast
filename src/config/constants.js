/**
 * Application Constants
 * Centralized constants for the weather forecast application
 */

// Weather Condition Codes (from OpenWeatherMap)
export const WEATHER_CONDITIONS = {
  CLEAR: '01',
  FEW_CLOUDS: '02',
  SCATTERED_CLOUDS: '03',
  BROKEN_CLOUDS: '04',
  SHOWER_RAIN: '09',
  RAIN: '10',
  THUNDERSTORM: '11',
  SNOW: '13',
  MIST: '50',
};

// Time Formats
export const TIME_FORMATS = {
  HOUR_12: 'h:mm A',
  HOUR_24: 'HH:mm',
  DATE_SHORT: 'MMM DD',
  DATE_LONG: 'MMMM DD, YYYY',
  WEEKDAY: 'ddd',
  WEEKDAY_LONG: 'dddd',
};

// Temperature Units
export const TEMPERATURE_UNITS = {
  CELSIUS: '°C',
  FAHRENHEIT: '°F',
  KELVIN: 'K',
};

// API Rate Limits (per minute)
export const API_RATE_LIMITS = {
  OPENWEATHER: 60,
  IPGEOLOCATION: 50,
  GOOGLE_MAPS: 60,
};

// Cache Duration (in milliseconds)
export const CACHE_DURATION = {
  CURRENT_WEATHER: 10 * 60 * 1000, // 10 minutes
  FORECAST: 60 * 60 * 1000,        // 1 hour
  USER_LOCATION: 24 * 60 * 60 * 1000, // 24 hours
};

// Default Values
export const DEFAULTS = {
  LATITUDE: 21.0285,   // Hanoi
  LONGITUDE: 105.8542, // Hanoi
  COUNTRY: 'Vietnam',
  TIMEZONE: 'Asia/Ho_Chi_Minh',
};

// Chart Configuration
export const CHART_CONFIG = {
  COLORS: {
    TEMPERATURE: 'rgba(255, 99, 132, 1)',
    HUMIDITY: 'rgba(54, 162, 235, 1)',
    PRESSURE: 'rgba(255, 206, 86, 1)',
    WIND: 'rgba(75, 192, 192, 1)',
  },
  MAX_DATA_POINTS: 24,
};

// Responsive Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  XS: 475,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
};

// Animation Durations (in milliseconds)
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000,
};

// Error Messages
export const ERROR_MESSAGES = {
  API_KEY_MISSING: 'API key is missing. Please check your .env file.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  LOCATION_ERROR: 'Unable to get your location. Please try again.',
  WEATHER_DATA_ERROR: 'Unable to fetch weather data. Please try again.',
  INVALID_COORDINATES: 'Invalid coordinates provided.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOCATION_FOUND: 'Location found successfully!',
  WEATHER_UPDATED: 'Weather data updated!',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  USER_LOCATION: 'weather_user_location',
  FAVORITE_CITIES: 'weather_favorite_cities',
  LAST_SEARCH: 'weather_last_search',
  THEME_PREFERENCE: 'weather_theme',
  UNIT_PREFERENCE: 'weather_unit',
};

// Route Paths
export const ROUTES = {
  HOME: '/',
  DETAIL: '/detail',
  FORECAST: '/forecast',
  NOT_FOUND: '/404',
};

// Weather Severity Levels
export const SEVERITY_LEVELS = {
  LOW: 'low',
  MODERATE: 'moderate',
  HIGH: 'high',
  EXTREME: 'extreme',
};

// Wind Speed Categories (in m/s)
export const WIND_SPEED = {
  CALM: { max: 0.5, label: 'Calm' },
  LIGHT_AIR: { max: 1.5, label: 'Light Air' },
  LIGHT_BREEZE: { max: 3.3, label: 'Light Breeze' },
  GENTLE_BREEZE: { max: 5.5, label: 'Gentle Breeze' },
  MODERATE_BREEZE: { max: 7.9, label: 'Moderate Breeze' },
  FRESH_BREEZE: { max: 10.7, label: 'Fresh Breeze' },
  STRONG_BREEZE: { max: 13.8, label: 'Strong Breeze' },
  NEAR_GALE: { max: 17.1, label: 'Near Gale' },
  GALE: { max: 20.7, label: 'Gale' },
  STRONG_GALE: { max: 24.4, label: 'Strong Gale' },
  STORM: { max: 28.4, label: 'Storm' },
  VIOLENT_STORM: { max: 32.6, label: 'Violent Storm' },
  HURRICANE: { max: Infinity, label: 'Hurricane' },
};

// UV Index Categories
export const UV_INDEX = {
  LOW: { max: 2, label: 'Low', color: 'green' },
  MODERATE: { max: 5, label: 'Moderate', color: 'yellow' },
  HIGH: { max: 7, label: 'High', color: 'orange' },
  VERY_HIGH: { max: 10, label: 'Very High', color: 'red' },
  EXTREME: { max: Infinity, label: 'Extreme', color: 'purple' },
};

// Air Quality Index (AQI) Categories
export const AQI_CATEGORIES = {
  GOOD: { max: 50, label: 'Good', color: 'green' },
  MODERATE: { max: 100, label: 'Moderate', color: 'yellow' },
  UNHEALTHY_SENSITIVE: { max: 150, label: 'Unhealthy for Sensitive Groups', color: 'orange' },
  UNHEALTHY: { max: 200, label: 'Unhealthy', color: 'red' },
  VERY_UNHEALTHY: { max: 300, label: 'Very Unhealthy', color: 'purple' },
  HAZARDOUS: { max: Infinity, label: 'Hazardous', color: 'maroon' },
};

export default {
  WEATHER_CONDITIONS,
  TIME_FORMATS,
  TEMPERATURE_UNITS,
  API_RATE_LIMITS,
  CACHE_DURATION,
  DEFAULTS,
  CHART_CONFIG,
  BREAKPOINTS,
  ANIMATION_DURATION,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  STORAGE_KEYS,
  ROUTES,
  SEVERITY_LEVELS,
  WIND_SPEED,
  UV_INDEX,
  AQI_CATEGORIES,
};
