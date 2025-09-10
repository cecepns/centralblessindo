import React, { useState, useEffect } from 'react';
import { API_BASE_URL_IMAGE, clientsAPI } from '../../utils/api';
import toast from 'react-hot-toast';

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    logo_url: '',
    website: '',
    description: '',
    is_active: true,
    sort_order: 0
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await clientsAPI.getAll();
      if (response.data.success) {
        setClients(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast.error('Gagal mengambil data klien');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('logo', file);

      const response = await clientsAPI.uploadLogo(formData);
      if (response.data.success) {
        setFormData(prev => ({
          ...prev,
          logo_url: response.data.data.logoUrl
        }));
        toast.success('Logo berhasil diupload');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Gagal upload logo');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingClient) {
        await clientsAPI.update(editingClient.id, formData);
        toast.success('Klien berhasil diupdate');
      } else {
        await clientsAPI.create(formData);
        toast.success('Klien berhasil ditambahkan');
      }
      
      setShowModal(false);
      setEditingClient(null);
      setFormData({
        name: '',
        logo_url: '',
        website: '',
        description: '',
        is_active: true,
        sort_order: 0
      });
      fetchClients();
    } catch (error) {
      console.error('Submit error:', error);
      toast.error(editingClient ? 'Gagal update klien' : 'Gagal menambah klien');
    }
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      logo_url:  client.logo_url || '',
      website: client.website || '',
      description: client.description || '',
      is_active: client.is_active,
      sort_order: client.sort_order || 0
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus klien ini?')) {
      return;
    }

    try {
      await clientsAPI.delete(id);
      toast.success('Klien berhasil dihapus');
      fetchClients();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Gagal menghapus klien');
    }
  };

  const openModal = () => {
    setEditingClient(null);
    setFormData({
      name: '',
      logo_url: '',
      website: '',
      description: '',
      is_active: true,
      sort_order: 0
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingClient(null);
    setFormData({
      name: '',
      logo_url: '',
      website: '',
      description: '',
      is_active: true,
      sort_order: 0
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Klien</h1>
          <p className="text-gray-600 mt-2">Kelola logo dan informasi klien perusahaan</p>
        </div>
        <button
          onClick={openModal}
          className="btn btn-primary"
        >
          <span className="mr-2">+</span>
          Tambah Klien
        </button>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {clients.map((client) => (
          <div key={client.id} className="card">
            <div className="card-body">
              <div className="flex items-center justify-center mb-4">
                {client.logo_url ? (
                  <img
                    src={`${API_BASE_URL_IMAGE}${client.logo_url}`}
                    alt={client.name}
                    className="max-h-16 w-auto object-contain"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-xs">No Logo</span>
                  </div>
                )}
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2 text-center">{client.name}</h3>
              
              {client.website && (
                <p className="text-sm text-gray-600 mb-2 text-center">
                  <a 
                    href={client.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700"
                  >
                    {client.website}
                  </a>
                </p>
              )}
              
              <div className="flex items-center justify-center mb-3">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  client.is_active 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {client.is_active ? 'Aktif' : 'Tidak Aktif'}
                </span>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(client)}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(client.id)}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {clients.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">👥</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada klien</h3>
          <p className="text-gray-600 mb-4">Tambahkan klien pertama Anda untuk memulai</p>
          <button
            onClick={openModal}
            className="btn btn-primary"
          >
            Tambah Klien Pertama
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closeModal}></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                        {editingClient ? 'Edit Klien' : 'Tambah Klien Baru'}
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nama Klien *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="form-input"
                            required
                            placeholder="Masukkan nama klien"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Logo
                          </label>
                          <div className="flex items-center space-x-4">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileUpload(e.target.files[0])}
                              className="form-input"
                              disabled={uploading}
                            />
                            {uploading && (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                            )}
                          </div>
                          {formData.logo_url && (
                            <div className="mt-2">
                              <img
                                src={`${API_BASE_URL_IMAGE}${formData.logo_url}`}
                                alt="Preview"
                                className="h-16 w-auto object-contain"
                              />
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Website
                          </label>
                          <input
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            className="form-input"
                            placeholder="https://example.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Deskripsi
                          </label>
                          <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="form-input"
                            rows="3"
                            placeholder="Deskripsi singkat tentang klien"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Urutan Tampil
                            </label>
                            <input
                              type="number"
                              name="sort_order"
                              value={formData.sort_order}
                              onChange={handleInputChange}
                              className="form-input"
                              min="0"
                            />
                          </div>

                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              name="is_active"
                              checked={formData.is_active}
                              onChange={handleInputChange}
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-700">
                              Aktif
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {editingClient ? 'Update' : 'Simpan'}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientManagement;
