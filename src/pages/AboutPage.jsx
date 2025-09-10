import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '../components/landing/Header';
import Footer from '../components/landing/Footer';

const AboutPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  const timeline = [
    {
      year: '2020',
      title: 'Awal Mula',
      description: 'CV. Central Plastik didirikan di Pajangan, Bantul Yogyakarta sebagai usaha kecil home industri',
      icon: '🏭'
    },
    {
      year: '2021',
      title: 'Ekspansi Produksi',
      description: 'Memperluas kapasitas produksi dengan berbagai ukuran dan variasi plastik shrink',
      icon: '📈'
    },
    {
      year: '2022',
      title: 'Pendirian PT',
      description: 'Resmi mendirikan PT. Central Blessindo Indonesia pada 23 Maret 2022',
      icon: '🏢'
    }
  ];

  const achievements = [
    {
      number: '3+',
      label: 'Tahun Pengalaman',
      description: 'Dalam industri plastik shrink'
    },
    {
      number: '100+',
      label: 'Klien Puas',
      description: 'Dari berbagai industri'
    },
    {
      number: '50+',
      label: 'Variasi Produk',
      description: 'Plastik shrink berkualitas'
    },
    {
      number: '24/7',
      label: 'Pelayanan',
      description: 'Dukungan penuh untuk klien'
    }
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Kualitas Terjamin',
      description: 'Produk berkualitas tinggi dengan standar internasional dan kontrol mutu yang ketat'
    },
    {
      icon: '🚀',
      title: 'Inovasi Berkelanjutan',
      description: 'Terus berinovasi dalam teknologi dan mencari solusi terbaik untuk kebutuhan pelanggan'
    },
    {
      icon: '🤝',
      title: 'Pelayanan Terbaik',
      description: 'Memberikan pelayanan terbaik dan dukungan penuh untuk kepuasan pelanggan'
    },
    {
      icon: '🌱',
      title: 'Pertumbuhan Berkelanjutan',
      description: 'Berkomitmen untuk pertumbuhan yang berkelanjutan dan ramah lingkungan'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col pt-24">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto" data-aos="fade-up">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Tentang <span className="text-primary-600">PT. Central Blessindo</span> Indonesia
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Perjalanan kami dimulai dari sebuah usaha kecil hingga menjadi perusahaan terpercaya 
              dalam industri plastik shrink di Indonesia
            </p>
            <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Cerita Kami</h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  PT. Central Blessindo Indonesia didirikan pada tahun 2022, dimulai dari sebuah usaha kecil 
                  yang bernama CV. Central Plastik yang terletak di Pajangan, Bantul Yogyakarta. Awalnya 
                  PT. Central Blessindo Indonesia memproduksi plastik shrink secara home industri dan 
                  memperkerjakan masyarakat sekitar yang kehilangan pekerjaan akibat pandemi di tahun 2020.
                </p>
                <p>
                  Kemudian pada tahun 2021 perusahaan memperluas kapasitas produksi dengan memproduksi 
                  plastik shrink dengan berbagai ukuran, dan variasi lain (perforasi dengan jaw head, 
                  flat, flat siku, plong) dan berbekal pengalaman dan kemampuan yang bergerak di bidang 
                  supplier plastik PVC Shrink Film maka pada 23 Maret 2022 resmi mendirikan badan usaha 
                  dengan nama PT. Central Blessindo Indonesia.
                </p>
                <p>
                  Untuk memenuhi permintaan pelanggan, kami secara bertahap memperluas bisnis kami dengan 
                  membantu memenuhi kebutuhan plastik shrink untuk berbagai bentuk kemasan dan jenis PVC 
                  Shrink Film. Kepuasan pelanggan kami adalah prioritas pertama kami. Oleh karena itu 
                  kami terus mengevaluasi kinerja dan kualitas kerja kami.
                </p>
              </div>
            </div>
            
            <div data-aos="fade-left" data-aos-delay="200">
              <div className="relative">
                <div className="bg-gradient-to-br from-primary-500 to-secondary-600 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-6">Visi & Misi Kami</h3>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3 flex items-center">
                      <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm">👁️</span>
                      </span>
                      Visi
                    </h4>
                    <p className="text-sm opacity-90">
                      Menjadi Perusahaan plastik terkemuka yang memberikan solusi inovatif untuk kemasan plastik
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-3 flex items-center">
                      <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm">🎯</span>
                      </span>
                      Misi
                    </h4>
                    <p className="text-sm opacity-90">
                      Kami memastikan spesifikasi yang tepat berdasarkan kebutuhan konsumen dengan berinovasi 
                      dan mendukung informasi dan teknologi
                    </p>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent-500 rounded-full opacity-20"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-300 rounded-full opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Perjalanan Kami</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dari usaha kecil hingga menjadi perusahaan terpercaya dalam industri plastik shrink
            </p>
            <div className="w-24 h-1 bg-primary-600 mx-auto mt-6"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200"></div>
              
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`} data-aos={`fade-${index % 2 === 0 ? 'right' : 'left'}`} data-aos-delay={index * 200}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="text-4xl mb-3">{item.icon}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <div className="text-primary-600 font-semibold mb-2">{item.year}</div>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow-lg"></div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pencapaian Kami</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bukti komitmen kami dalam memberikan yang terbaik untuk pelanggan
            </p>
            <div className="w-24 h-1 bg-primary-600 mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center p-8 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="text-4xl font-bold text-primary-600 mb-2">{achievement.number}</div>
                <div className="text-xl font-semibold text-gray-900 mb-2">{achievement.label}</div>
                <div className="text-gray-600 text-sm">{achievement.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nilai-Nilai Kami</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Prinsip-prinsip yang menjadi fondasi dalam setiap langkah kami
            </p>
            <div className="w-24 h-1 bg-primary-600 mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-8 bg-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Siap Bekerja Sama dengan Kami?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Mari wujudkan kebutuhan kemasan plastik Anda dengan solusi terbaik dari PT. Central Blessindo Indonesia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-600 bg-white rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Hubungi Kami
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white rounded-full hover:bg-white hover:text-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Lihat Produk
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;


