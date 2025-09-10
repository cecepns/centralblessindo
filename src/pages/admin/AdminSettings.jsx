import React, { useState, useEffect } from 'react';
import { settingsAPI } from '../../utils/api';
import toast from 'react-hot-toast';

const AdminSettings = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company_name: '',
    address: '',
    phone: '',
    whatsapp: '',
    email: '',
    website: '',
    vision_id: '',
    vision_en: '',
    mission_id: '',
    mission_en: ''
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await settingsAPI.get();
      if (response.data.success) {
        setFormData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await settingsAPI.update(formData);
      if (response.data.success) {
        toast.success('Pengaturan berhasil disimpan');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Gagal menyimpan pengaturan');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.company_name) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Pengaturan Admin</h1>
        <p className="text-gray-600 mt-2">Kelola informasi perusahaan dan website</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Company Information */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">Informasi Perusahaan</h3>
          </div>
          <div className="card-body space-y-4">
            <div>
              <label htmlFor="company_name" className="block text-sm font-medium text-gray-700 mb-1">
                Nama Perusahaan *
              </label>
              <input
                type="text"
                id="company_name"
                name="company_name"
                required
                value={formData.company_name}
                onChange={handleInputChange}
                className="form-input"
                placeholder="PT. Central Blessindo Indonesia"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Alamat *
              </label>
              <textarea
                id="address"
                name="address"
                required
                rows={3}
                value={formData.address}
                onChange={handleInputChange}
                className="form-input resize-none"
                placeholder="Masukkan alamat lengkap perusahaan"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
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
                  placeholder="082210119938"
                />
              </div>

              <div>
                <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp *
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  required
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="085212278277"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
                  placeholder="sales@centralblessindonesia.com"
                />
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                  Website *
                </label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  required
                  value={formData.website}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="www.centralblessindonesia.com"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">Visi & Misi</h3>
          </div>
          <div className="card-body space-y-6">
            {/* Vision */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800 flex items-center">
                <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs mr-2">👁️</span>
                Visi
              </h4>
              
              <div>
                <label htmlFor="vision_id" className="block text-sm font-medium text-gray-700 mb-1">
                  Visi (Bahasa Indonesia) *
                </label>
                <textarea
                  id="vision_id"
                  name="vision_id"
                  required
                  rows={3}
                  value={formData.vision_id}
                  onChange={handleInputChange}
                  className="form-input resize-none"
                  placeholder="Masukkan visi perusahaan dalam bahasa Indonesia"
                />
              </div>

              <div>
                <label htmlFor="vision_en" className="block text-sm font-medium text-gray-700 mb-1">
                  Vision (English) *
                </label>
                <textarea
                  id="vision_en"
                  name="vision_en"
                  required
                  rows={3}
                  value={formData.vision_en}
                  onChange={handleInputChange}
                  className="form-input resize-none"
                  placeholder="Enter company vision in English"
                />
              </div>
            </div>

            {/* Mission */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800 flex items-center">
                <span className="w-6 h-6 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center text-xs mr-2">🎯</span>
                Misi
              </h4>
              
              <div>
                <label htmlFor="mission_id" className="block text-sm font-medium text-gray-700 mb-1">
                  Misi (Bahasa Indonesia) *
                </label>
                <textarea
                  id="mission_id"
                  name="mission_id"
                  required
                  rows={3}
                  value={formData.mission_id}
                  onChange={handleInputChange}
                  className="form-input resize-none"
                  placeholder="Masukkan misi perusahaan dalam bahasa Indonesia"
                />
              </div>

              <div>
                <label htmlFor="mission_en" className="block text-sm font-medium text-gray-700 mb-1">
                  Mission (English) *
                </label>
                <textarea
                  id="mission_en"
                  name="mission_en"
                  required
                  rows={3}
                  value={formData.mission_en}
                  onChange={handleInputChange}
                  className="form-input resize-none"
                  placeholder="Enter company mission in English"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={fetchSettings}
            className="px-6 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary px-6 py-2 flex items-center space-x-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <span>💾</span>
                <span>Simpan Pengaturan</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;