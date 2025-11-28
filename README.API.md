# 🔑 API Configuration Guide

## Tổng Quan

Project này sử dụng **3 API providers** sau:

### 1. 🌤️ OpenWeatherMap API
- **Mục đích**: Dự báo thời tiết theo vị trí
- **Website**: https://openweathermap.org/api
- **Đăng ký**: https://home.openweathermap.org/users/sign_up
- **Free Tier**: 
  - 1,000 API calls/day
  - 60 calls/minute
  - Current weather, 5-day forecast, weather alerts

### 2. 📍 IP Geolocation API
- **Mục đích**: Lấy vị trí địa lý của người dùng từ IP address
- **Website**: https://ipgeolocation.io/
- **Đăng ký**: https://ipgeolocation.io/signup.html
- **Free Tier**:
  - 1,000 requests/day
  - IP geolocation, timezone, currency

### 3. 🗺️ Google Maps API
- **Mục đích**: Hiển thị bản đồ và chọn vị trí
- **Website**: https://console.cloud.google.com/
- **Đăng ký**: https://developers.google.com/maps/documentation/javascript/get-api-key
- **Free Tier**:
  - $200 free credit mỗi tháng
  - ~28,500 map loads miễn phí

---

## 📦 Setup Instructions

### Bước 1: Clone và Install Dependencies
```bash
git clone <repository-url>
cd weather-forecast-react
npm install
```

### Bước 2: Tạo File .env
Sao chép file `.env.example` thành `.env`:
```bash
cp .env.example .env
```

### Bước 3: Lấy API Keys

#### 🌤️ OpenWeatherMap API Key
1. Truy cập: https://home.openweathermap.org/users/sign_up
2. Đăng ký tài khoản miễn phí
3. Xác nhận email
4. Vào **API keys** tab
5. Copy API key và paste vào `.env`:
```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

#### 📍 IP Geolocation API Key
1. Truy cập: https://ipgeolocation.io/signup.html
2. Đăng ký tài khoản miễn phí
3. Login và vào Dashboard
4. Copy API key và paste vào `.env`:
```env
VITE_IPGEOLOCATION_API_KEY=your_api_key_here
```

#### 🗺️ Google Maps API Key
1. Truy cập: https://console.cloud.google.com/
2. Tạo project mới hoặc chọn project có sẵn
3. Enable **Maps JavaScript API**
4. Vào **Credentials** → **Create Credentials** → **API Key**
5. (Optional) Restrict API key để bảo mật:
   - Application restrictions: HTTP referrers
   - Add your domain: `localhost:5173/*`, `yourdomain.com/*`
6. Copy API key và paste vào `.env`:
```env
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```

### Bước 4: Chạy Development Server
```bash
npm run dev
```

---

## 📁 File Structure - API Configuration

```
weather-forecast-react/
├── .env                              # ⚠️ API keys (KHÔNG commit lên Git)
├── .env.example                      # Template cho .env
├── src/
│   ├── config/
│   │   └── api.config.js            # ✅ Config tập trung cho tất cả APIs
│   ├── settings/
│   │   └── api.jsx                  # ⚠️ Deprecated - Giữ để backward compatibility
│   └── app/
│       ├── hooks/
│       │   └── useFetch.jsx         # Custom hook cho API calls
│       └── components/
│           └── components/
│               └── WeatherCarousel.jsx  # Component sử dụng APIs
```

---

## 🔧 API Configuration Details

### File: `src/config/api.config.js`

File này chứa **tất cả cấu hình API** tập trung:

```javascript
import { openWeatherAPI } from '../config/api.config';

// Search city by name
const cityUrl = openWeatherAPI.searchCity('hanoi');

// Get forecast by coordinates
const forecastUrl = openWeatherAPI.getForecast(21.0285, 105.8542);

// Get weather icon
const iconUrl = openWeatherAPI.getIconUrl('10d');

// Get country flag
const flagUrl = openWeatherAPI.getFlagUrl('vn');

// Convert temperature
import { temperatureUtils } from '../config/api.config';
const celsius = temperatureUtils.kelvinToCelsius(300); // "26.9"
```

### Available Functions

#### OpenWeatherMap API
```javascript
openWeatherAPI.searchCity(query)         // Search cities
openWeatherAPI.getForecast(lat, lon)     // Get weather forecast
openWeatherAPI.getIconUrl(iconCode)      // Get weather icon URL
openWeatherAPI.getFlagUrl(countryCode)   // Get country flag URL
```

#### IP Geolocation API
```javascript
ipGeolocationAPI.getIP()                 // Get user's IP
ipGeolocationAPI.getLocationByIP(ip)     // Get location from IP
```

#### Google Maps
```javascript
googleMapsConfig.apiKey                  // Get API key
googleMapsConfig.getScriptUrl(callback)  // Get Maps script URL
```

#### Utilities
```javascript
temperatureUtils.kelvinToCelsius(kelvin) // Convert K to °C
```

---

## 🔐 Security Best Practices

### ✅ DO:
- Luôn lưu API keys trong `.env`
- Không commit file `.env` lên Git
- Sử dụng `.env.example` để chia sẻ template
- Restrict API keys theo domain/IP khi deploy production
- Rotate API keys định kỳ

### ❌ DON'T:
- Hardcode API keys trong source code
- Commit API keys lên Git/GitHub
- Share API keys qua email/chat
- Sử dụng production keys cho development

---

## 🚀 Deployment

### Vercel / Netlify
Thêm Environment Variables trong dashboard:
```
VITE_OPENWEATHER_API_KEY=xxx
VITE_IPGEOLOCATION_API_KEY=xxx
VITE_GOOGLE_MAPS_API_KEY=xxx
VITE_OPENWEATHER_DOMAIN=https://api.openweathermap.org/data/2.5
VITE_IPGEOLOCATION_DOMAIN=https://api.ipgeolocation.io
VITE_OPENWEATHER_ICON_DOMAIN=https://openweathermap.org
```

### Docker
Thêm vào `docker-compose.yml`:
```yaml
environment:
  - VITE_OPENWEATHER_API_KEY=${VITE_OPENWEATHER_API_KEY}
  - VITE_IPGEOLOCATION_API_KEY=${VITE_IPGEOLOCATION_API_KEY}
  - VITE_GOOGLE_MAPS_API_KEY=${VITE_GOOGLE_MAPS_API_KEY}
```

---

## 🐛 Troubleshooting

### Lỗi: "Invalid API key"
- Kiểm tra API key có đúng không
- Kiểm tra API key đã được activate chưa (OpenWeatherMap có thể mất vài phút)
- Kiểm tra quota/limit của free tier

### Lỗi: "CORS error"
- Thêm domain vào API restrictions (Google Maps)
- Kiểm tra domain whitelist (nếu có)

### Lỗi: "API limit exceeded"
- Kiểm tra số lượng requests đã sử dụng
- Upgrade plan hoặc implement caching
- Sử dụng localStorage để cache data

---

## 📞 Support

Nếu có vấn đề với API setup:
1. Check [OpenWeatherMap Docs](https://openweathermap.org/api)
2. Check [IP Geolocation Docs](https://ipgeolocation.io/documentation.html)
3. Check [Google Maps Docs](https://developers.google.com/maps/documentation)

---

**⚠️ Important**: File `.env` đã được thêm vào `.gitignore` để bảo vệ API keys. Không bao giờ commit file này lên Git!
