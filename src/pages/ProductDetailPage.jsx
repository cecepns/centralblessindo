import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import { productsAPI, categoriesAPI, settingsAPI, API_BASE_URL_IMAGE } from '../utils/api';
import Header from '../components/landing/Header';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductDetail = useCallback(async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getById(id);
      if (response.data.success) {
        setProduct(response.data.data);
        // Fetch category details
        const categoryResponse = await categoriesAPI.getAll();
        if (categoryResponse.data.success) {
          const foundCategory = categoryResponse.data.data.find(c => c.id === response.data.data.category_id);
          setCategory(foundCategory);
        }
      } else {
        setError('Gagal memuat data produk');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      if (error.response?.status === 404) {
        setError('Produk tidak ditemukan');
      } else {
        setError('Terjadi kesalahan saat memuat produk');
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
    });
    
    fetchProductDetail();
    fetchSettings();
  }, [id, fetchProductDetail]);

  const fetchSettings = async () => {
    try {
      const response = await settingsAPI.get();
      if (response.data.success) {
        setSettings(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleWhatsAppOrder = () => {
    if (!settings?.whatsapp) {
      alert('Nomor WhatsApp belum dikonfigurasi');
      return;
    }

    const message = `Halo, saya tertarik dengan produk *${product.name}*.\n\n` +
      `Detail produk:\n` +
      `- Nama: ${product.name}\n` +
      `- Kategori: ${category?.name || 'Tidak ada kategori'}\n` +
      `${product.price ? `- Harga: ${formatPrice(product.price)}\n` : ''}` +
      `- Deskripsi: ${product.description?.replace(/<[^>]*>/g, '') || 'Tidak ada deskripsi'}\n\n` +
      `Saya ingin memesan produk ini. Mohon informasi lebih lanjut.`;

    const whatsappUrl = `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleMarketplaceOrder = (platform, url) => {
    window.open(url, '_blank');
  };

  const getAvailableOrderOptions = () => {
    const options = [];
    
    // Always show WhatsApp as default
    options.push({
      type: 'whatsapp',
      label: 'Pesan via WhatsApp',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      ),
      color: 'bg-green-600 hover:bg-green-700',
      action: handleWhatsAppOrder
    });

    // Add marketplace options if links exist
    if (product.tokopedia_link) {
      options.push({
        type: 'tokopedia',
        label: 'Beli di Tokopedia',
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        ),
        color: 'bg-green-500 hover:bg-green-600',
        action: () => handleMarketplaceOrder('tokopedia', product.tokopedia_link)
      });
    }

    if (product.shopee_link) {
      options.push({
        type: 'shopee',
        label: 'Beli di Shopee',
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        ),
        color: 'bg-orange-500 hover:bg-orange-600',
        action: () => handleMarketplaceOrder('shopee', product.shopee_link)
      });
    }

    if (product.tiktok_link) {
      options.push({
        type: 'tiktok',
        label: 'Beli di TikTok Shop',
        icon: (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        ),
        color: 'bg-black hover:bg-gray-800',
        action: () => handleMarketplaceOrder('tiktok', product.tiktok_link)
      });
    }

    return options;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat detail produk...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center overflow-x-hidden">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Produk Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-6">{error || 'Produk yang Anda cari tidak tersedia.'}</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors duration-300"
          >
            Kembali ke Daftar Produk
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Breadcrumb */}
      <div className="bg-white border-b pt-24">
        <div className="container mx-auto px-4 py-4 sticky">
          <nav className="flex items-center space-x-2 text-sm">
            <button
              onClick={() => navigate('/')}
              className="text-gray-500 hover:text-primary-600 transition-colors duration-200"
            >
              Beranda
            </button>
            <span className="text-gray-400">/</span>
            <button
              onClick={() => navigate('/products')}
              className="text-gray-500 hover:text-primary-600 transition-colors duration-200"
            >
              Produk
            </button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4" data-aos="fade-right">
            <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
              {product.image_url ? (
                <img
                  src={`${API_BASE_URL_IMAGE}${product.image_url}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6" data-aos="fade-left">
            {/* Category Badge */}
            {category && (
              <div className="inline-block">
                <span className="bg-primary-100 text-primary-800 text-sm font-semibold px-3 py-1 rounded-full">
                  {category.name}
                </span>
              </div>
            )}

            {/* Product Name */}
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            {product.price && (
              <div className="text-3xl font-bold text-secondary-600">
                {formatPrice(product.price)}
              </div>
            )}

            {/* Description */}
            <div className="prose prose-lg max-w-none">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Deskripsi Produk</h3>
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.description || 'Tidak ada deskripsi tersedia.' }}
              />
            </div>

            {/* Order Buttons */}
            <div className="pt-6 space-y-3">
              {getAvailableOrderOptions().map((option) => (
                <button
                  key={option.type}
                  onClick={option.action}
                  className={`w-full ${option.color} text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3`}
                >
                  {option.icon}
                  <span>{option.label}</span>
                </button>
              ))}
            </div>

            {/* Additional Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h4 className="font-semibold text-blue-900 mb-2">Informasi Pemesanan</h4>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• <strong>WhatsApp:</strong> Klik tombol &quot;Pesan via WhatsApp&quot; untuk langsung terhubung dengan tim kami</li>
                {product.tokopedia_link && <li>• <strong>Tokopedia:</strong> Beli langsung melalui marketplace Tokopedia</li>}
                {product.shopee_link && <li>• <strong>Shopee:</strong> Beli langsung melalui marketplace Shopee</li>}
                {product.tiktok_link && <li>• <strong>TikTok Shop:</strong> Beli langsung melalui TikTok Shop</li>}
                <li>• Sertakan nama produk dan kuantitas yang diinginkan</li>
                <li>• Tim kami akan memberikan informasi harga dan ketersediaan</li>
                <li>• Proses pemesanan akan dipandu oleh customer service kami</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-20" data-aos="fade-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Produk Lainnya</h2>
            <p className="text-gray-600">Jelajahi produk-produk berkualitas lainnya dari kami</p>
            <div className="w-24 h-1 bg-primary-600 mx-auto mt-6"></div>
          </div>
          
          <div className="text-center">
            <button
              onClick={() => navigate('/products')}
              className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
            >
              Lihat Semua Produk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
