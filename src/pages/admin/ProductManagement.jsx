import { useState, useEffect, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { productsAPI, categoriesAPI, API_BASE_URL_IMAGE } from '../../utils/api';
import toast from 'react-hot-toast';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    image_url: '',
    tokopedia_link: '',
    shopee_link: '',
    tiktok_link: ''
  });
  const [selectedCategory, setSelectedCategory] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await productsAPI.getAll(currentPage, 10, selectedCategory);
      if (response.data.success) {
        setProducts(response.data.data.products);
        setTotalPages(response.data.data.totalPages);
      }
    } catch {
      toast.error('Gagal memuat produk');
    } finally {
      setLoading(false);
    }
  }, [currentPage, selectedCategory]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts]);

  const fetchCategories = async () => {
    try {
      const response = await categoriesAPI.getAll();
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDescriptionChange = (value) => {
    setFormData({
      ...formData,
      description: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.image_url;

      // Upload image if selected
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append('image', imageFile);
        
        const uploadResponse = await productsAPI.uploadImage(imageFormData);
        if (uploadResponse.data.success) {
          imageUrl = uploadResponse.data.data.imageUrl;
        }
      }

      const productData = {
        ...formData,
        price: formData.price ? parseFloat(formData.price) : null,
        image_url: imageUrl
      };

      if (editingProduct) {
        const response = await productsAPI.update(editingProduct.id, productData);
        if (response.data.success) {
          toast.success('Produk berhasil diupdate');
        }
      } else {
        const response = await productsAPI.create(productData);
        if (response.data.success) {
          toast.success('Produk berhasil ditambahkan');
        }
      }
      
      resetForm();
      setShowModal(false);
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Gagal menyimpan produk');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price || '',
      category_id: product.category_id,
      image_url: product.image_url || '',
      tokopedia_link: product.tokopedia_link || '',
      shopee_link: product.shopee_link || '',
      tiktok_link: product.tiktok_link || ''
    });
    setImagePreview(`${API_BASE_URL_IMAGE}${product.image_url}` || '');
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus produk ini?')) {
      try {
        const response = await productsAPI.delete(id);
        if (response.data.success) {
          toast.success('Produk berhasil dihapus');
          fetchProducts();
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Gagal menghapus produk');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category_id: '',
      image_url: '',
      tokopedia_link: '',
      shopee_link: '',
      tiktok_link: ''
    });
    setEditingProduct(null);
    setImageFile(null);
    setImagePreview('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const formatPrice = (price) => {
    if (!price) return '-';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link'],
      ['clean']
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Produk</h1>
          <p className="text-gray-600 mt-2">Kelola produk Anda</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <span>+</span>
          <span>Tambah Produk</span>
        </button>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-4">
        <label htmlFor="category-filter" className="text-sm font-medium text-gray-700">
          Filter Kategori:
        </label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => handleCategoryFilter(e.target.value)}
          className="form-select w-64"
        >
          <option value="">Semua Kategori</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="card">
        <div className="card-body p-0">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead className="bg-gray-50">
                  <tr>
                    <th>No</th>
                    <th>Gambar</th>
                    <th>Nama Produk</th>
                    <th>Kategori</th>
                    <th>Harga</th>
                    <th>Dibuat</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-12 text-gray-500">
                        Belum ada produk
                      </td>
                    </tr>
                  ) : (
                    products.map((product, index) => (
                      <tr key={product.id}>
                        <td>{(currentPage - 1) * 10 + index + 1}</td>
                        <td>
                          {product.image_url ? (
                            <img
                              src={`${API_BASE_URL_IMAGE}${product.image_url}`}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <span className="text-gray-400 text-xs">No Image</span>
                            </div>
                          )}
                        </td>
                        <td className="font-medium">{product.name}</td>
                        <td className="text-gray-600">
                          {categories.find(cat => cat.id === product.category_id)?.name || '-'}
                        </td>
                        <td className="text-gray-600">{formatPrice(product.price)}</td>
                        <td className="text-gray-500 text-sm">
                          {new Date(product.created_at).toLocaleDateString('id-ID')}
                        </td>
                        <td>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(product)}
                              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm"
                            >
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-gray-600 bg-white rounded-lg border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ‹ Sebelumnya
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-lg font-medium ${
                currentPage === page
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-gray-600 bg-white rounded-lg border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Selanjutnya ›
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col">
            <div className="p-6 flex-1 overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editingProduct ? 'Edit Produk' : 'Tambah Produk'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Produk *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Masukkan nama produk"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-1">
                      Kategori *
                    </label>
                    <select
                      id="category_id"
                      name="category_id"
                      required
                      value={formData.category_id}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Pilih Kategori</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Harga
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Masukkan harga produk"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                    Gambar Produk
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="form-input"
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Deskripsi Produk *
                  </label>
                  <ReactQuill
                    theme="snow"
                    value={formData.description}
                    onChange={handleDescriptionChange}
                    modules={quillModules}
                    placeholder="Masukkan deskripsi produk..."
                    style={{ height: '200px', marginBottom: '20px' }}
                  />
                </div>

                {/* Marketplace Links */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Link Marketplace (Opsional)</h4>
                  
                  <div>
                    <label htmlFor="tokopedia_link" className="block text-sm font-medium text-gray-700 mb-1">
                      Link Tokopedia
                    </label>
                    <input
                      type="url"
                      id="tokopedia_link"
                      name="tokopedia_link"
                      value={formData.tokopedia_link}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="https://www.tokopedia.com/..."
                    />
                  </div>

                  <div>
                    <label htmlFor="shopee_link" className="block text-sm font-medium text-gray-700 mb-1">
                      Link Shopee
                    </label>
                    <input
                      type="url"
                      id="shopee_link"
                      name="shopee_link"
                      value={formData.shopee_link}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="https://shopee.co.id/..."
                    />
                  </div>

                  <div>
                    <label htmlFor="tiktok_link" className="block text-sm font-medium text-gray-700 mb-1">
                      Link TikTok Shop
                    </label>
                    <input
                      type="url"
                      id="tiktok_link"
                      name="tiktok_link"
                      value={formData.tiktok_link}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="https://www.tiktok.com/..."
                    />
                  </div>
                </div>
              </form>
            </div>
            
            {/* Fixed footer with buttons */}
            <div className="p-6 border-t bg-gray-50 rounded-b-lg">
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  onClick={handleSubmit}
                  className="flex-1 btn-primary flex items-center justify-center"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    editingProduct ? 'Update' : 'Simpan'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;