const CarouselStyles = () => {
  return (
    <style jsx>{`
      /* Base styles for slider */
      .slider {
        position: relative;
        overflow: hidden;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      }

      .slider .list .item .content {
        position: absolute;
        left: 10%;
        top: 20%;
        
        
        z-index: 1;
        opacity: 0;
        transition: opacity 0.5s ease;
      }

      .slider .list .item.active .content {
        opacity: 1;
      }

      .slider .list .item .content p:nth-child(1) {
        text-transform: uppercase;
        letter-spacing: 10px;
      }

      .slider .list .item .content h2 {
        font-size: 100px;
        margin: 0;
        font-weight: 300;
      }

      /* Advanced transitions between slides */
      .slider .list .item {
        transition: opacity 1s ease-out,
          transform 1.5s cubic-bezier(0.165, 0.84, 0.44, 1);
        transform: scale(1.05);
        will-change: transform, opacity;
      }

      .slider .list .item.active {
        opacity: 1;
        z-index: 10;
        transform: scale(1);
      }

      /* Progress bar animation */
      @keyframes progressBar {
        0% {
          width: 0%;
        }
        100% {
          width: 100%;
        }
      }

      .slider:not(.paused) .progress-bar {
        animation: progressBar 5s linear;
        will-change: width;
      }

      /* Content animations */
      @keyframes showContent {
        0% {
          transform: translateY(30px);
          filter: blur(20px);
          opacity: 0;
        }
        100% {
          transform: translateY(0);
          filter: blur(0);
          opacity: 1;
        }
      }

      /* Right side slide-in animation */
      @keyframes slideInRight {
        0% {
          transform: translateX(50px);
          filter: blur(10px);
          opacity: 0;
        }
        100% {
          transform: translateX(0);
          filter: blur(0);
          opacity: 1;
        }
      }

      /* Main content animations that reset with each slide */
      .slider .list .item p:nth-child(1),
      .slider .list .item h2,
      .slider .list .item p:nth-child(3) {
        transform: translateY(30px);
        filter: blur(20px);
        opacity: 0;
        will-change: transform, opacity, filter;
      }

      .slider .list .item.active p:nth-child(1) {
        animation: showContent 0.6s 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)
          forwards;
      }

      .slider .list .item.active h2 {
        animation: showContent 0.6s 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)
          forwards;
      }

      .slider .list .item.active p:nth-child(3) {
        animation: showContent 0.6s 1s cubic-bezier(0.165, 0.84, 0.44, 1)
          forwards;
      }

      /* Additional elements that will reset with each slide */
      .weather-header,
      .weather-condition,
      .forecast-text,
      .forecast-card {
        transform: translateY(30px);
        filter: blur(10px);
        opacity: 0;
        will-change: transform, opacity, filter;
        visibility: hidden;
      }

      /* Right side content animations */
      .content-2 .content-2-1,
      .content-2 .content-2-2 {
        transform: translateX(50px);
        filter: blur(10px);
        opacity: 0;
        will-change: transform, opacity, filter;
        visibility: hidden;
      }

      /* Improved timing for smoother presentation */
      .slider.active-slide .weather-header {
        animation: showContent 0.6s 1.1s cubic-bezier(0.165, 0.84, 0.44, 1)
          forwards;
        visibility: visible;
      }

      .slider.active-slide .weather-condition {
        animation: showContent 0.6s 1.3s cubic-bezier(0.165, 0.84, 0.44, 1)
          forwards;
        visibility: visible;
      }

      .slider.active-slide .forecast-text {
        animation: showContent 0.6s 1.5s cubic-bezier(0.165, 0.84, 0.44, 1)
          forwards;
        visibility: visible;
      }

      /* Right side animations */
      .slider.active-slide .content-2 .content-2-1 {
        animation: slideInRight 0.6s 1.3s cubic-bezier(0.165, 0.84, 0.44, 1)
          forwards;
        visibility: visible;
      }

      .slider.active-slide .content-2 .content-2-2 {
        animation: slideInRight 0.6s 1.6s cubic-bezier(0.165, 0.84, 0.44, 1)
          forwards;
        visibility: visible;
      }

      .slider.active-slide .forecast-card:nth-of-type(1) {
        animation: showContent 0.6s 1.7s cubic-bezier(0.165, 0.84, 0.44, 1)
          forwards;
        visibility: visible;
      }

      .slider.active-slide .forecast-card:nth-of-type(2) {
        animation: showContent 0.6s 1.9s cubic-bezier(0.165, 0.84, 0.44, 1)
          forwards;
        visibility: visible;
      }

      /* Responsive adjustments */
      @media (max-width: 768px) {
        .slider .list .item .content {
          left: 5%;
          top: 15%;
          width: 90%;
        }

        .slider .list .item .content h2 {
          font-size: 72px;
        }
      }
      
      /* Extra responsive breakpoints */
      /* Mobile phones (small) */
      @media (max-width: 375px) {
        .slider .list .item .content h2 {
          font-size: 48px;
        }
        
        .slider .list .item .content p:nth-child(1) {
          letter-spacing: 3px;
          font-size: 14px;
        }
        
        .slider.active-slide .content-2 .content-2-1,
        .slider.active-slide .content-2 .content-2-2 {
          animation-delay: 1s;
        }
      }
      
      /* Mobile phones (medium) */
      @media (min-width: 376px) and (max-width: 480px) {
        .slider .list .item .content h2 {
          font-size: 56px;
        }
        
        .slider .list .item .content p:nth-child(1) {
          letter-spacing: 5px;
        }
      }
      
      /* Mobile phones (large) and small tablets */
      @media (min-width: 481px) and (max-width: 767px) {
        .slider .list .item .content h2 {
          font-size: 64px;
        }
      }
      
      /* Large tablets and small laptops */
      @media (min-width: 769px) and (max-width: 1024px) {
        .slider .list .item .content {
          left: 8%;
          width: 80%;
        }
        
        .slider .list .item .content h2 {
          font-size: 80px;
        }
      }
      
      /* Laptops and desktops */
      @media (min-width: 1025px) and (max-width: 1440px) {
        .slider .list .item .content {
          left: 10%;
          width: 70%;
        }
      }
      
      /* Large screens */
      @media (min-width: 1441px) {
        .slider .list .item .content {
          left: 12%;
          width: 60%;
        }
      }
        
    `}</style>
  );
};

export default CarouselStyles;