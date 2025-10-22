import React from 'react';
import HeroSlider from '../components/HeroSlider';
import Banners from '../components/Banners';
import ModelsGrid from '../components/ModelsGrid';
import '../styles/pages/Home.css';

const Home = () => {
  return (
    <>
      <div style={{marginTop: '50px'}}>
        <HeroSlider />
      </div>
      <Banners />
      <div style={{display: 'flex', justifyContent: 'center', padding: '2rem 0', width: '100%'}}>
        <h2 style={{fontSize: '1.875rem', fontWeight: 'bold', margin: 0}}>Discover our Models</h2>
      </div>
      <ModelsGrid limitRows={true} />
    </>
  );
};

export default Home;