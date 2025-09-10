import { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link, Link as RouterLink } from 'react-router-dom';
import Logo from '../../assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', to: '/' },
    { name: 'About Us', to: '/about' },
    { name: 'Products', to: '/products' },
    { name: 'Contact Us', to: '/contact' },
  ];

  return (
    <header className={`
      fixed w-full top-0 z-50 transition-all duration-300
      ${isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'}
    `}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/">
              <img src={Logo} className="w-20 h-auto" alt="logo" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => {
              const isRoute = typeof item.to === 'string' && item.to.startsWith('/');
              return isRoute ? (
                <RouterLink
                  key={item.to}
                  to={item.to}
                  className="text-gray-700 hover:text-primary-600 cursor-pointer font-medium transition-colors duration-200"
                >
                  {item.name}
                </RouterLink>
              ) : (
                <ScrollLink
                  key={item.to}
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="text-gray-700 hover:text-primary-600 cursor-pointer font-medium transition-colors duration-200"
                  activeClass="text-primary-600"
                >
                  {item.name}
                </ScrollLink>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => {
                const isRoute = typeof item.to === 'string' && item.to.startsWith('/');
                return isRoute ? (
                  <RouterLink
                    key={item.to}
                    to={item.to}
                    className="text-gray-700 hover:text-primary-600 cursor-pointer font-medium transition-colors duration-200 px-4 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </RouterLink>
                ) : (
                  <ScrollLink
                    key={item.to}
                    to={item.to}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className="text-gray-700 hover:text-primary-600 cursor-pointer font-medium transition-colors duration-200 px-4 py-2"
                    activeClass="text-primary-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </ScrollLink>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;