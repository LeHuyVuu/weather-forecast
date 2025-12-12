import { useRef } from "react";
import WeatherCarousel from "../../components/components/WeatherCarousel";
import WorldWeather from "../../components/components/WorldWeather";
import WeatherNews from "../../components/components/WeatherNews";
import SEOHead from "../../../components/SEO/SEOHead";
import { generateMetaTags, generateOrganizationStructuredData, generateWebSiteStructuredData, SEO_CONFIG } from "../../../utils/seo";

const HomePage = () => {
  const worldWeatherRef = useRef(null);
  const newsRef = useRef(null);

  // Generate SEO meta tags
  const seoData = generateMetaTags({
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    keywords: SEO_CONFIG.defaultKeywords,
    url: SEO_CONFIG.siteUrl,
  });

  // Generate structured data
  const structuredData = [
    generateWebSiteStructuredData(),
    generateOrganizationStructuredData()
  ];

  return (
    <>
      <SEOHead
        {...seoData}
        structuredData={structuredData}
      />
      <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-white">
      {/* Fixed Navigation */}
      {/* <div className="fixed top-6 right-6 z-50 flex gap-2">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg transition-all duration-300 hover:bg-blue-500 hover:text-white ${activeSection === "carousel"
              ? "bg-blue-500 text-white"
              : "text-gray-700"
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L10 4.414l6.293 6.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </button>
        <button
          onClick={scrollToWorldWeather}
          className={`flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg transition-all duration-300 hover:bg-blue-500 hover:text-white ${activeSection === "worldWeather"
              ? "bg-blue-500 text-white"
              : "text-gray-700"
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          onClick={scrollToNews}
          className={`flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg transition-all duration-300 hover:bg-blue-500 hover:text-white ${activeSection === "news"
              ? "bg-blue-500 text-white"
              : "text-gray-700"
            }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
              clipRule="evenodd"
            />
            <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
          </svg>
        </button>
      </div> */}

      {/* Weather Carousel Component */}
      <div className="relative">
        <WeatherCarousel
          // onScrollWorldWeather={scrollToWorldWeather}
          // onScrollNews={scrollToNews}
        />
        <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 md:h-20 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* World Weather Component with Card-based UI */}
      <div className="relative">
        <div className="absolute top-0 inset-x-0 h-16 sm:h-20 md:h-24 bg-gradient-to-b from-white to-transparent z-10"></div>
        <div className="">
          <WorldWeather worldWeatherRef={worldWeatherRef} />
        </div>
      </div>

      {/* Weather News Component with Enhanced Styling */}
      <div className="relative pt-6 sm:pt-8 md:pt-10 pb-12 sm:pb-16 md:pb-20">
        <div className="absolute top-0 inset-x-0 h-16 sm:h-20 md:h-24 bg-gradient-to-b from-white to-transparent z-10"></div>
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <WeatherNews newsRef={newsRef} />
        </div>

        {/* Footer with gradient background */}
        {/* <div className="mt-16 py-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-medium tracking-wider uppercase">
              Weather Forecast Application
            </p>
            <p className="text-xs mt-2 opacity-80">
              Data provided by real-time weather services
            </p>
          </div>
        </div> */}
      </div>

      {/* Scroll Indicator */}
      {/* <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-full p-2 flex items-center space-x-1">
          <div
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${activeSection === "carousel" ? "bg-blue-500" : "bg-gray-300"
              }`}
          ></div>
          <div
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${activeSection === "worldWeather" ? "bg-blue-500" : "bg-gray-300"
              }`}
          ></div>
          <div
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${activeSection === "news" ? "bg-blue-500" : "bg-gray-300"
              }`}
          ></div>
        </div>
      </div> */}
      {/* <sLocation.DevTool name="abc"/> */}
    </div>
    </>
  );
};

export default HomePage;
