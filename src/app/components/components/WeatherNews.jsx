import React, { useState } from "react";

const WeatherNews = ({ newsRef }) => {
  const [hoveredNews, setHoveredNews] = useState(null);

  const newsItems = [
    {
      id: 1,
      title: "Climate change: Facing Earth's greatest challenge",
      image:
        "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      author: "Climate Research Team",
      date: "May 30, 2023",
      excerpt:
        "Understanding the global climate patterns and how they affect our daily lives and ecosystems.",
      category: "Research",
    },
    {
      id: 2,
      title: "Wildfires burn in Colorado and Texas",
      image:
        "https://images.unsplash.com/photo-1542856391-010fb87dcfed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      author: "Emergency Response",
      date: "May 30, 2023",
      excerpt:
        "Emergency responders are battling wildfires across multiple states during unusually hot conditions.",
      category: "Alerts",
    },
    {
      id: 3,
      title: "Severe thunderstorms expected across the Midwest",
      image:
        "https://images.unsplash.com/photo-1461511669078-d46bf351cd6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      author: "Forecast Team",
      date: "May 30, 2023",
      excerpt:
        "A strong weather system is bringing severe storms with potential for flooding and tornadoes.",
      category: "Forecast",
    },
  ];

  return (
    <div
      ref={newsRef}
      className="max-w-7xl mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-800 to-gray-900 text-white"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8 md:mb-10">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">
            Weather Forecast News
          </h2>
          <p className="text-blue-300 text-xs sm:text-sm md:text-base font-medium">
            Stay updated with latest weather events
          </p>
        </div>
        <a
          href="#"
          className="mt-4 md:mt-0 group inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-blue-400 rounded-full text-xs sm:text-sm font-medium text-blue-400 hover:bg-blue-400 hover:text-white transition-all duration-300"
        >
          VIEW ALL
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </div>

      <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-4 sm:p-6 rounded-xl mb-6 sm:mb-10 border border-gray-700">
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Our team of meteorologists provides accurate, real-time weather news
          and updates from around the globe. Learn how weather patterns affect
          communities and ecosystems worldwide.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {newsItems.map((news, index) => (
          <div
            key={news.id}
            className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-700"
            onMouseEnter={() => setHoveredNews(index)}
            onMouseLeave={() => setHoveredNews(null)}
          >
            <div className="relative overflow-hidden">
              <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10">
                <span className="inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 text-xs font-medium rounded-full bg-black/50 backdrop-blur-sm text-blue-300">
                  {news.category}
                </span>
              </div>
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-40 sm:h-48 md:h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-t from-black to-transparent"></div>
            </div>
            <div className="p-4 sm:p-6 relative">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 group-hover:text-blue-300 transition-colors duration-300 line-clamp-2">
                {news.title}
              </h3>
              <p className="text-gray-400 mb-3 sm:mb-4 text-xs sm:text-sm line-clamp-2">
                {news.excerpt}
              </p>
              <div className="flex justify-between items-center text-gray-400 text-xs sm:text-sm">
                <div className="flex items-center">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm">{news.author}</span>
                </div>
                <span className="text-xs sm:text-sm">{news.date}</span>
              </div>
              <div
                className={`mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-700 flex justify-end transition-opacity duration-300 ${hoveredNews === index ? "opacity-100" : "opacity-0"}`}
              >
                <button className="inline-flex items-center text-blue-400 text-xs sm:text-sm font-medium">
                  Read more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 h-3 w-3 sm:h-4 sm:w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 sm:mt-10 md:mt-12 bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-700">
        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
          Subscribe to Weather Updates
        </h3>
        <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
          Get daily forecast and weather alerts directly to your inbox
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-grow px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-600 bg-gray-700/50 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-300 text-white text-sm sm:text-base"
          />
          <button className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-500 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-blue-600 transition-colors duration-300">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherNews;
