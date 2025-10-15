import React from 'react';
import HeroSlider from '../components/HeroSlider';
import Banners from '../components/Banners';
import ModelsGrid from '../components/ModelsGrid';

const Home = () => {
  return (
    <>
      <HeroSlider />
      <Banners />
      <ModelsGrid limitRows={true} />
    </>
  );
};

export default Home;