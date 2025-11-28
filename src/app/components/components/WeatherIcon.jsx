import React from "react";

const WeatherIcon = ({
  icon,
  className = "w-8 h-8 text-white",
  animated = true,
}) => {
  const baseClasses = `${className} ${
    animated ? "transition-all duration-500" : ""
  }`;

  switch (icon) {
    case "rain":
      return (
        <div className="relative flex items-center justify-center">
          <svg
            className={`${baseClasses} ${animated ? "animate-pulse" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4.5 9.5a5 5 0 0 1 9.9-1H15a4 4 0 1 1 0 8h-1.5"></path>
            <path
              d="M16 14v6"
              className={`${animated ? "animate-rain-drop" : ""}`}
            ></path>
            <path
              d="M8 14v6"
              className={`${
                animated ? "animate-rain-drop animation-delay-200" : ""
              }`}
            ></path>
            <path
              d="M12 16v6"
              className={`${
                animated ? "animate-rain-drop animation-delay-700" : ""
              }`}
            ></path>
          </svg>
          {animated && (
            <style jsx>{`
              @keyframes rainDrop {
                0% {
                  transform: translateY(0);
                  opacity: 1;
                }
                70% {
                  opacity: 0.7;
                }
                100% {
                  transform: translateY(5px);
                  opacity: 0;
                }
              }
              .animate-rain-drop {
                animation: rainDrop 1.5s infinite;
              }
              .animation-delay-200 {
                animation-delay: 0.2s;
              }
              .animation-delay-700 {
                animation-delay: 0.7s;
              }
            `}</style>
          )}
        </div>
      );
    case "cloudy":
      return (
        <div className="relative flex items-center justify-center">
          <svg
            className={`${baseClasses} ${animated ? "hover:scale-110" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M17 7a5 5 0 0 0-10 0a3 3 0 0 0 0 6h10a3 3 0 0 0 0-6z"
              className={animated ? "animate-cloud-float" : ""}
            ></path>
          </svg>
          {animated && (
            <style jsx>{`
              @keyframes cloudFloat {
                0% {
                  transform: translateX(0);
                }
                50% {
                  transform: translateX(3px);
                }
                100% {
                  transform: translateX(0);
                }
              }
              .animate-cloud-float {
                animation: cloudFloat 3s ease-in-out infinite;
              }
            `}</style>
          )}
        </div>
      );
    case "partly-cloudy":
      return (
        <div className="relative flex items-center justify-center">
          <svg
            className={baseClasses}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle
              cx="12"
              cy="9"
              r="3"
              className={`${
                animated ? "text-yellow-400 animate-pulse" : "text-yellow-400"
              }`}
              fill="currentColor"
              stroke="none"
            ></circle>
            <path
              d="M12 2v2"
              className="text-yellow-400"
              stroke="currentColor"
            ></path>
            <path
              d="M5.2 5.2l1.4 1.4"
              className="text-yellow-400"
              stroke="currentColor"
            ></path>
            <path
              d="M2 12h2"
              className="text-yellow-400"
              stroke="currentColor"
            ></path>
            <path
              d="M17.4 5.2l-1.4 1.4"
              className="text-yellow-400"
              stroke="currentColor"
            ></path>
            <path
              d="M17 13a5 5 0 0 0-10 0a3 3 0 0 0 0 6h9.5a3.5 3.5 0 0 0 0-7"
              className={animated ? "animate-cloud-drift" : ""}
            ></path>
          </svg>
          {animated && (
            <style jsx>{`
              @keyframes cloudDrift {
                0% {
                  transform: translateX(0);
                }
                50% {
                  transform: translateX(2px);
                }
                100% {
                  transform: translateX(0);
                }
              }
              .animate-cloud-drift {
                animation: cloudDrift 3s ease-in-out infinite;
              }
            `}</style>
          )}
        </div>
      );
    case "sunny":
      return (
        <div className="relative flex items-center justify-center">
          <svg
            className={`${baseClasses} ${animated ? "animate-spin-slow" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle
              cx="12"
              cy="12"
              r="5"
              className="text-yellow-400"
              fill="currentColor"
              stroke="none"
            ></circle>
            <path d="M12 1v2" className="text-yellow-400"></path>
            <path d="M12 21v2" className="text-yellow-400"></path>
            <path d="M4.22 4.22l1.42 1.42" className="text-yellow-400"></path>
            <path d="M18.36 18.36l1.42 1.42" className="text-yellow-400"></path>
            <path d="M1 12h2" className="text-yellow-400"></path>
            <path d="M21 12h2" className="text-yellow-400"></path>
            <path d="M4.22 19.78l1.42-1.42" className="text-yellow-400"></path>
            <path d="M18.36 5.64l1.42-1.42" className="text-yellow-400"></path>
          </svg>
          {animated && (
            <style jsx>{`
              @keyframes spin-slow {
                0% {
                  transform: rotate(0deg);
                }
                100% {
                  transform: rotate(360deg);
                }
              }
              .animate-spin-slow {
                animation: spin-slow 20s linear infinite;
              }
            `}</style>
          )}
        </div>
      );
    case "foggy":
      return (
        <div className="relative flex items-center justify-center">
          <svg
            className={baseClasses}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M5 12h14"
              className={animated ? "animate-fog-move animation-delay-0" : ""}
            ></path>
            <path
              d="M3 18h18"
              className={animated ? "animate-fog-move animation-delay-400" : ""}
            ></path>
            <path
              d="M7 6h10"
              className={animated ? "animate-fog-move animation-delay-200" : ""}
            ></path>
            <path
              d="M5 15h14"
              className={animated ? "animate-fog-move animation-delay-100" : ""}
            ></path>
            <path
              d="M7 9h10"
              className={animated ? "animate-fog-move animation-delay-300" : ""}
            ></path>
          </svg>
          {animated && (
            <style jsx>{`
              @keyframes fogMove {
                0% {
                  transform: translateX(0);
                  opacity: 0.8;
                }
                50% {
                  transform: translateX(3px);
                  opacity: 1;
                }
                100% {
                  transform: translateX(0);
                  opacity: 0.8;
                }
              }
              .animate-fog-move {
                animation: fogMove 3s ease-in-out infinite;
              }
              .animation-delay-0 {
                animation-delay: 0s;
              }
              .animation-delay-100 {
                animation-delay: 0.1s;
              }
              .animation-delay-200 {
                animation-delay: 0.2s;
              }
              .animation-delay-300 {
                animation-delay: 0.3s;
              }
              .animation-delay-400 {
                animation-delay: 0.4s;
              }
            `}</style>
          )}
        </div>
      );
    default:
      return null;
  }
};

export default WeatherIcon;
