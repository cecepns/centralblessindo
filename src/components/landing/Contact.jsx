import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import { settingsAPI } from '../../utils/api';
import toast from 'react-hot-toast';

const Contact = () => {
  const [settings, setSettings] = useState({
    address: 'Perumahan The Greenhill Cluster Bayhill Blok B3 No. 14D Pondok Rajeg Cibinong Bogor 16914',
    phone: '082210119938',
    whatsapp: '085212278277',
    email: 'sales@centralblessindonesia.com',
    website: 'www.centralblessindonesia.com'
  });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const message = `Halo, saya ${formData.name}%0A%0A` +
                   `Email: ${formData.email}%0A` +
                   `Telepon: ${formData.phone}%0A` +
                   `Subjek: ${formData.subject}%0A%0A` +
                   `Pesan: ${formData.message}`;
    
    const whatsappUrl = `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    
    toast.success('Pesan berhasil dikirim ke WhatsApp!');
  };

  const contactInfo = [
    {
      icon: '📍',
      title: 'Alamat',
      info: settings.address,
      color: 'primary'
    },
    {
      icon: '📞',
      title: 'Telepon',
      info: settings.phone,
      color: 'secondary',
      action: () => window.open(`tel:${settings.phone}`)
    },
    {
      icon: '💬',
      title: 'WhatsApp',
      info: settings.whatsapp,
      color: 'accent',
      action: () => window.open(`https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`)
    },
    {
      icon: '✉️',
      title: 'Email',
      info: settings.email,
      color: 'primary',
      action: () => window.open(`mailto:${settings.email}`)
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Hubungi Kami</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Siap membantu kebutuhan kemasan plastik Anda. Hubungi kami untuk konsultasi dan penawaran terbaik
          </p>
          <div className="w-24 h-1 bg-primary-600 mx-auto mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div data-aos="fade-right">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Informasi Kontak</h3>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className={`
                    flex items-start space-x-4 p-4 rounded-xl transition-all duration-300 cursor-pointer
                    ${item.color === 'primary' ? 'bg-primary-50 hover:bg-primary-100 text-primary-800' : ''}
                    ${item.color === 'secondary' ? 'bg-secondary-50 hover:bg-secondary-100 text-secondary-800' : ''}
                    ${item.color === 'accent' ? 'bg-accent-50 hover:bg-accent-100 text-accent-800' : ''}
                  `}
                  onClick={item.action}
                >
                  <div className="text-2xl">{item.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm opacity-90">{item.info}</p>
                  </div>
                  {item.action && (
                    <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  )}
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-4">Website</h4>
              <a 
                href={`https://${settings.website}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                {settings.website}
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div data-aos="fade-left" data-aos-delay="200">
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Kirim Pesan</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="nama@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Nomor Telepon *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subjek *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Subjek pesan"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Pesan *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-input resize-none"
                    placeholder="Tuliskan pesan Anda disini..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center space-x-2 py-3 text-lg font-semibold"
                >
                  <span>Kirim via WhatsApp</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
                
                <p className="text-sm text-gray-600 text-center">
                  * Pesan akan dikirim melalui WhatsApp untuk respon yang lebih cepat
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;