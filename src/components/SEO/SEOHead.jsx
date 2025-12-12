import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  canonical, 
  openGraph, 
  twitter,
  structuredData,
  author
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {author && <meta name="author" content={author} />}
      
      {/* Open Graph / Facebook */}
      {openGraph && (
        <>
          <meta property="og:type" content={openGraph.type} />
          <meta property="og:url" content={openGraph.url} />
          <meta property="og:title" content={openGraph.title} />
          <meta property="og:description" content={openGraph.description} />
          <meta property="og:site_name" content={openGraph.siteName} />
          <meta property="og:locale" content={openGraph.locale} />
          {openGraph.images?.map((image, index) => (
            <meta key={index} property="og:image" content={image.url} />
          ))}
          {openGraph.images?.[0] && (
            <>
              <meta property="og:image:width" content={openGraph.images[0].width?.toString()} />
              <meta property="og:image:height" content={openGraph.images[0].height?.toString()} />
              <meta property="og:image:alt" content={openGraph.images[0].alt} />
            </>
          )}
          {openGraph.publishedTime && (
            <meta property="article:published_time" content={openGraph.publishedTime} />
          )}
          {openGraph.modifiedTime && (
            <meta property="article:modified_time" content={openGraph.modifiedTime} />
          )}
        </>
      )}

      {/* Twitter */}
      {twitter && (
        <>
          <meta property="twitter:card" content={twitter.cardType} />
          <meta property="twitter:url" content={openGraph?.url || canonical} />
          <meta property="twitter:title" content={twitter.title} />
          <meta property="twitter:description" content={twitter.description} />
          <meta property="twitter:image" content={twitter.image} />
          {twitter.handle && <meta property="twitter:creator" content={twitter.handle} />}
          {twitter.site && <meta property="twitter:site" content={twitter.site} />}
        </>
      )}

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="revisit-after" content="1 days" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />

      {/* Structured Data */}
      {structuredData && Array.isArray(structuredData) ? (
        structuredData.map((data, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(data)}
          </script>
        ))
      ) : structuredData ? (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      ) : null}
    </Helmet>
  );
};

SEOHead.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.string,
  canonical: PropTypes.string,
  openGraph: PropTypes.shape({
    type: PropTypes.string,
    url: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        alt: PropTypes.string,
      })
    ),
    siteName: PropTypes.string,
    locale: PropTypes.string,
    publishedTime: PropTypes.string,
    modifiedTime: PropTypes.string,
  }),
  twitter: PropTypes.shape({
    cardType: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    handle: PropTypes.string,
    site: PropTypes.string,
  }),
  structuredData: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
  ]),
  author: PropTypes.string,
};

export default SEOHead;
