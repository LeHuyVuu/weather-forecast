/**
 * Dynamic Sitemap Generator for Weather Forecast Application
 * 
 * This script generates a sitemap with dynamic locations based on popular cities
 * Run this script when you want to update the sitemap with new locations
 * 
 * Usage: node generateSitemap.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://weather.boversal.id.vn';
const OUTPUT_PATH = path.join(__dirname, '../public/sitemap.xml');

// Popular cities to include in sitemap
const popularLocations = [
  // Vietnam
  { name: 'Vietnam', priority: 0.9 },
  { name: 'Ho Chi Minh City', priority: 0.8 },
  { name: 'Hanoi', priority: 0.8 },
  { name: 'Da Nang', priority: 0.8 },
  { name: 'Nha Trang', priority: 0.7 },
  { name: 'Hue', priority: 0.7 },
  { name: 'Can Tho', priority: 0.7 },
  
  // Asia
  { name: 'Tokyo', priority: 0.7 },
  { name: 'Seoul', priority: 0.7 },
  { name: 'Bangkok', priority: 0.7 },
  { name: 'Singapore', priority: 0.7 },
  { name: 'Beijing', priority: 0.7 },
  { name: 'Shanghai', priority: 0.7 },
  { name: 'Hong Kong', priority: 0.7 },
  { name: 'Manila', priority: 0.7 },
  { name: 'Jakarta', priority: 0.7 },
  { name: 'Kuala Lumpur', priority: 0.7 },
  
  // Americas
  { name: 'New York', priority: 0.7 },
  { name: 'Los Angeles', priority: 0.7 },
  { name: 'San Francisco', priority: 0.7 },
  { name: 'Chicago', priority: 0.7 },
  { name: 'Miami', priority: 0.7 },
  { name: 'Toronto', priority: 0.7 },
  { name: 'Mexico City', priority: 0.7 },
  { name: 'São Paulo', priority: 0.7 },
  
  // Europe
  { name: 'London', priority: 0.7 },
  { name: 'Paris', priority: 0.7 },
  { name: 'Berlin', priority: 0.7 },
  { name: 'Rome', priority: 0.7 },
  { name: 'Madrid', priority: 0.7 },
  { name: 'Amsterdam', priority: 0.7 },
  { name: 'Barcelona', priority: 0.7 },
  
  // Oceania
  { name: 'Sydney', priority: 0.7 },
  { name: 'Melbourne', priority: 0.7 },
  { name: 'Auckland', priority: 0.7 },
  
  // Middle East & Africa
  { name: 'Dubai', priority: 0.7 },
  { name: 'Cairo', priority: 0.7 },
  { name: 'Cape Town', priority: 0.7 },
];

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

  <!-- Homepage -->
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Weather Forecast Page -->
  <url>
    <loc>${SITE_URL}/weather-forecast</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Detail Weather Page (generic) -->
  <url>
    <loc>${SITE_URL}/detail-weather</loc>
    <lastmod>${today}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>0.8</priority>
  </url>

`;

  // Add location-specific pages
  popularLocations.forEach(location => {
    const encodedName = encodeURIComponent(location.name);
    sitemap += `  <!-- ${location.name} -->
  <url>
    <loc>${SITE_URL}/detail-weather?search=${encodedName}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>${location.priority}</priority>
  </url>

`;
  });

  sitemap += `</urlset>`;

  // Write to file
  fs.writeFileSync(OUTPUT_PATH, sitemap);
  console.log(`✅ Sitemap generated successfully at ${OUTPUT_PATH}`);
  console.log(`📊 Total URLs: ${3 + popularLocations.length}`);
}

// Run the generator
try {
  generateSitemap();
} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}
