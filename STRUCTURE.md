# 📂 Project Structure Documentation

## Tổng Quan Cấu Trúc

```
weather-forecast-react/
├── 📄 Configuration Files
│   ├── .env                          # Environment variables (API keys)
│   ├── .env.example                  # Template cho environment variables
│   ├── .gitignore                    # Files không commit lên Git
│   ├── package.json                  # Dependencies và scripts
│   ├── vite.config.js                # Vite configuration
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   ├── postcss.config.js             # PostCSS configuration
│   ├── eslint.config.js              # ESLint rules
│   └── vercel.json                   # Vercel deployment config
│
├── 📄 Documentation
│   ├── README.API.md                 # Hướng dẫn setup API keys
│   ├── STRUCTURE.md                  # File này - Giải thích cấu trúc
│   └── Weather.md                    # Requirements và design docs
│
├── 📁 public/                        # Static assets
│   └── fonts/                        # Custom fonts
│
└── 📁 src/                           # Source code chính
    ├── index.css                     # Global styles
    ├── main.jsx                      # Entry point
    │
    ├── 📁 config/                    # ✅ Configuration files
    │   └── api.config.js             # API configuration tập trung
    │
    ├── 📁 app/                       # Application code
    │   ├── 📁 assets/                # Images, JSON data
    │   │   ├── Country.json          # Danh sách quốc gia
    │   │   ├── carousel/             # Carousel images
    │   │   ├── EarthMaterials/       # 3D Earth textures
    │   │   └── LoadingMaterials/     # Loading animations
    │   │
    │   ├── 📁 components/            # React components
    │   │   ├── WeatherForecastChart.jsx   # Chart component
    │   │   ├── components/           # Sub-components
    │   │   │   ├── CarouselStyles.jsx     # Carousel styling
    │   │   │   ├── WeatherCarousel.jsx    # Main carousel
    │   │   │   ├── WeatherData.jsx        # Weather data display
    │   │   │   ├── WeatherIcon.jsx        # Icon component
    │   │   │   ├── WeatherNews.jsx        # News component
    │   │   │   └── WorldWeather.jsx       # World weather
    │   │   │
    │   │   ├── Earth/                # 3D Earth components
    │   │   │   ├── Earth.jsx         # 3D Earth visualization
    │   │   │   ├── LinkDot.jsx       # Interactive dots
    │   │   │   └── Space.jsx         # Space background
    │   │   │
    │   │   ├── LoadingComponent/     # Loading states
    │   │   │   ├── loading.css
    │   │   │   ├── Loading.jsx
    │   │   │   └── LoadingContext.jsx
    │   │   │
    │   │   └── ScrollComponent/      # Scroll effects
    │   │       ├── HorizontalScroll.css
    │   │       ├── HorizontalScroll.jsx
    │   │       └── Test.jsx
    │   │
    │   ├── 📁 context/               # State management
    │   │   └── store.js              # Global state (hookstate)
    │   │
    │   ├── 📁 hooks/                 # Custom React hooks
    │   │   ├── useFetch.jsx          # Fetch data hook
    │   │   └── useFetchImage.jsx     # Fetch images hook
    │   │
    │   ├── 📁 layouts/               # Layout components
    │   │   ├── RootLayout.jsx        # Main layout wrapper
    │   │   ├── Header/
    │   │   │   ├── CountrySelect.css
    │   │   │   ├── CountrySelect.jsx # Country selector
    │   │   │   └── Header.jsx        # Header component
    │   │   ├── Footer/
    │   │   │   └── Footer.jsx        # Footer component
    │   │   └── PageNotFound/
    │   │       └── PageNotFound.jsx  # 404 page
    │   │
    │   ├── 📁 pages/                 # Page components
    │   │   ├── HomePage/
    │   │   │   └── Homepage.jsx      # Landing page
    │   │   │
    │   │   ├── DetailWeather/        # Weather detail page
    │   │   │   ├── DetailWeather.css
    │   │   │   ├── DetailWeather.jsx
    │   │   │   └── partials/
    │   │   │       ├── LeftBar.jsx   # Left sidebar
    │   │   │       ├── RightBar.jsx  # Right sidebar
    │   │   │       └── weatherAnimations.css
    │   │   │
    │   │   └── WeatherForecast/
    │   │       └── WeatherForecastPage.jsx
    │   │
    │   ├── 📁 routes/                # Routing
    │   │   └── MainRoutes.jsx        # Route definitions
    │   │
    │   └── 📁 styles/                # Additional styles
    │       └── DetailWeather.css
    │
    ├── 📁 mocks/                     # Mock data for testing
    │   ├── city.json
    │   └── forecast.json
    │
    └── 📁 settings/                  # ⚠️ Deprecated
        └── api.jsx                   # Old API config (giữ cho backward compatibility)
```

