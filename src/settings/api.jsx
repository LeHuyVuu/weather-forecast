/**
 * @deprecated This file is deprecated. Please use src/config/api.config.js instead
 * Keeping for backward compatibility
 */
import { openWeatherAPI } from '../config/api.config';

export default {
    apiCity: (search) => openWeatherAPI.searchCity(search),
    apiForecast: (Latitude, Longitude) => openWeatherAPI.getForecast(Latitude, Longitude),   
}
