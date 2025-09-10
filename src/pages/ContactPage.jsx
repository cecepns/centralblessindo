import React from 'react';
import Header from '../components/landing/Header';
import Footer from '../components/landing/Footer';
import Contact from '../components/landing/Contact';

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20 overflow-x-hidden">
        <section className="mx-auto">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;


