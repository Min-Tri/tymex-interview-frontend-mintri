import React from 'react';
import HeroBanner from './hero';
import ItemList from './item-list';


const MarketplacePage: React.FC = () => {

  return (
    <>      
      <HeroBanner />
      <ItemList/>
    </>
  );
};

export default MarketplacePage;