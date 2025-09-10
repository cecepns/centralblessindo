import React from 'react';
import Header from '../components/landing/Header';
import Footer from '../components/landing/Footer';
import Products from '../components/landing/Products';

const ProductsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20 overflow-x-hidden">
        <section>
          <Products />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;


