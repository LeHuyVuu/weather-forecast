import { cache } from "react";
import { signify } from "react-signify";

export const sLocation = signify({
    code: "",
    countryName: "",
    lat: 0, // Latitude set to 0
    lon: 0, // Longitude set to 0
    timezone: "", // Timezone set to an empty string
    timezoneOffset: 0, // Timezone offset set to 0
    current: {
        temp: 0, // Current temperature set to 0
        feels_like: 0, // Feels like temperature set to 0
        pressure: 0, // Atmospheric pressure set to 0
        humidity: 0, // Humidity set to 0
        dew_point: 0, // Dew point temperature set to 0
        uvi: 0, // UV Index set to 0
        clouds: 0, // Cloud coverage set to 0
        visibility: 0, // Visibility set to 0
        wind_speed: 0, // Wind speed set to 0
        wind_deg: 0, // Wind direction set to 0
        wind_gust: 0, // Wind gust set to 0
        weather: {
            main: "", // Weather main description set to empty string
            description: "", // Weather description set to empty string
            icon: "", // Weather icon code set to empty string
            id: 0
        },
        sunrise: 0, // Sunrise time set to 0
        sunset: 0, // Sunset time set to 0
    },
    minutely: [
        { dt: 0, precipitation: 0 }, // Precipitation set to 0
    ],
    hourly: [
        {
            dt: 0, // Hour timestamp set to 0
            temp: 0, // Hourly temperature set to 0
            feels_like: 0, // Hourly feels like temperature set to 0
            pressure: 0, // Hourly pressure set to 0
            humidity: 0, // Hourly humidity set to 0
            dew_point: 0, // Hourly dew point temperature set to 0
            uvi: 0, // Hourly UV Index set to 0
            clouds: 0, // Hourly cloud coverage set to 0
            visibility: 0, // Hourly visibility set to 0
            wind_speed: 0, // Hourly wind speed set to 0
            wind_deg: 0, // Hourly wind direction set to 0
            wind_gust: 0, // Hourly wind gust set to 0
            weather: [
                {
                    id: 0, // Weather id set to 0
                    main: "", // Weather main description set to empty string
                    description: "", // Weather description set to empty string
                    icon: "", // Weather icon set to empty string
                },
            ],
            pop: 0, // Probability of precipitation set to 0
        },
    ],
    daily: [
        {
            dt: 0, // Day timestamp set to 0
            sunrise: 0, // Sunrise time set to 0
            sunset: 0, // Sunset time set to 0
            moonrise: 0, // Moonrise time set to 0
            moonset: 0, // Moonset time set to 0
            moon_phase: 0, // Moon phase set to 0
            temp: {
                day: 0, // Day temperature set to 0
                min: 0, // Min temperature set to 0
                max: 0, // Max temperature set to 0
                night: 0, // Night temperature set to 0
                eve: 0, // Evening temperature set to 0
                morn: 0, // Morning temperature set to 0
            },
            feels_like: {
                day: 0, // Day feels like temperature set to 0
                night: 0, // Night feels like temperature set to 0
                eve: 0, // Evening feels like temperature set to 0
                morn: 0, // Morning feels like temperature set to 0
            },
            pressure: 0, // Pressure set to 0
            humidity: 0, // Humidity set to 0
            dew_point: 0, // Dew point temperature set to 0
            wind_speed: 0, // Wind speed set to 0
            wind_deg: 0, // Wind direction set to 0
            wind_gust: 0, // Wind gust set to 0
            weather: [
                {
                    id: 0, // Weather id set to 0
                    main: "", // Weather main description set to empty string
                    description: "", // Weather description set to empty string
                    icon: "", // Weather icon set to empty string
                },
            ],
            clouds: 0, // Cloud coverage set to 0
            pop: 0, // Probability of precipitation set to 0
            rain: 0, // Rainfall set to 0
            uvi: 0, // UV index set to 0
        },
    ],
});




export const sSelection = signify({
    countryName: "",
    lat: 0, // Latitude set to 0
    lon: 0, // Longitude set to 0
}, {
    cache: {
        key: 'selection',
    },
});