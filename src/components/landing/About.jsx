import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import { settingsAPI } from '../../utils/api';

const About = () => {
  const [settings, setSettings] = useState({
    company_name: 'PT. CENTRAL BLESSINDO INDONESIA',
    vision_en: 'To be a plastic company that provides innovative solutions for plastic packaging',
    vision_id: 'Menjadi Perusahaan plastik terkemuka yang memberikan solusi inovatif untuk kemasan plastic',
    mission_en: 'We ensure proper specification based on consumer\'s needs by innovating and supporting of information and technology',
    mission_id: 'Kami memastikan spesifikasi yang tepat berdasarkan kebutuhan konsumen dengan berinovasi dan mendukung informasi dan teknologi'
  });

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
    
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await settingsAPI.get();
      if (response.data.success) {
        setSettings(response.data.data);
      }
    } catch (error) {
      console.log('Using default settings');
    }
  };

  const features = [
    {
      icon: '🎯',
      title: 'Spesifikasi Tepat',
      description: 'Produk sesuai dengan kebutuhan dan spesifikasi konsumen'
    },
    {
      icon: '🚀',
      title: 'Inovasi Berkelanjutan',
      description: 'Terus berinovasi dalam teknologi dan informasi terkini'
    },
    {
      icon: '⭐',
      title: 'Pelayanan Terbaik',
      description: 'Memberikan pelayanan terbaik untuk kepuasan pelanggan'
    },
    {
      icon: '🏆',
      title: 'Kualitas Terjamin',
      description: 'Standar kualitas tinggi dengan kontrol mutu yang ketat'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Tentang Kami</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {settings.company_name} berkomitmen memberikan solusi terbaik untuk kebutuhan kemasan plastik industri Anda
          </p>
          <div className="w-24 h-1 bg-primary-600 mx-auto mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Left Content */}
          <div data-aos="fade-right">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">👁️</span>
                  </span>
                  Visi Kami
                </h3>
                <div className="bg-primary-50 p-6 rounded-xl border-l-4 border-primary-600">
                  <p className="text-gray-700 mb-3 font-medium">{settings.vision_id}</p>
                  <p className="text-gray-600 italic text-sm">{settings.vision_en}</p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-secondary-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">🎯</span>
                  </span>
                  Misi Kami
                </h3>
                <div className="bg-secondary-50 p-6 rounded-xl border-l-4 border-secondary-600">
                  <p className="text-gray-700 mb-3 font-medium">{settings.mission_id}</p>
                  <p className="text-gray-600 italic text-sm">{settings.mission_en}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div data-aos="fade-left" data-aos-delay="200">
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-500 to-secondary-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Mengapa Memilih Kami?</h3>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="text-2xl">{feature.icon}</div>
                      <div>
                        <h4 className="font-semibold mb-1">{feature.title}</h4>
                        <p className="text-sm opacity-90">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent-500 rounded-full opacity-20"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-300 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>

        {/* Company Values */}
        <div className="grid md:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="400">
          <div className="text-center p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Kualitas</h3>
            <p className="text-gray-600">Produk berkualitas tinggi dengan standar internasional dan kontrol mutu yang ketat</p>
          </div>

          <div className="text-center p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Inovasi</h3>
            <p className="text-gray-600">Terus berinovasi dalam teknologi dan mencari solusi terbaik untuk kebutuhan pelanggan</p>
          </div>

          <div className="text-center p-8 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
            <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Pelayanan</h3>
            <p className="text-gray-600">Memberikan pelayanan terbaik dan dukungan penuh untuk kepuasan pelanggan</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;