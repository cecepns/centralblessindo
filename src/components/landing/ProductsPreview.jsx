import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import { productsAPI, API_BASE_URL_IMAGE } from '../../utils/api';

const ProductsPreview = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
    const fetchTopProducts = async () => {
      setLoading(true);
      try {
        const response = await productsAPI.getPublic(1, 4, 1);
        if (response.data?.success) {
          setProducts(response.data.data.products || []);
        } else if (Array.isArray(response.data)) {
          // Fallback if API returns array directly
          setProducts(response.data.slice(0, 4));
        }
      } catch (err) {
        console.error('Error fetching preview products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopProducts();
  }, []);

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Produk Unggulan</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Beberapa produk pilihan kami untuk kebutuhan kemasan Anda
          </p>
          <div className="w-24 h-1 bg-primary-600 mx-auto mt-6"></div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div
                key={product.id || index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="relative overflow-hidden h-48 bg-gray-100">
                  {product.image_url ? (
                    <img
                      src={`${API_BASE_URL_IMAGE}${product.image_url}`}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                    {product.name}
                  </h3>
                  {product.price ? (
                    <div className="text-secondary-600 font-semibold mb-3">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(product.price)}
                    </div>
                  ) : null}
                  <div className="text-gray-600 text-sm line-clamp-3" dangerouslySetInnerHTML={{ __html: product.description || '' }} />

                  <Link
                    to={`/product/${product.id}`}
                    className="mt-4 w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors duration-300 font-medium block text-center"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-12" data-aos="fade-up">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum ada produk</h3>
            <p className="text-gray-600">Produk akan segera tersedia.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsPreview;


