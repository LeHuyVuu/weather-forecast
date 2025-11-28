import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";

import PageNotFound from "../layouts/PageNotFound/PageNotFound";
import HomePage from "../pages/HomePage/Homepage";
import DetailWeather from "../pages/DetailWeather/DetailWeather";
import WeatherForecastPage from "../pages/WeatherForecast/WeatherForecastPage";

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/detail" element={<DetailWeather />} />
          <Route path="/chart" element={<WeatherForecastPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
