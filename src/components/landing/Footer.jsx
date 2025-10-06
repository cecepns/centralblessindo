import React from "react";
import { Link } from "react-router-dom";

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
                <h3 className="text-lg font-bold italic">
                  &quot;Your Partner in Plastic Packaging&quot;
                </h3>
                {/* <p className="text-sm text-gray-400">Indonesia</p> */}
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Selamat datang di PT. Central Blessindo Indonesia penyedia plastik
              PVC shrink, POF Shrink dll. Berkualitas tinggi dengan layanan
              custom model dan ukuran sesuai kebutuhan bisnis Anda.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Tautan Cepat</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-primary-400 transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-primary-400 transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-300 hover:text-primary-400 transition-colors text-sm"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-primary-400 transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          {/* <div>
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
          </div> */}

          <div>
            <h4 className="text-lg font-semibold mb-4">Alamat</h4>
            <div className="text-gray-300 text-sm leading-relaxed">
              Perumahan The Greenhill Cluster Bayhill Blok B3 No. 14D Pondok
              Rajeg Cibinong Bogor 16914
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        {/* <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} PT. Central Blessindo Indonesia. All rights
              reserved.
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
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
