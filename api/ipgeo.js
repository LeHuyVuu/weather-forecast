/**
 * Vercel Serverless Function - IP Geolocation
 * Proxy để bypass CORS khi gọi IP Geolocation API
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

  const { ip } = req.query;

  if (!ip) {
    return res.status(400).json({ error: 'IP parameter is required' });
  }

  try {
    const API_KEY = process.env.VITE_IPGEOLOCATION_API_KEY;
    const API_DOMAIN = process.env.VITE_IPGEOLOCATION_DOMAIN;

    // Gọi IP Geolocation API từ server-side
    const response = await fetch(
      `${API_DOMAIN}/ipgeo?apiKey=${API_KEY}&ip=${ip}`
    );

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching geolocation:', error);
    res.status(500).json({ error: 'Failed to fetch geolocation data' });
  }
}
