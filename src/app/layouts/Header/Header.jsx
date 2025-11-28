import { useState, useEffect } from "react";
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";
import CountrySelect from "../Header/CountrySelect";
import { sLocation } from "../../context/store";

export default function Header() {
  const data = sLocation.use();
  return (
    <div className="absolute top-0 left-0 bg-gray-800/50 text-white w-full py-2 grid grid-cols-3 gap-4 justify-items-center z-50 px-7">
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-[70px] h-auto" />
        </Link>
      </div>

      <div className="flex-1 flex justify-center  items-center space-x-7">
        <Link
          to="/"
          className="text-xl hover:text-yellow-400 active:text-white  transition duration-200 ease-in-out"
        >
          MY LOCATION
        </Link>
        <Link
          to={`/detail?search=${data.countryName}&lat=${data.lat}&lon=${data.lon}`}
          className="text-xl hover:text-yellow-400 active:text-white  transition duration-200 ease-in-out"
        >
          FORECAST
        </Link>
        
      </div>

      <div className="flex items-center ">
        <CountrySelect />
      </div>
    </div>
  );
}
