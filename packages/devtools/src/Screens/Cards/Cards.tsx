import React from 'react';
import '../../tailwind.css';
import './Cards.css';
import CardDesigner from '../../Components/CardDesigner';

const Cards: React.FC = () => {
  return (
    <div className="Cards">
      <CardDesigner />
    </div>
  );
};

export default Cards;
