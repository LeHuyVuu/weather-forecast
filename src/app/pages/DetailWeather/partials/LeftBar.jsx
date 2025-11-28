import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react'
import { FaAngleDoubleRight, FaCloud, FaCloudSun, FaCompressArrowsAlt, FaLocationArrow, FaMapMarkerAlt, FaTemperatureHigh, FaTint, FaWind } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { sLocation } from "../../../context/store.js";
import { sSelection } from "../../../context/store.js";
import { Clock } from '../../../components/WeatherForecastChart.jsx';
import { loadGoogleMapsAPI } from '../../../../utils/googleMapsLoader.js';
import { color } from 'framer-motion';

export default function LeftBar() {

    const data = sLocation.use();
    const DataSelection = sSelection.use();

    const current = data.current;
    const coordinates = data.lat;
    const secondcoordinates = data.lon;

    const date = new Date((current.dt || Date.now()) * 1000);
    const day = date.toLocaleDateString(undefined, { weekday: 'long' });
    const time = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    const convertKelvinToCelsius = useCallback((kelvin) => {
        return kelvin ? (kelvin - 273.15).toFixed(1) : "--";
    }, []);


    const navigate = useNavigate();
    const mapRef = useRef(null);

    useEffect(() => {
        // Load Google Maps API first
        const initMap = async () => {
            try {
                await loadGoogleMapsAPI();
                
                // Check if Google Maps API is loaded
                if (!window.google || !window.google.maps) {
                    console.warn('Google Maps API not loaded yet');
                    return;
                }

                const map = new window.google.maps.Map(mapRef.current, {
                    center: { lat: parseFloat(data.lat ? data.lat : DataSelection.lat), lng: parseFloat(data.lon ? data.lon : DataSelection.lon) },
                    zoom: 3,
                });

                // Hàm thêm marker
                const addMarker = (location, map) => {
                    new window.google.maps.Marker({
                        position: location,
                        map: map,
                        title: 'Địa điểm đã chọn',
                    });
                };

                // Thêm sự kiện nhấp chuột vào bản đồ
                map.addListener('click', (event) => {
                    const name = `NoName${Math.random().toString(36).substring(2, 5).replace(' ', '%20')}`;
                    const lat = event.latLng.lat().toFixed(2);
                    const lng = event.latLng.lng().toFixed(2);
                    console.log(`Latitude: ${lat}, Longitude: ${lng}`);

                    sSelection.set((prev) => {
                        prev.value.countryName = `lat[${lat}]-lon[${lng}`;
                        prev.value.lat = lat;
                        prev.value.lon = lng;
                    })
                    
                    addMarker(event.latLng, map);
                    navigate(`/detail?search=lat[${lat}]-lon[${lng}]&lat=${lat}&lon=${lng}`);
                    // Lưu vào Signify, gọi api
                });
            } catch (error) {
                console.error('Failed to load Google Maps:', error);
            }
        };

        initMap();
    }, [data.lat, data.lon, DataSelection.lat, DataSelection.lon, navigate]);

    return (
        <>

            {/* Phần thông tin bên trái skew-y-6 */}
            <div className="relative rounded-xl overflow-hidden w-full mx-auto p-6 mt-6 align-it transform z-10 leftcontent">
                <div className="flex justify-between items-center p-3 bg-white opacity-60 rounded-xl">
                    <div>
                        <p className="text-gray-500 text-[10px]">Current Location</p>
                        <h1 className="text-[15px] font-semibold flex items-center">
                            {data.countryName}
                        </h1>

                    </div>
                    {/* <button className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-300 backdrop-blur-md shadow-md hover:bg-white/80 transition">
                        <FaLocationArrow className="text-gray-700 text-xs" />
                    </button> */}
                </div>


                <div className="relative flex justify-between mt-6 gap-4">
                    <div className="relative w-2/5 border-[1px] border-slate-500 rounded-xl overflow-hidden">



                        {/* Weather Image */}
                        <img
                            src={
                                data.current.weather[0]?.main === "Clouds"
                                    ? "https://images.photowall.com/products/55080/cloudy-sky-with-sunbeams.jpg?h=699&q=85"
                                    : data.current.weather[0]?.main === "Clear"
                                        ? "https://assets.isu.pub/document-structure/220304141815-a67c0244ea9b282dd4540c028a552520/v1/2891490b8688f4de258fd8eb40a0271d.jpeg?width=720&quality=85%2C50"
                                        : data.current.weather[0]?.main === "Rain"
                                            ? "https://media.istockphoto.com/id/1257951336/photo/transparent-umbrella-under-rain-against-water-drops-splash-background-rainy-weather-concept.jpg?s=612x612&w=0&k=20&c=lNvbIw1wReb-owe7_rMgW8lZz1zElqs5BOY1AZhyRXs="
                                            : data.current.weather[0]?.main === "Mist"
                                                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbl7j8nXcZev8H6RoVZlcHjHzV4tgacO7oyA&s"
                                                : data.current.weather[0]?.main === "Snow"
                                                    ? "https://i.pinimg.com/736x/06/89/79/068979efe42c931bd6113e13f9f01256.jpg"
                                                    :"https://png.pngtree.com/thumb_back/fw800/background/20210909/pngtree-weather-after-rain-sunset-sky-meteorological-photography-map-image_834574.jpg" // Provide a default image in case none of the conditions match
                            }
                            alt="Weather"
                            className="w-full object-cover h-56"
                        />



                        {/* Weather Details */}
                        <div className="absolute inset-0 flex justify-between p-3 text-gray-300">
                            <div className="flex justify-between space-x-2">
                                <span className="text-xl font-semibold" style={{ textShadow: '1px 1px 2px #000, 0 0 2px #000' }}>{convertKelvinToCelsius(data.current.temp)}°C</span>
                            </div>
                            <div className="mt-1">
                                <div className="text-[15px] text-right opacity-90" style={{ textShadow: '1px 1px 2px #000, 0 0 2px #000' }}>{day} <Clock /></div>
                                <div className="text-[10px] text-right opacity-90">{current.weather.description || current.weather.main}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center relative w-3/5 h-auto  border-[1px] border-slate-500 rounded-xl overflow-hidden"
                        ref={mapRef}
                    >
                    </div>

                </div>

                <div className="mt-6 bg-white rounded-xl shadow-xl p-6 bg-opacity-60 w-full">
                    <div className="grid gap-2 rounded-xl">
                        <div className="">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">🌤 Weather Information</h2>
                            <div className="grid grid-cols-6 md:grid-cols-3 sm:grid-cols-2 gap-3">

                                {/* Temperature */}
                                <div className="border border-gray-300 bg-white p-3 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center text-center">
                                    <div className="text-blue-500 text-lg"><FaTemperatureHigh /></div>
                                    <p className="text-xs font-semibold text-gray-600 mt-2 mb-1">Temperature</p>
                                    <p className="text-sm font-bold text-gray-900">{convertKelvinToCelsius(data.current.temp)}°C</p>
                                </div>

                                {/* Humidity */}
                                <div className="border border-gray-300 bg-white p-3 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center text-center">
                                    <div className="text-blue-500 text-lg"><FaTint /></div>
                                    <p className="text-xs font-semibold text-gray-600 mt-2 mb-1">Humidity</p>
                                    <p className="text-sm font-bold text-gray-900">{current.humidity}%</p>
                                </div>

                                {/* Wind Speed */}
                                <div className="border border-gray-300 bg-white p-3 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center text-center">
                                    <div className="text-blue-500 text-lg"><FaWind /></div>
                                    <p className="text-xs font-semibold text-gray-600 mt-2 mb-1">Wind Speed</p>
                                    <p className="text-sm font-bold text-gray-900">{current.wind_speed} km/h</p>
                                </div>

                                {/* Cloud Cover */}
                                <div className="border border-gray-300 bg-white p-3 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center text-center">
                                    <div className="text-blue-500 text-lg"><FaCloud /></div>
                                    <p className="text-xs font-semibold text-gray-600 mt-2 mb-1">Cloud Cover</p>
                                    <p className="text-sm font-bold text-gray-900">{current.clouds}%</p>
                                </div>

                                {/* Pressure */}
                                <div className="border border-gray-300 bg-white p-3 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center text-center">
                                    <div className="text-blue-500 text-lg"><FaCompressArrowsAlt /></div>
                                    <p className="text-xs font-semibold text-gray-600 mt-2 mb-1">Pressure</p>
                                    <p className="text-sm font-bold text-gray-900">{current.pressure} hPa</p>
                                </div>
                                {/* Pressure */}
                                <div className="border border-gray-300 bg-white p-3 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center text-center">
                                    <div className="text-blue-500 text-lg"><FaCloudSun /></div>
                                    <p className="text-xs font-semibold text-gray-600 mt-2 mb-1">UV</p>
                                    <p className="text-sm font-bold text-gray-900">{current.uvi} hPa</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {/* <sLocation.DevTool name='ac' /> */}
            </div>
        </>
    );
}
