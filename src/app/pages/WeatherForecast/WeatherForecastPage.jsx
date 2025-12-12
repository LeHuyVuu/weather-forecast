import WeatherForecastChart from "../../components/WeatherForecastChart";
import SEOHead from "../../../components/SEO/SEOHead";
import { generateMetaTags, SEO_CONFIG } from "../../../utils/seo";

const WeatherForecastPage = () => {
  // Generate SEO meta tags for forecast page
  const seoData = generateMetaTags({
    title: '7-Day Weather Forecast - Detailed Weather Prediction Charts',
    description: 'View comprehensive 7-day weather forecasts with detailed charts and predictions. Track temperature changes, precipitation, wind patterns, and weather trends for your location.',
    keywords: '7-day forecast, weather charts, weather prediction, temperature forecast, precipitation forecast, wind forecast, weather trends',
    url: `${SEO_CONFIG.siteUrl}/weather-forecast`,
  });

  return (
    <>
      <SEOHead {...seoData} />
      <div className="min-h-screen bg-gray-50 py-32 ">
      <div className=" mx-auto">
        {/* <h1 className="text-3xl font-bold text-center mb-8">
          Weather Forecast
        </h1> */}
        <WeatherForecastChart />
      </div>
    </div>
    </>
  );
};

export default WeatherForecastPage;
