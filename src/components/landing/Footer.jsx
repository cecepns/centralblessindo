import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div>
                <h3 className="text-lg font-bold">PT. Central Blessindo</h3>
                <p className="text-sm text-gray-400">Indonesia</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Menyediakan solusi inovatif untuk kemasan plastik dengan kualitas terbaik 
              dan pelayanan yang memuaskan untuk semua kebutuhan industri Anda.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Tautan Cepat</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#products" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Products
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Produk Kami</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-300 text-sm">PVC</span>
              </li>
              <li>
                <span className="text-gray-300 text-sm">POF Shrink</span>
              </li>
              <li>
                <span className="text-gray-300 text-sm">Perforasi</span>
              </li>
              <li>
                <span className="text-gray-300 text-sm">Flat Siku</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} PT. Central Blessindo Indonesia. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-6">
              <a
                href="mailto:sales@centralblessindonesia.com"
                className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                Email
              </a>
              <a
                href="https://wa.me/085212278277"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                WhatsApp
              </a>
              <a
                href="https://www.centralblessindonesia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                Website
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;