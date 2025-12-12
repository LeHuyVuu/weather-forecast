// SEO utilities and configurations
export const SEO_CONFIG = {
  siteName: 'Weather Forecast',
  siteUrl: 'https://weather.boversal.id.vn',
  defaultTitle: 'Weather Forecast - Real-time Weather Updates & 7-Day Forecast',
  defaultDescription: 'Get accurate real-time weather forecasts, 7-day weather predictions, interactive 3D Earth globe, and world weather maps. Check temperature, humidity, wind speed, and more for any location worldwide.',
  defaultKeywords: 'weather forecast, real-time weather, weather prediction, 7-day forecast, weather map, temperature, humidity, wind speed, weather globe, world weather',
  twitterHandle: '@weatherforecast',
  defaultImage: '/og-image.jpg',
  locale: 'vi_VN',
  type: 'website'
};

export const generateMetaTags = (pageData = {}) => {
  const {
    title = SEO_CONFIG.defaultTitle,
    description = SEO_CONFIG.defaultDescription,
    keywords = SEO_CONFIG.defaultKeywords,
    image = SEO_CONFIG.defaultImage,
    url = SEO_CONFIG.siteUrl,
    type = SEO_CONFIG.type,
    author,
    publishedTime,
    modifiedTime
  } = pageData;

  return {
    title,
    description,
    keywords,
    canonical: url,
    openGraph: {
      type,
      locale: SEO_CONFIG.locale,
      url,
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      siteName: SEO_CONFIG.siteName,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      handle: SEO_CONFIG.twitterHandle,
      site: SEO_CONFIG.twitterHandle,
      cardType: 'summary_large_image',
      title,
      description,
      image,
    },
    ...(author && { author }),
  };
};

export const generateWeatherStructuredData = (weatherData, location) => {
  if (!weatherData) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Weather Forecast for ${location}`,
    description: `Real-time weather information and 7-day forecast for ${location}`,
    url: `${SEO_CONFIG.siteUrl}/detail-weather?search=${encodeURIComponent(location)}`,
    mainEntity: {
      '@type': 'Place',
      name: location,
      geo: weatherData.lat && weatherData.lon ? {
        '@type': 'GeoCoordinates',
        latitude: weatherData.lat,
        longitude: weatherData.lon
      } : undefined
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SEO_CONFIG.siteUrl}/detail-weather?search={search_term}`,
      'query-input': 'required name=search_term'
    }
  };
};

export const generateBreadcrumbStructuredData = (breadcrumbs) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };
};

export const generateOrganizationStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    logo: `${SEO_CONFIG.siteUrl}/logo.png`,
    description: SEO_CONFIG.defaultDescription,
    sameAs: [
      'https://www.facebook.com/weatherforecast',
      'https://twitter.com/weatherforecast',
      'https://www.instagram.com/weatherforecast'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['en', 'vi']
    }
  };
};

export const generateWebSiteStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    description: SEO_CONFIG.defaultDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SEO_CONFIG.siteUrl}/detail-weather?search={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    inLanguage: ['en', 'vi']
  };
};
