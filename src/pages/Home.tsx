import React from 'react';
import Header from '../components/Header';
import CarShowcase from '../components/CarShowcase';
import AboutSection from '../components/AboutSection';
import SalesConditions from '../components/SalesConditions';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const Home: React.FC = () => {
  return (
    <div className="font-sans relative">
      <Header />
      <main>
        <CarShowcase />
        <AboutSection />
        <SalesConditions />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Home;