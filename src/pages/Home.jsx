import React from 'react';
import HeroSlider from '../components/HeroSlider';
import Banners from '../components/Banners';
import ModelsGrid from '../components/ModelsGrid';

const Home = () => {
  return (
    <>
      <HeroSlider />
      <Banners />
      <ModelsGrid />
    </>
  );
};

export default Home;