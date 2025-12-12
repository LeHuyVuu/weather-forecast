import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

/**
 * SEO-optimized Image component with lazy loading and proper alt text
 */
const SEOImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = '',
  effect = 'blur',
  loading = 'lazy',
  title,
  ...props 
}) => {
  // Ensure alt text is always provided for SEO
  const altText = alt || 'Weather forecast image';
  
  return (
    <LazyLoadImage
      src={src}
      alt={altText}
      width={width}
      height={height}
      className={className}
      effect={effect}
      loading={loading}
      title={title || altText}
      {...props}
    />
  );
};

SEOImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  effect: PropTypes.string,
  loading: PropTypes.oneOf(['lazy', 'eager']),
  title: PropTypes.string,
};

export default SEOImage;