---

## 🔑 Các File Quan Trọng

### 1. **Configuration Layer**

#### `src/config/api.config.js` ✅ **NEW**
- **Mục đích**: Tập trung tất cả API configuration
- **Chứa**: 
  - API keys từ environment variables
  - API domains
  - Helper functions để tạo API URLs
  - Temperature conversion utilities
- **Best Practice**: ✅ Đây là file duy nhất nên import khi cần gọi API

#### `.env` & `.env.example`
- **`.env`**: Chứa API keys thật (⚠️ KHÔNG commit)
- **`.env.example`**: Template để team khác setup

#### `src/settings/api.jsx` ⚠️ **DEPRECATED**
- File cũ, giữ lại để backward compatibility
- Redirect sang `api.config.js`
- Sẽ bỏ trong future versions

---

### 2. **Data Flow Architecture**

```
User Action
    ↓
Components (pages/HomePage)
    ↓
Custom Hooks (hooks/useFetch.jsx)
    ↓
API Config (config/api.config.js)
    ↓
Environment Variables (.env)
    ↓
External APIs (OpenWeather, IPGeolocation)
    ↓
State Management (context/store.js)
    ↓
UI Update (components)
```

---

### 3. **State Management**

#### `src/app/context/store.js`
Sử dụng **@hookstate/core** để quản lý global state:

```javascript
// Location state - Lưu thông tin vị trí người dùng
sLocation = {
  countryName: string,
  lat: number,
  lon: number,
  timezone: string,
  timezoneOffset: number,
  current: object,    // Current weather
  hourly: array,      // Hourly forecast
  daily: array,       // Daily forecast
  code: string        // Country code
}

// Selection state - Lưu thông tin được chọn
sSelection = {
  // Data được select từ components
}
```

---

### 4. **Custom Hooks**

#### `src/app/hooks/useFetch.jsx`
Custom hook để fetch data từ APIs:
```javascript
const { isLoading, data } = useFetch({
  url: openWeatherAPI.getForecast(lat, lon),
  method: 'GET',
  headers: {}
});
```

#### `src/app/hooks/useFetchImage.jsx`
Custom hook để load images dynamically

---

### 5. **Component Architecture**

#### **Pages** (High-level components)
- `HomePage.jsx` - Landing page với carousel và weather overview
- `DetailWeather.jsx` - Chi tiết thời tiết với charts và animations
- `WeatherForecastPage.jsx` - Trang forecast đầy đủ

#### **Components** (Reusable components)
- `WeatherCarousel.jsx` - Main carousel hiển thị weather
- `WeatherIcon.jsx` - Weather icons
- `WeatherData.jsx` - Weather data display
- `Earth.jsx` - 3D Earth visualization
- `Loading.jsx` - Loading states

#### **Layouts** (Structural components)
- `RootLayout.jsx` - Main wrapper
- `Header.jsx` - Navigation
- `Footer.jsx` - Footer

---

## 📊 Data Flow Examples

### Example 1: User mở app lần đầu

