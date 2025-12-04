import { useState, useEffect } from "react";
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";
import CountrySelect from "../Header/CountrySelect";
import { sLocation } from "../../context/store";
import { FaMapMarkerAlt, FaCloudSun, FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const data = sLocation.use();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b backdrop-blur-[20px] ${
        scrolled 
          ? 'bg-slate-900/95 border-slate-700/10 shadow-[0_10px_40px_rgba(0,0,0,0.4)]' 
          : 'bg-slate-900/80 border-slate-700/10 shadow-[0_4px_30px_rgba(0,0,0,0.2)]'
      }`} style={{ backdropFilter: 'blur(20px) saturate(180%)' }}>
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-60 pointer-events-none" style={{
          background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)'
        }}></div>
        <div className="absolute inset-0 animate-header-shine pointer-events-none" style={{
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.03), transparent)'
        }}></div>
        
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-16 md:h-24">
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-3 relative z-10">
              <div className="relative p-1 rounded-full animate-logo-rotate" style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)'
              }}>
                <img src={logo} alt="Logo" className="w-12 h-12 md:w-16 md:h-16 object-contain" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-base md:text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Weather Forecast
                </h1>
                <p className="text-[10px] md:text-xs text-gray-300">Real-time updates</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2 relative z-10">
              <Link to="/" className="group relative flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-sm font-semibold overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-purple-600/60 hover:text-white hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(147,51,234,0.4)]">
                <FaMapMarkerAlt className="text-base transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[10deg]" />
                <span>My Location</span>
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" style={{
                  background: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.3), transparent 70%)'
                }}></div>
              </Link>
              <Link
                to={`/detail?search=${data.countryName}&lat=${data.lat}&lon=${data.lon}`}
                className="group relative flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-sm font-semibold overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-purple-600/60 hover:text-white hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(147,51,234,0.4)]"
              >
                <FaCloudSun className="text-base transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[10deg]" />
                <span>Forecast</span>
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" style={{
                  background: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.3), transparent 70%)'
                }}></div>
              </Link>
            </nav>

            {/* Search & Mobile Menu */}
            <div className="flex items-center space-x-3 md:space-x-4 relative z-10">
              <div className="hidden md:block">
                <CountrySelect />
              </div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white transition-all duration-300 hover:bg-white/10 hover:scale-105"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-slate-900/98 backdrop-blur-[20px] border-b border-slate-700/10 overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-96' : 'max-h-0'
        }`}>
          <div className="px-4 py-4 space-y-3">
            <Link
              to="/"
              className="flex items-center px-4 py-3 rounded-lg bg-white/5 text-slate-200 font-semibold transition-all duration-300 hover:bg-white/10 hover:text-white hover:translate-x-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaMapMarkerAlt className="mr-3" />
              My Location
            </Link>
            <Link
              to={`/detail?search=${data.countryName}&lat=${data.lat}&lon=${data.lon}`}
              className="flex items-center px-4 py-3 rounded-lg bg-white/5 text-slate-200 font-semibold transition-all duration-300 hover:bg-white/10 hover:text-white hover:translate-x-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaCloudSun className="mr-3" />
              Forecast
            </Link>
            <div className="pt-3 border-t border-white/10">
              <CountrySelect />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
