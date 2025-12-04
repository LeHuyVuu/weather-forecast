/**
 * Vercel Serverless Function - OpenWeather API Proxy
 * Proxy để tránh expose API key và bypass CORS
 */

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { type, lat, lon, q } = req.query;

  if (!type) {
    return res.status(400).json({ error: 'Type parameter is required' });
  }

  try {
    const API_KEY = process.env.VITE_OPENWEATHER_API_KEY;
    const API_DOMAIN = process.env.VITE_OPENWEATHER_DOMAIN;

    let url;

    // Xác định endpoint dựa vào type
    switch (type) {
      case 'forecast':
        if (!lat || !lon) {
          return res.status(400).json({ error: 'lat and lon are required for forecast' });
        }
        url = `${API_DOMAIN}/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
        break;

      case 'search':
        if (!q) {
          return res.status(400).json({ error: 'q parameter is required for search' });
        }
        url = `${API_DOMAIN}/find?q=${q}&appid=${API_KEY}`;
        break;

      default:
        return res.status(400).json({ error: 'Invalid type parameter' });
    }

    // Gọi OpenWeather API từ server-side
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}
