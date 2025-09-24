import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import HeroBanner from "../../assets/hero.jpeg";

const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section
      id="home"
      className="pt-24 relative min-h-screen flex items-center justify-center bg-primary-600 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Ccircle cx='7' cy='7' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left" data-aos="fade-right">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6 italic">
              &quot;Your Partner in Plastic Packaging&quot;
            </h1>

            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Selamat datang di PT. Central Blessindo Indonesia penyedia
              plastik PVC shrink, POF Shrink dll. Berkualitas tinggi dengan
              layanan custom model dan ukuran sesuai kebutuhan bisnis Anda.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#products"
                className="bg-amber-600 text-white inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <span>Lihat Produk</span>
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>

              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-primary-600 bg-white border-2 border-primary-600 rounded-full hover:bg-amber-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Hubungi Kami
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">10+</div>
                <div className="text-white">Tahun Pengalaman</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-600">
                  500+
                </div>
                <div className="text-white">Klien Puas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-600">100%</div>
                <div className="text-white">Kualitas Terjamin</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative" data-aos="fade-left" data-aos-delay="200">
            <div className="relative z-10">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img src={HeroBanner} alt="herobanner" />
                {/* <div className="aspect-square bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-primary-600 rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Kualitas Premium</h3>
                    <p className="text-gray-600">Produk berkualitas tinggi dengan standar internasional</p>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute top-10 -right-10 w-20 h-20 bg-primary-400 rounded-full opacity-20 animate-pulse"></div>
            <div
              className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary-200 rounded-full opacity-20 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        data-aos="fade-up"
        data-aos-delay="1000"
      >
        <svg
          className="w-6 h-6 text-white/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
