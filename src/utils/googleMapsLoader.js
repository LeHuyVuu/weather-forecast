/**
 * Google Maps Loader Utility
 * Dynamically loads Google Maps API script
 */

import { googleMapsConfig } from '../config/api.config';

let isLoading = false;
let isLoaded = false;
const callbacks = [];

/**
 * Load Google Maps API
 * @returns {Promise<void>}
 */
export const loadGoogleMapsAPI = () => {
  return new Promise((resolve, reject) => {
    // If already loaded, resolve immediately
    if (isLoaded && window.google && window.google.maps) {
      resolve();
      return;
    }

    // If currently loading, add callback to queue
    if (isLoading) {
      callbacks.push({ resolve, reject });
      return;
    }

    // Start loading
    isLoading = true;

    // Create callback function
    const callbackName = 'initGoogleMaps';
    window[callbackName] = () => {
      isLoaded = true;
      isLoading = false;
      
      // Resolve all waiting callbacks
      callbacks.forEach(cb => cb.resolve());
      callbacks.length = 0;
      
      resolve();
      
      // Clean up
      delete window[callbackName];
    };

    // Create and load script
    const script = document.createElement('script');
    script.src = googleMapsConfig.getScriptUrl(callbackName);
    script.async = true;
    script.defer = true;
    script.onerror = (error) => {
      isLoading = false;
      const errorMsg = 'Failed to load Google Maps API';
      console.error(errorMsg, error);
      
      // Reject all waiting callbacks
      callbacks.forEach(cb => cb.reject(new Error(errorMsg)));
      callbacks.length = 0;
      
      reject(new Error(errorMsg));
    };

    document.head.appendChild(script);
  });
};

/**
 * Check if Google Maps API is loaded
 * @returns {boolean}
 */
export const isGoogleMapsLoaded = () => {
  return isLoaded && window.google && window.google.maps;
};

/**
 * Wait for Google Maps to load with timeout
 * @param {number} timeout - Timeout in milliseconds (default: 10000)
 * @returns {Promise<void>}
 */
export const waitForGoogleMaps = (timeout = 10000) => {
  return new Promise((resolve, reject) => {
    if (isGoogleMapsLoaded()) {
      resolve();
      return;
    }

    const startTime = Date.now();
    const checkInterval = setInterval(() => {
      if (isGoogleMapsLoaded()) {
        clearInterval(checkInterval);
        resolve();
      } else if (Date.now() - startTime > timeout) {
        clearInterval(checkInterval);
        reject(new Error('Google Maps API load timeout'));
      }
    }, 100);
  });
};

export default {
  loadGoogleMapsAPI,
  isGoogleMapsLoaded,
  waitForGoogleMaps,
};
