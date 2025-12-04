/**
 * Vercel Serverless Function - Get User IP
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

  try {
    // Lấy IP từ request headers
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded ? forwarded.split(',')[0] : req.socket.remoteAddress;

    // Trả về IP
    res.status(200).json({ ip });
  } catch (error) {
    console.error('Error getting IP:', error);
    res.status(500).json({ error: 'Failed to get IP address' });
  }
}
