import { useState, useEffect } from 'react';
import { clientsAPI, API_BASE_URL_IMAGE } from '../../utils/api';

const OurClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await clientsAPI.getPublic();
      if (response.data.success) {
        setClients(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
      // Fallback to static assets if API fails
      const modules = import.meta.glob('../../assets/our-clients/*.{png,jpg,jpeg,svg}', { eager: true });
      const images = Object.entries(modules)
        .map(([path, mod]) => ({ path, src: mod.default }))
        .sort((a, b) => a.path.localeCompare(b.path, undefined, { numeric: true }));
      setClients(images.map((img, idx) => ({
        id: idx + 1,
        name: `Client ${idx + 1}`,
        logo_url: img.src,
        website: null
      })));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="our-clients" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Clients</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Dipercaya oleh berbagai perusahaan untuk kebutuhan kemasan plastik mereka.</p>
            <div className="w-24 h-1 bg-primary-600 mx-auto mt-6"></div>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="our-clients" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Clients</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Dipercaya oleh berbagai perusahaan untuk kebutuhan kemasan plastik mereka.</p>
          <div className="w-24 h-1 bg-primary-600 mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 items-center" data-aos="fade-up" data-aos-delay="150">
          {clients.map((client) => (
            <div key={client.id} className="flex items-center justify-center p-4 md:p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              {client.website ? (
                <a
                  href={client.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    src={`${API_BASE_URL_IMAGE}${client.logo_url}`}
                    alt={client.name}
                    className="max-h-14 md:max-h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition duration-300"
                    loading="lazy"
                  />
                </a>
              ) : (
                <img
                  src={`${API_BASE_URL_IMAGE}${client.logo_url}`}
                  alt={client.name}
                  className="max-h-14 md:max-h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition duration-300"
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurClients;
