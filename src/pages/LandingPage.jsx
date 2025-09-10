import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import About from '../components/landing/About';
import ProductsPreview from '../components/landing/ProductsPreview';
import Footer from '../components/landing/Footer';
import OurClients from '../components/landing/OurClients';

const LandingPage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <About />
        <ProductsPreview />
        <OurClients />
        {/* <Contact /> */}
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;