```
1. App loads → WeatherCarousel.jsx renders
2. useEffect triggers → getIp() function
3. Fetch user IP:
   → ipGeolocationAPI.getIP()
   → Returns: { ip: "1.2.3.4" }
4. Fetch location from IP:
   → ipGeolocationAPI.getLocationByIP(ip)
   → Returns: { latitude, longitude, country_name, ... }
5. Fetch weather data:
   → openWeatherAPI.getForecast(lat, lon)
   → Returns: { current, hourly, daily, ... }
6. Update global state:
   → sLocation.set({ countryName, lat, lon, ... })
7. Components re-render with new data
8. Display weather info to user
```

### Example 2: User search thành phố

```
1. User types in CountrySelect.jsx
2. Component calls:
   → openWeatherAPI.searchCity(query)
3. API returns list of cities
4. User selects city
5. Update state with new lat/lon
6. Trigger new weather fetch
7. Update UI
```

---

## 🎨 Styling Architecture

### Tailwind CSS (Primary)
- Utility-first CSS framework
- Configured in `tailwind.config.js`
- Classes applied directly in JSX

### CSS Modules (Secondary)
- Component-specific styles
- Files: `*.css` next to components
- Examples:
  - `DetailWeather.css`
  - `loading.css`
  - `HorizontalScroll.css`

### Inline Styles (Minimal)
- Dynamic styles only
- Example: background images, dynamic widths

---

## 🔄 API Integration Pattern

### ✅ Recommended Pattern

```javascript
// 1. Import API config
import { openWeatherAPI, temperatureUtils } from '@/config/api.config';

// 2. Use in component
const WeatherComponent = () => {
  const [weather, setWeather] = useState(null);
  
  useEffect(() => {
    const fetchWeather = async () => {
      const url = openWeatherAPI.getForecast(lat, lon);
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
    };
    
    fetchWeather();
  }, [lat, lon]);
  
  // 3. Convert temperature
  const celsius = temperatureUtils.kelvinToCelsius(weather?.temp);
  
  return <div>{celsius}°C</div>;
};
```

### ❌ Old Pattern (Deprecated)

```javascript
// DON'T USE - Hardcoded API calls
fetch(`https://api.openweathermap.org/...?appid=HARDCODED_KEY`)
```

---

## 🚀 Development Workflow

### 1. **Setup Environment**
```bash
# Install dependencies
npm install

# Copy env file
cp .env.example .env

# Add your API keys to .env
```

### 2. **Start Development**
```bash
npm run dev
```

### 3. **Build for Production**
```bash
npm run build
npm run preview
```

---

## 📝 Coding Conventions

### File Naming
- Components: `PascalCase.jsx` (e.g., `WeatherCarousel.jsx`)
- Hooks: `camelCase.jsx` (e.g., `useFetch.jsx`)
- Utilities: `camelCase.js` (e.g., `api.config.js`)
- Styles: `kebab-case.css` (e.g., `loading.css`)

### Component Structure
```javascript
// 1. Imports
import React, { useState, useEffect } from 'react';
import { dependency } from 'package';

// 2. Component definition
const ComponentName = ({ props }) => {
  // 3. State
  const [state, setState] = useState(null);
  
  // 4. Effects
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  // 5. Handlers
  const handleClick = () => {
    // Logic
  };
  
  // 6. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

// 7. Export
export default ComponentName;
```

---

## 🔧 Maintenance Guide

### Khi thêm API mới:
1. Thêm API key vào `.env` và `.env.example`
2. Thêm configuration vào `src/config/api.config.js`
3. Document trong `README.API.md`
4. Update file này (`STRUCTURE.md`)

### Khi refactor components:
1. Giữ nguyên interface (props) nếu được
2. Update tests nếu có
3. Document changes

### Khi fix bugs:
1. Identify root cause
2. Fix in appropriate layer
3. Test thoroughly
4. Document if needed

---

## 📚 Additional Resources

- **API Documentation**: Xem `README.API.md`
- **Requirements**: Xem `Weather.md`
- **Tailwind Docs**: https://tailwindcss.com/docs
- **React Docs**: https://react.dev
- **Vite Docs**: https://vitejs.dev

---

**Last Updated**: November 28, 2025
