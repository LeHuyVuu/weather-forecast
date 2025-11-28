import React from 'react';
import background from '../../assets/blackfooter.jpg'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png';

const Footer = () => {
  return (
    <footer
      className="bg-gray-900 py-6  h-96 flex flex-col justify-between"

    >
      <div>
        <div className=" mx-auto flex justify-between items-center px-6">
          <div className="text-xl font-semibold text-gray-300">
            <Link to="/">
              <img src={logo} className="w-20" />
            </Link>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="/for-designers" className="text-gray-300 hover:text-blue-500">
                  For Designers
                </a>
              </li>
              <li>
                <a href="/hire-talent" className="text-gray-300 hover:text-blue-500">
                  Hire Talent
                </a>
              </li>
              <li>
                <a href="/inspiration" className="text-gray-300 hover:text-blue-500">
                  Inspiration
                </a>
              </li>
              <li>
                <a href="/advertising" className="text-gray-300 hover:text-blue-500">
                  Advertising
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-300 hover:text-blue-500">
                  Blog
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-blue-500">
                  About
                </a>
              </li>
              <li>
                <a href="/careers" className="text-gray-300 hover:text-blue-500">
                  Careers
                </a>
              </li>
              <li>
                <a href="/support" className="text-gray-300 hover:text-blue-500">
                  Support
                </a>
              </li>
            </ul>
          </nav>
          <div className="flex space-x-4">
            <a
              href="https://twitter.com"

              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-500"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-500"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-500"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-500"
            >
              <i className="fab fa-pinterest"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="flex justify-center space-x-6 mb-6">
  <div class="flex flex-col items-center">
    <div class="bg-gray-400 rounded-full shadow-md p-2">
      <img class="w-8" src="https://openweathermap.org/img/wn/01d@2x.png" />
    </div>
    <p class="mt-2 text-white text-sm">Sunny</p>
  </div>

  <div class="flex flex-col items-center">
    <div class="bg-gray-400 rounded-full shadow-md p-2">
      <img class="w-8" src="https://openweathermap.org/img/wn/02d@2x.png" />
    </div>
    <p class="mt-2 text-white text-sm">Cloudy</p>
  </div>

  <div class="flex flex-col items-center">
    <div class="bg-gray-400 rounded-full shadow-md p-2">
      <img class="w-8" src="https://openweathermap.org/img/wn/09d@2x.png" />
    </div>
    <p class="mt-2 text-white text-sm">Rain</p>
  </div>

  <div class="flex flex-col items-center">
    <div class="bg-gray-400 rounded-full shadow-md p-2">
      <img class="w-8" src="https://openweathermap.org/img/wn/11d@2x.png" />
    </div>
    <p class="mt-2 text-white text-sm">Storm</p>
  </div>

  <div class="flex flex-col items-center">
    <div class="bg-gray-400 rounded-full shadow-md p-2">
      <img class="w-8" src="https://openweathermap.org/img/wn/13d@2x.png" />
    </div>
    <p class="mt-2 text-white text-sm">Snow</p>
  </div>
</div>

      <p class="text-lg text-center   font-medium text-gray-200 mb-4">Your trusted source for real-time,
        reliable weather updates – wherever you are.</p>
      <hr className="border-t border-gray-500 mx-4" />
      <div className="  flex justify-between items-center px-6">
        <div className="flex space-x-4">
          <span className="text-gray-300">© 2025 Dribbble</span>
        </div>
        <div className="flex space-x-4">
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="/terms" className="text-gray-300 hover:text-blue-500">
                  Terms
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-300 hover:text-blue-500">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/cookies" className="text-gray-300 hover:text-blue-500">
                  Cookies
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
