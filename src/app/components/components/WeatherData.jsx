// Weather data for the application
export const weatherData = [
  {
    temperature: 23,
    location: "Watermelon Park",
    time: "10:43",
    coordinates: "H:32° L:18°",
    forecast: "Thunderstorms expected around 00:00",
    condition: "rain",
    background:
      "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    hourlyForecast: [
      { hour: "Now", temp: "23°C", icon: "rain" },
      { hour: "00", temp: "21°C", icon: "rain" },
      { hour: "01", temp: "20°C", icon: "rain" },
      { hour: "02", temp: "20°C", icon: "rain" },
      { hour: "03", temp: "23°C", icon: "rain" },
      { hour: "04", temp: "23°C", icon: "rain" },
    ],
    fiveDayForecast: [
      { day: "Today", low: "18°C", high: "32°C", icon: "rain" },
      { day: "Thu", low: "20°C", high: "29°C", icon: "rain" },
      { day: "Fri", low: "23°C", high: "31°C", icon: "partly-cloudy" },
      { day: "Sat", low: "22°C", high: "29°C", icon: "cloudy" },
      { day: "Sun", low: "23°C", high: "33°C", icon: "partly-cloudy" },
    ],
  }
];

// World weather data
export const worldWeatherData = [
  { country: "Vietnam", flag: "🇻🇳", lat: "14.0583", lon: "108.2772" }, // Vietnam
  { country: "Bangkok", flag: "🇹🇭", lat: "13.7563", lon: "100.5018" }, // Bangkok, Thailand
  { country: "Indonesia", flag: "🇮🇩", lat: "-0.7893", lon: "113.9213" }, // Indonesia
  { country: "Kuala Lumpur", flag: "🇲🇾", lat: "3.1390", lon: "101.6869" }, // Kuala Lumpur, Malaysia
  { country: "Singapore", flag: "🇸🇬", lat: "1.3521", lon: "103.8198" }, // Singapore

  { country: "Myanmar", flag: "🇲🇲", lat: "21.9139", lon: "95.9560" }, // Myanmar
  { country: "New York", flag: "🇺🇸", lat: "40.7128", lon: "-74.0060" },
  { country: "Berlin", flag: "🇩🇪", lat: "52.5200", lon: "13.4050" }
];

